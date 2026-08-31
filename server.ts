import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  consultarAPIpncp,
  filtrarOutliersPNCP,
  selecionarMelhores3Orcamentos,
  calcularEstatisticasItem,
  processarItemCotacao,
  gerarMapaCotacaoRelatorio,
  PNCP_HISTORICAL_DATABASE
} from './src/services/pncpEngine.ts';
import {
  SQL_POSTGRESQL_DDL,
  JSON_SCHEMA_COTACAO,
  FRONTEND_REQUEST_PAYLOAD_EXAMPLE,
  BACKEND_RESPONSE_PAYLOAD_EXAMPLE
} from './src/data/schemaDocs.ts';
import { Cotacao, ItemCotacao } from './src/types.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // API ROUTES - COTAÇÃO & PNCP
  // ==========================================

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      sistema: 'PNCP Cotações & Mapa de Preços (Lei 14.133/21)',
      versao: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // 2. Consulta direta de amostras brutas no PNCP
  app.get('/api/pncp/amostras-brutas', async (req, res) => {
    try {
      const termo = (req.query.termo as string) || 'Papel A4';
      const uf = req.query.uf as string;
      const meses = req.query.meses ? Number(req.query.meses) : 12;

      const items = await consultarAPIpncp({
        termo,
        uf,
        meses_retroativos: meses,
        metodo_outlier: 'IQR_TUKEY'
      });

      res.json({
        termo_pesquisado: termo,
        total_encontrado: items.length,
        data_limite_12_meses: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amostras: items
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao consultar API do PNCP', detalhe: error.message });
    }
  });

  // 3. Processamento de item individual com remoção de outliers e cálculo estatístico
  app.post('/api/cotacoes/processar-item', async (req, res) => {
    try {
      const { item, parametros } = req.body;
      if (!item || !item.descricao) {
        return res.status(400).json({ error: 'Item com descrição é obrigatório' });
      }

      const itemModel: ItemCotacao = {
        id: item.id || `ITEM-${Date.now()}`,
        cotacao_id: item.cotacao_id || 'COT-TEMP',
        numero_item: item.numero_item || 1,
        descricao: item.descricao,
        quantidade: Number(item.quantidade) || 1,
        unidade_medida: item.unidade_medida || 'UNIDADE',
        codigo_catmat: item.codigo_catmat,
        status_processamento: 'PROCESSANDO',
        orcamentos: [],
      };

      const itemProcessado = await processarItemCotacao(itemModel, parametros);

      res.json({
        sucesso: true,
        item: itemProcessado
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Erro no processamento estatístico do item', detalhe: error.message });
    }
  });

  // 4. Processamento em lote de cotação completa (Entrada do Payload Front-end -> Saída Mapa de Cotação)
  app.post('/api/cotacoes/processar-lote', async (req, res) => {
    try {
      const payload = req.body;
      const itensInput = Array.isArray(payload.itens) ? payload.itens : [];

      if (itensInput.length === 0) {
        return res.status(400).json({ error: 'Nenhum item fornecido para cotação' });
      }

      const cotacaoId = payload.cotacao_id || `COT-${Date.now()}`;
      const itensProcessados: ItemCotacao[] = [];

      for (let i = 0; i < itensInput.length; i++) {
        const rawItem = itensInput[i];
        const itemModel: ItemCotacao = {
          id: rawItem.id || `ITEM-${cotacaoId}-${i + 1}`,
          cotacao_id: cotacaoId,
          numero_item: rawItem.numero_item || (i + 1),
          descricao: rawItem.descricao,
          quantidade: Number(rawItem.quantidade) || 1,
          unidade_medida: rawItem.unidade_medida || 'UNIDADE',
          codigo_catmat: rawItem.codigo_catmat,
          status_processamento: 'PROCESSANDO',
          metodologia_aplicada: payload.metodologia_padrao || 'MEDIA',
          orcamentos: [],
        };

        const proc = await processarItemCotacao(itemModel, payload.parametros_busca);
        itensProcessados.push(proc);
      }

      const valorTotalGeral = itensProcessados.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);

      const cotacaoCompleta: Cotacao = {
        id: cotacaoId,
        numero_processo: payload.numero_processo || `PROC-${Date.now().toString().slice(-4)}/2024`,
        titulo: payload.titulo || 'Cotação de Preços Governamental',
        objeto: payload.objeto || 'Pesquisa de Preços de Referência via PNCP',
        data_criacao: new Date().toISOString(),
        status: 'CONCLUIDA',
        responsavel_nome: payload.responsavel_nome || 'Agente de Contratação',
        responsavel_cargo: payload.responsavel_cargo || 'Pregoeiro Oficial',
        departamento: payload.departamento || 'Setor de Licitações e Contratos',
        municipio_uf: payload.municipio_uf || 'Brasília/DF',
        metodologia_padrao: payload.metodologia_padrao || 'MEDIA',
        valor_total_cotacao: valorTotalGeral,
        itens: itensProcessados,
      };

      const mapaRelatorio = gerarMapaCotacaoRelatorio(cotacaoCompleta);

      res.json({
        status: 'CONCLUIDO_COM_SUCESSO',
        codigo_status: 200,
        cotacao: cotacaoCompleta,
        mapa_cotacao: mapaRelatorio
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao processar lote de cotação', detalhe: error.message });
    }
  });

  // 5. Endpoint de Schemas e Documentação Técnica
  app.get('/api/docs/schemas', (req, res) => {
    res.json({
      sql_postgresql: SQL_POSTGRESQL_DDL,
      json_schema: JSON_SCHEMA_COTACAO,
      payload_request_exemplo: FRONTEND_REQUEST_PAYLOAD_EXAMPLE,
      payload_response_exemplo: BACKEND_RESPONSE_PAYLOAD_EXAMPLE
    });
  });

  // ==========================================
  // VITE MIDDLEWARE SETUP
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PNCP Engine] Server running on http://localhost:${PORT}`);
  });
}

startServer();
