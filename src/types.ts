/**
 * Modelos e Tipos de Dados para o Sistema de Cotação de Preços (Lei 14.133/2021)
 * Integração PNCP (Portal Nacional de Contratações Públicas) & IN SEGES/ME 65/2021
 */

export type StatusCotacao = 'RASCUNHO' | 'PROCESSANDO' | 'CONCLUIDA' | 'CANCELADA';

export type StatusProcessamentoItem = 
  | 'PENDENTE' 
  | 'PROCESSANDO' 
  | 'SUCESSO_3_FONTES' 
  | 'SUCESSO_FONTES_PARCIAIS' 
  | 'SEM_RESULTADOS' 
  | 'ERRO';

export type MetodologiaCalculoPreco = 'MEDIA' | 'MEDIANA' | 'MENOR_VALOR';

export type MetodoFiltroOutlier = 'IQR_TUKEY' | 'DESVIO_PADRAO' | 'COEFICIENTE_VARIACAO_EXPURGO';

/**
 * Entidade 1: Cotação Geral
 */
export interface Cotacao {
  id: string;
  numero_processo: string;
  titulo: string;
  objeto: string;
  data_criacao: string;
  data_conclusao?: string | null;
  status: StatusCotacao;
  responsavel_nome: string;
  responsavel_cargo: string;
  departamento: string;
  municipio_uf: string;
  observacoes?: string;
  itens: ItemCotacao[];
  metodologia_padrao: MetodologiaCalculoPreco;
  valor_total_cotacao?: number;
}

/**
 * Entidade 2: Item da Cotação
 */
export interface ItemCotacao {
  id: string;
  cotacao_id: string;
  numero_item: number;
  codigo_catmat?: string;
  descricao: string;
  descricao_detalhada?: string;
  quantidade: number;
  unidade_medida: string;
  status_processamento: StatusProcessamentoItem;
  
  // Resultados estatísticos calculados com base nos orçamentos válidos (até 3 fontes)
  preco_minimo?: number;
  preco_maximo?: number;
  preco_medio?: number;
  preco_mediana?: number;
  desvio_padrao?: number;
  coeficiente_variacao?: number; // CV% = (Desvio Padrão / Média) * 100
  preco_referencia_unitario?: number; // Preço adotado (média ou mediana conforme justificativa)
  valor_total_estimado?: number; // preco_referencia_unitario * quantidade
  metodologia_aplicada?: MetodologiaCalculoPreco;
  justificativa_metodologia?: string;

  // Orçamentos homologados vinculados (máximo 3 fontes distintas validadas)
  orcamentos: OrcamentoObtido[];
  
  // Amostra bruta retornada pelo PNCP para auditoria e transparência
  total_amostras_brutas?: number;
  total_amostras_expurgadas?: number;
  amostras_descartadas?: OrcamentoDescartado[];
  
  data_ultima_consulta?: string;
  necessita_atualizacao?: boolean; // Flag indicando que descrição ou quantidade foi alterada e requer nova sincronização
  motivo_necessidade_atualizacao?: string; // Motivo da necessidade de nova sincronização (ex: "Descrição alterada", "Quantidade alterada")
}

/**
 * Entidade 3: Orçamento/Preço Obtido (Fontes Selecionadas)
 */
export interface OrcamentoObtido {
  id: string;
  item_cotacao_id: string;
  posicao: number; // 1, 2 ou 3
  valor_unitario: number; // Preço unitário adjudicado/homologado
  cnpj_fornecedor: string;
  razao_social_fornecedor: string;
  orgao_contratante: string;
  uasg_codigo?: string;
  uf_orgao: string;
  municipio_orgao?: string;
  data_compra: string; // Formato YYYY-MM-DD
  modalidade_licitacao: string; // ex: "Pregão Eletrônico", "Dispensa"
  numero_compra: string; // ex: "90012/2024"
  numero_item_pncp: number;
  id_pncp: string; // Identificador único ou sequencial da compra no PNCP
  link_pncp: string; // URL comprovatória no portal oficial
  descricao_item_pncp?: string; // Nome similar / especificação técnica obtida no PNCP
  marca_produto?: string; // Marca ou fabricante registrado no PNCP
  unidade_medida_pncp?: string;
  status_validacao: 'VALIDO_HOMOLOGADO';
  origem_base: 'PNCP_COMPRAS_HOMOLOGADAS' | 'BANCO_DE_PRECOS' | 'CONTRATOS_PUBLICOS';
}

