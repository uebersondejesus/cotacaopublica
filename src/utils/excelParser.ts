import * as XLSX from 'xlsx';
import { ItemCotacao } from '../types.ts';

export interface ColumnMapping {
  descricao: string;
  quantidade: string;
  unidade_medida?: string;
  codigo_catmat?: string;
  numero_item?: string;
}

export interface ParsedSheetData {
  headers: string[];
  rows: Record<string, any>[];
  detectedMapping: ColumnMapping;
  fileName: string;
  totalRows: number;
}

/**
 * Tenta detectar automaticamente quais colunas correspondem aos campos de Item da Cotação
 */
export function autoDetectColumnMapping(headers: string[], sampleRows?: Record<string, any>[]): ColumnMapping {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

  const mapping: ColumnMapping = {
    descricao: '',
    quantidade: '',
    unidade_medida: '',
    codigo_catmat: '',
    numero_item: '',
  };

  headers.forEach(h => {
    const norm = normalize(h);
    if (!norm) return;

    // Descrição
    if (
      !mapping.descricao &&
      (norm.includes('descric') ||
        norm.includes('especificac') ||
        norm.includes('objeto') ||
        norm.includes('produto') ||
        norm.includes('material') ||
        norm.includes('servico') ||
        norm.includes('denominac') ||
        norm === 'item' ||
        norm === 'nome')
    ) {
      mapping.descricao = h;
    }

    // Quantidade
    if (
      !mapping.quantidade &&
      (norm.includes('quant') ||
        norm.includes('qtd') ||
        norm.includes('qnt') ||
        norm === 'total' ||
        norm === 'volume')
    ) {
      mapping.quantidade = h;
    }

    // Unidade de Medida
    if (
      !mapping.unidade_medida &&
      (norm.includes('unidade') ||
        norm.includes('unid') ||
        norm.includes('medida') ||
        norm === 'um' ||
        norm === 'und' ||
        norm === 'un')
    ) {
      mapping.unidade_medida = h;
    }

    // CATMAT / Código
    if (
      !mapping.codigo_catmat &&
      (norm.includes('catmat') ||
        norm.includes('catser') ||
        norm.includes('codigo') ||
        norm.includes('cod') ||
        norm.includes('catalogo'))
    ) {
      mapping.codigo_catmat = h;
    }

    // Número do Item
    if (
      !mapping.numero_item &&
      (norm === 'item' ||
        norm === 'numero' ||
        norm === 'n' ||
        norm === 'num' ||
        norm === 'no' ||
        norm.includes('posicao') ||
        norm.includes('sequencial') ||
        norm.includes('ordem'))
    ) {
      mapping.numero_item = h;
    }
  });

  // Análise de amostras se ainda faltar descrição ou quantidade
  if (sampleRows && sampleRows.length > 0) {
    if (!mapping.descricao) {
      // Procura a coluna com maior comprimento médio de texto
      let bestDescCol = '';
      let maxAvgLen = 0;
      headers.forEach(h => {
        if (h === mapping.quantidade || h === mapping.numero_item) return;
        const totalLen = sampleRows.reduce((acc, row) => acc + String(row[h] || '').length, 0);
        const avg = totalLen / sampleRows.length;
        if (avg > maxAvgLen) {
          maxAvgLen = avg;
          bestDescCol = h;
        }
      });
      if (bestDescCol) {
        mapping.descricao = bestDescCol;
      }
    }

    if (!mapping.quantidade) {
      // Procura coluna com números
      for (const h of headers) {
        if (h === mapping.descricao || h === mapping.numero_item) continue;
        const isNumeric = sampleRows.some(row => {
          const v = String(row[h] || '').replace(',', '.').trim();
          return v !== '' && !isNaN(Number(v)) && Number(v) > 0;
        });
        if (isNumeric) {
          mapping.quantidade = h;
          break;
        }
      }
    }
  }

  // Fallbacks finais se não encontrou exatamente
  if (!mapping.descricao && headers.length > 0) {
    mapping.descricao = headers[0];
  }
  if (!mapping.quantidade && headers.length > 1) {
    mapping.quantidade = headers[1] !== mapping.descricao ? headers[1] : (headers[2] || '');
  }

  return mapping;
}

