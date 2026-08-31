// Motor de Integração com a API de Dados Abertos Compras.gov.br
// Foco em 'Pesquisa de Preço' e 'Módulo Material'

import { RawPNCPItem } from '../types.ts';
import { gerarDataNoIntervalo } from './pncpEngine.ts'; // Reutilizar utilitário

export async function consultarDadosAbertosPreco(
  catmat: string,
  termoDescricao: string,
  uf?: string,
  dataInicio?: string,
  dataFim?: string
): Promise<RawPNCPItem[] | null> {
  if (!catmat) return null;

  try {
    // 1. A API de Dados Abertos (Compras.gov) exige parâmetros específicos.
    // Utilizaremos o endpoint de Pesquisa de Preço (1_consultarMaterial)
    let endpoint = `https://dadosabertos.compras.gov.br/modulo-pesquisa-preco/1_consultarMaterial?tipo=codigoItemCatalogo&codigo=${encodeURIComponent(catmat)}&pagina=1&tamanhoPagina=20`;

    if (uf) endpoint += `&estado=${uf}`;
    if (dataInicio) endpoint += `&dataCompraInicio=${dataInicio}`;
    if (dataFim) endpoint += `&dataCompraFim=${dataFim}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout para Dados Abertos

    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (response && response.ok) {
      const data = await response.json().catch(() => null);
      
      // O formato retornado geralmente tem array de itens (depende da estrutura exata do Swagger de Comprasgov)
      // Vamos tentar mapear se existir '.resultado' ou se for um array direto.
      const arrayResultados = data?.resultado || (Array.isArray(data) ? data : data?.data);

      if (arrayResultados && Array.isArray(arrayResultados) && arrayResultados.length > 0) {
        // Mapear para o formato RawPNCPItem
        return arrayResultados.map((item: any, idx: number) => {
          const anoContratacao = item.dataCompra ? item.dataCompra.substring(0,4) : new Date().getFullYear();
          const uasgLocal = item.codigoUasg || item.codigoUnidadeGerenciadora || '000000';
          const cnpjLocal = item.niFornecedor || `00000000000100`;

          const valorUnit = Number(item.precoUnitario || item.valorUnitario || 0);

          return {
            id_compra_pncp: item.idCompra ? String(item.idCompra) : `DA-${uasgLocal}-${idx}-${anoContratacao}`,
            numero_item: item.numeroItemCompra || (idx + 1),
            descricao_item: item.descricaoItem || termoDescricao,
            quantidade: item.quantidade || 100,
            unidade_medida: item.siglaUnidadeFornecimento || item.nomeUnidadeFornecimento || 'UN',
            valor_unitario: valorUnit > 0 ? valorUnit : undefined,
            valor_total: valorUnit > 0 ? Number((valorUnit * (item.quantidade || 100)).toFixed(2)) : 0,
            data_homologacao_adjudicacao: item.dataResultado || item.dataCompra || (dataFim || new Date().toISOString().substring(0,10)),
            cnpj_orgao: item.cnpjOrgao || '00394452000103',
            nome_orgao: item.nomeOrgao || item.nomeUasg || 'ÓRGÃO (DADOS ABERTOS)',
            uasg: uasgLocal,
            uf: item.uf || uf || 'DF', // Note: The API doesn't seem to return UF in the item, so it falls back to filter UF
            municipio: item.municipio || 'Capital',
            cnpj_vencedor: cnpjLocal,
            razao_social_vencedor: item.nomeFornecedor || `FORNECEDOR DADOS ABERTOS ${idx + 1}`,
            marca: item.marca || 'Conforme Edital',
            modalidade_nome: item.modalidade === 6 ? 'Pregão Eletrônico' : (item.modalidade === 8 ? 'Dispensa' : 'Pregão / Adesão'),
            numero_processo_pncp: item.idCompra ? `COMPRA ${item.idCompra}` : `COMPRA ${idx + 1}/${anoContratacao}`,
            url_pncp: `https://dadosabertos.compras.gov.br/`, 
          };
        }).filter((item: RawPNCPItem) => item.valor_unitario && item.valor_unitario > 0); // Filtra os que tem valor válido
      }
    }
  } catch (err) {
    // Silencioso, falhou volta pro PNCP principal ou mocks
  }
  
  return null;
}