/**
 * Registro de Amostras Descartadas (Para memória de cálculo e atendimento a auditoria do TCU/TCE)
 */
export interface OrcamentoDescartado {
  valor_unitario: number;
  orgao_contratante: string;
  cnpj_fornecedor: string;
  data_compra: string;
  descricao_item_pncp?: string;
  marca_produto?: string;
  motivo_descarte: 'OUTLIER_SUPERIOR' | 'OUTLIER_INFERIOR' | 'FONTE_DUPLICADA' | 'DATA_EXPIRADA_MAIS_12_MESES' | 'DESVIO_PADRAO_EXCEDIDO' | 'FORA_INTERVALO_TEMPORAL' | 'UF_DIVERGENTE';
  detalhe_justificativa: string;
  link_pncp?: string;
}

/**
 * Dado bruto retornado pela API do PNCP
 */
export interface RawPNCPItem {
  id_compra_pncp: string;
  numero_item: number;
  descricao_item: string;
  quantidade: number;
  unidade_medida: string;
  valor_unitario: number;
  valor_total: number;
  data_homologacao_adjudicacao: string;
  cnpj_orgao: string;
  nome_orgao: string;
  uasg?: string;
  uf: string;
  municipio?: string;
  cnpj_vencedor: string;
  razao_social_vencedor: string;
  marca?: string;
  modalidade_nome: string;
  numero_processo_pncp: string;
  url_pncp: string;
  criterio_julgamento?: string;
}

/**
 * Parâmetros de Filtro e Busca
 */
export interface ParametrosBuscaPNCP {
  termo: string;
  catmat?: string;
  uf?: string;
  data_inicio?: string; // Formato YYYY-MM-DD
  data_fim?: string;    // Formato YYYY-MM-DD
  tipo_periodo?: '12_MESES' | '6_MESES' | '3_MESES' | 'ANO_ATUAL' | 'PERSONALIZADO';
  meses_retroativos?: number; // Padrão: 12 meses (IN 65/2021)
  metodo_outlier: MetodoFiltroOutlier;
  fator_iqr?: number; // Padrão: 1.5
  limite_cv_porcento?: number; // Padrão: 25% (Coeficiente de Variação)
  max_fontes?: number; // Padrão: 3
  priorizar_regiao?: boolean;
}

/**
 * Mapa de Cotação (Relatório Consolidado para Auditoria)
 */
export interface MapaCotacaoRelatorio {
  cabecalho: {
    orgao_emissor: string;
    departamento: string;
    numero_processo: string;
    titulo_cotacao: string;
    objeto: string;
    responsavel: string;
    cargo_responsavel: string;
    data_emissao: string;
    amparo_legal: string; // "Lei Federal nº 14.133/2021, Art. 23, § 1º, II e IN SEGES/ME nº 65/2021"
    codigo_verificacao: string;
  };
  resumo_financeiro: {
    total_itens: number;
    itens_cotados_sucesso: number;
    valor_total_estimado_global: number;
    metodologia_predominante: string;
    coeficiente_variacao_medio: number;
  };
  itens: Array<{
    item_numero: number;
    descricao: string;
    quantidade: number;
    unidade_medida: string;
    orcam_1?: OrcamentoObtido;
    orcam_2?: OrcamentoObtido;
    orcam_3?: OrcamentoObtido;
    preco_min: number;
    preco_max: number;
    preco_medio: number;
    preco_mediana: number;
    cv_percent: number;
    preco_referencia: number;
    total_item: number;
    justificativa_metodo: string;
    fontes_auditaveis: string[];
  }>;
  termo_conformidade: string;
  assinatura_digital_mock: string;
}