/**
 * Lê e processa arquivo Excel (.xlsx, .xls) ou CSV
 */
export async function parseExcelFile(file: File): Promise<ParsedSheetData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: false });

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          throw new Error('Nenhuma planilha encontrada no arquivo.');
        }

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 1. Converte a folha inteira em array 2D para inspecionar cabeçalho real
        const rawGrid = XLSX.utils.sheet_to_json<any[]>(worksheet, {
          header: 1,
          defval: '',
          blankrows: false,
        });

        if (!rawGrid || rawGrid.length === 0) {
          throw new Error('A planilha está vazia ou não possui linhas de dados.');
        }

        // 2. Localiza a linha do cabeçalho (pode haver títulos nas primeiras linhas)
        let headerRowIndex = 0;
        const keywords = ['item', 'descri', 'objeto', 'especific', 'quant', 'qtd', 'unid', 'catmat', 'produto', 'material', 'valor'];

        for (let r = 0; r < Math.min(rawGrid.length, 10); r++) {
          const row = rawGrid[r];
          if (Array.isArray(row)) {
            const matches = row.filter(cell => {
              const str = String(cell || '').toLowerCase();
              return keywords.some(k => str.includes(k));
            });
            if (matches.length >= 1) {
              headerRowIndex = r;
              break;
            }
          }
        }

        const rawHeaderRow = rawGrid[headerRowIndex] || [];
        const seenHeaders: Record<string, number> = {};
        const cleanHeaders: string[] = rawHeaderRow.map((cell: any, colIdx: number) => {
          let h = String(cell || '').trim();
          if (!h) {
            h = `Coluna_${colIdx + 1}`;
          }
          if (seenHeaders[h]) {
            seenHeaders[h]++;
            h = `${h}_${seenHeaders[h]}`;
          } else {
            seenHeaders[h] = 1;
          }
          return h;
        });

        // 3. Constrói os registros a partir das linhas seguintes
        const rows: Record<string, any>[] = [];
        for (let r = headerRowIndex + 1; r < rawGrid.length; r++) {
          const rowData = rawGrid[r];
          if (!Array.isArray(rowData)) continue;

          // Verifica se a linha não é totalmente vazia
          const hasContent = rowData.some(c => String(c ?? '').trim() !== '');
          if (!hasContent) continue;

          const rowObj: Record<string, any> = {};
          cleanHeaders.forEach((header, colIdx) => {
            rowObj[header] = rowData[colIdx] !== undefined ? rowData[colIdx] : '';
          });
          rows.push(rowObj);
        }

        if (rows.length === 0) {
          throw new Error('Nenhuma linha de dados encontrada abaixo do cabeçalho.');
        }

        const detectedMapping = autoDetectColumnMapping(cleanHeaders, rows.slice(0, 10));

        resolve({
          headers: cleanHeaders,
          rows,
          detectedMapping,
          fileName: file.name,
          totalRows: rows.length,
        });
      } catch (err: any) {
        reject(new Error(err.message || 'Falha ao processar arquivo da planilha.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo selecionado.'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Converte as linhas processadas em instâncias de ItemCotacao
 */
export function convertRowsToItems(
  rows: Record<string, any>[],
  mapping: ColumnMapping,
  startIndex: number = 1
): ItemCotacao[] {
  return rows
    .map((row, idx) => {
      let descVal = mapping.descricao ? row[mapping.descricao] : '';
      
      // Fallback se o campo mapeado estiver vazio nessa linha
      if (!descVal || String(descVal).trim() === '') {
        for (const key of Object.keys(row)) {
          if (key !== mapping.quantidade && key !== mapping.numero_item && key !== mapping.codigo_catmat) {
            const candidate = String(row[key] || '').trim();
            if (candidate.length > 2 && isNaN(Number(candidate))) {
              descVal = candidate;
              break;
            }
          }
        }
      }

      if (!descVal || String(descVal).trim() === '') {
        return null;
      }

      const qtdRaw = mapping.quantidade ? row[mapping.quantidade] : '1';
      let qtdParsed = parseFloat(String(qtdRaw).replace(/\./g, '').replace(',', '.'));
      if (isNaN(qtdParsed) || qtdParsed <= 0) {
        qtdParsed = 1;
      }

      const unidadeRaw = mapping.unidade_medida ? row[mapping.unidade_medida] : '';
      const unidadeFinal = String(unidadeRaw).trim().toUpperCase() || 'UNIDADE';

      const catmatRaw = mapping.codigo_catmat ? row[mapping.codigo_catmat] : '';
      const catmatFinal = String(catmatRaw).trim();

      const numItemRaw = mapping.numero_item ? row[mapping.numero_item] : null;
      const numItem = numItemRaw ? parseInt(String(numItemRaw), 10) || (startIndex + idx) : (startIndex + idx);

      const novoItem: ItemCotacao = {
        id: `ITEM-IMP-${Date.now()}-${idx + 1}-${Math.floor(Math.random() * 1000)}`,
        cotacao_id: '',
        numero_item: numItem,
        descricao: String(descVal).trim(),
        quantidade: qtdParsed,
        unidade_medida: unidadeFinal,
        codigo_catmat: catmatFinal || undefined,
        status_processamento: 'PENDENTE',
        orcamentos: [],
        necessita_atualizacao: true,
        motivo_necessidade_atualizacao: 'Importado de planilha - Requer sincronização com PNCP',
      };

      return novoItem;
    })
    .filter((item): item is ItemCotacao => item !== null);
}

/**
 * Gera e baixa uma planilha modelo padrão em formato .xlsx
 */
export function downloadPlanilhaModeloExcel() {
  const modelo = [
    {
      'Item': 1,
      'Descrição do Item / Objeto': 'Papel Sulfite A4 75g/m² Reciclado Caixa com 10 Resmas',
      'Quantidade': 50,
      'Unidade': 'CX',
      'Código CATMAT': '451233',
    },
    {
      'Item': 2,
      'Descrição do Item / Objeto': 'Caneta Esferográfica Azul Ponta Média 1.0mm Corpo Sextavado',
      'Quantidade': 500,
      'Unidade': 'UNIDADE',
      'Código CATMAT': '321098',
    },
    {
      'Item': 3,
      'Descrição do Item / Objeto': 'Notebook Corporativo Core i7 16GB RAM SSD 512GB Tela 15.6"',
      'Quantidade': 15,
      'Unidade': 'UNIDADE',
      'Código CATMAT': '482910',
    },
    {
      'Item': 4,
      'Descrição do Item / Objeto': 'Cadeira Ergonômica Giratória Presidente com Apoio de Braço NR-17',
      'Quantidade': 20,
      'Unidade': 'UNIDADE',
      'Código CATMAT': '150492',
    },
    {
      'Item': 5,
      'Descrição do Item / Objeto': 'Gasolina Comum Tipo C para Abastecimento de Frota Oficial',
      'Quantidade': 3000,
      'Unidade': 'LITRO',
      'Código CATMAT': '284910',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(modelo);

  // Ajusta larguras de coluna para boa legibilidade
  ws['!cols'] = [
    { wch: 8 },  // Item
    { wch: 65 }, // Descrição
    { wch: 14 }, // Quantidade
    { wch: 12 }, // Unidade
    { wch: 18 }, // CATMAT
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Itens Licitacao');

  XLSX.writeFile(wb, 'modelo_importacao_itens_pncp.xlsx');
}
