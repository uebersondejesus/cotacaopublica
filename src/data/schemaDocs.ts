/**
 * Documentação Técnica Completa: Modelagem Relacional (SQL DDL), Schemas JSON
 * e Exemplos de Payloads para Integração com o PNCP (Lei 14.133/2021)
 */

export const SQL_POSTGRESQL_DDL = `-- ============================================================================
-- SISTEMA DE COTAÇÃO DE PREÇOS PARA LICITAÇÕES - LEI 14.133/2021 (NLLC)
-- INTEGRAÇÃO PNCP (PORTAL NACIONAL DE CONTRATAÇÕES PÚBLICAS)
-- DIALETO: PostgreSQL 14+ / Supabase / Cloud SQL
-- ============================================================================

-- Extensões para UUID e Funções Criptográficas de Auditoria
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enumerações de Status do Sistema
CREATE TYPE status_cotacao_enum AS ENUM (
    'RASCUNHO', 
    'PROCESSANDO', 
    'CONCLUIDA', 
    'CANCELADA'
);

CREATE TYPE status_item_enum AS ENUM (
    'PENDENTE', 
    'PROCESSANDO', 
    'SUCESSO_3_FONTES', 
    'SUCESSO_FONTES_PARCIAIS', 
    'SEM_RESULTADOS', 
    'ERRO'
);

CREATE TYPE metodologia_preco_enum AS ENUM (
    'MEDIA', 
    'MEDIANA', 
    'MENOR_VALOR'
);

-- ============================================================================
-- 1. TABELA: cotacoes (Cabeçalho do Processo Administrativo)
-- ============================================================================
CREATE TABLE cotacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_processo VARCHAR(50) NOT NULL UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    objeto TEXT NOT NULL,
    status status_cotacao_enum NOT NULL DEFAULT 'RASCUNHO',
    responsavel_nome VARCHAR(150) NOT NULL,
    responsavel_cargo VARCHAR(100) NOT NULL,
    departamento VARCHAR(150) NOT NULL,
    municipio_uf VARCHAR(50) NOT NULL DEFAULT 'Brasília/DF',
    metodologia_padrao metodologia_preco_enum NOT NULL DEFAULT 'MEDIA',
    observacoes TEXT,
    valor_total_global NUMERIC(15, 2) DEFAULT 0.00 CHECK (valor_total_global >= 0),
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE cotacoes IS 'Registra os processos de cotação de preços para estimativa de valor em licitações públicas.';
COMMENT ON COLUMN cotacoes.numero_processo IS 'Número do Processo Administrativo (ex: 2024/0045-SEDUC).';

-- ============================================================================
-- 2. TABELA: itens_cotacao (Produtos/Serviços a Cotar)
-- ============================================================================
CREATE TABLE itens_cotacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cotacao_id UUID NOT NULL REFERENCES cotacoes(id) ON DELETE CASCADE,
    numero_item INT NOT NULL,
    codigo_catmat VARCHAR(20),
    descricao VARCHAR(300) NOT NULL,
    descricao_detalhada TEXT,
    quantidade NUMERIC(12, 3) NOT NULL CHECK (quantidade > 0),
    unidade_medida VARCHAR(30) NOT NULL, -- UNIDADE, RESMA, LITRO, CAIXA, etc.
    status_processamento status_item_enum NOT NULL DEFAULT 'PENDENTE',
    
    -- Resultados Estatísticos Calculados a partir dos Orçamentos Homologados
    preco_minimo NUMERIC(15, 4) DEFAULT 0.0000,
    preco_maximo NUMERIC(15, 4) DEFAULT 0.0000,
    preco_medio NUMERIC(15, 4) DEFAULT 0.0000,
    preco_mediana NUMERIC(15, 4) DEFAULT 0.0000,
    desvio_padrao NUMERIC(15, 4) DEFAULT 0.0000,
    coeficiente_variacao NUMERIC(6, 2) DEFAULT 0.00, -- CV% = (Desvio / Média) * 100
    preco_referencia_unitario NUMERIC(15, 4) DEFAULT 0.0000,
    valor_total_estimado NUMERIC(15, 2) DEFAULT 0.00, -- preco_referencia_unitario * quantidade
    
    metodologia_aplicada metodologia_preco_enum DEFAULT 'MEDIA',
    justificativa_metodologia TEXT,
    total_amostras_brutas INT DEFAULT 0,
    total_amostras_expurgadas INT DEFAULT 0,
    data_ultima_consulta TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uq_cotacao_item UNIQUE (cotacao_id, numero_item)
);

COMMENT ON TABLE itens_cotacao IS 'Armazena os itens individuais e seus parâmetros consolidados de preço obtidos do PNCP.';

-- ============================================================================
-- 3. TABELA: orcamentos_obtidos (Até 3 Fontes Válidas do PNCP por Item)
-- ============================================================================
CREATE TABLE orcamentos_obtidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_cotacao_id UUID NOT NULL REFERENCES itens_cotacao(id) ON DELETE CASCADE,
    posicao SMALLINT NOT NULL CHECK (posicao BETWEEN 1 AND 3),
    valor_unitario NUMERIC(15, 4) NOT NULL CHECK (valor_unitario > 0),
    cnpj_fornecedor VARCHAR(18) NOT NULL,
    razao_social_fornecedor VARCHAR(255) NOT NULL,
    orgao_contratante VARCHAR(255) NOT NULL,
    uasg_codigo VARCHAR(20),
    uf_orgao CHAR(2) NOT NULL,
    municipio_orgao VARCHAR(100),
    data_compra DATE NOT NULL, -- Deve estar dentro dos 12 meses anteriores
    modalidade_licitacao VARCHAR(100) NOT NULL, -- Pregão Eletrônico, Dispensa Eletrônica, etc.
    numero_compra VARCHAR(50) NOT NULL,
    numero_item_pncp INT NOT NULL DEFAULT 1,
    id_pncp VARCHAR(100) NOT NULL,
    link_pncp TEXT NOT NULL,
    descricao_item_pncp TEXT, -- Nome similar / especificação técnica do item no PNCP
    marca_produto VARCHAR(100), -- Marca adjudicada no PNCP
    unidade_medida_pncp VARCHAR(30),
    status_validacao VARCHAR(30) DEFAULT 'VALIDO_HOMOLOGADO',
    origem_base VARCHAR(50) DEFAULT 'PNCP_COMPRAS_HOMOLOGADAS',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uq_item_posicao UNIQUE (item_cotacao_id, posicao)
);

COMMENT ON TABLE orcamentos_obtidos IS 'Fontes homologadas no PNCP selecionadas como suporte documental para a cotação.';

-- ============================================================================
-- 4. TABELA: amostras_descartadas_auditoria (Memória de Cálculo de Outliers)
-- ============================================================================
CREATE TABLE amostras_descartadas_auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_cotacao_id UUID NOT NULL REFERENCES itens_cotacao(id) ON DELETE CASCADE,
    valor_unitario NUMERIC(15, 4) NOT NULL,
    orgao_contratante VARCHAR(255),
    cnpj_fornecedor VARCHAR(18),
    data_compra DATE,
    motivo_descarte VARCHAR(50) NOT NULL, -- OUTLIER_SUPERIOR, OUTLIER_INFERIOR, FONTE_DUPLICADA, DATA_EXPIRADA
    detalhe_justificativa TEXT NOT NULL,
    link_pncp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE amostras_descartadas_auditoria IS 'Trilha de auditoria das amostras expurgadas estatisticamente, requerida por órgãos de controle (TCU/TCE).';

-- ============================================================================
-- ÍNDICES PARA ALTA PERFORMANCE
-- ============================================================================
CREATE INDEX idx_itens_cotacao_cotacao_id ON itens_cotacao(cotacao_id);
CREATE INDEX idx_orcamentos_item_cotacao_id ON orcamentos_obtidos(item_cotacao_id);
CREATE INDEX idx_orcamentos_cnpj ON orcamentos_obtidos(cnpj_fornecedor);
CREATE INDEX idx_orcamentos_data_compra ON orcamentos_obtidos(data_compra);
CREATE INDEX idx_amostras_item_id ON amostras_descartadas_auditoria(item_cotacao_id);
`;

export const JSON_SCHEMA_COTACAO = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ModeloDeCotacaoPNCP",
  type: "object",
  required: ["numero_processo", "titulo", "responsavel_nome", "itens"],
  properties: {
    numero_processo: {
      type: "string",
      description: "Número do processo administrativo de contratação.",
      example: "2024/SEDUC-0091"
    },
    titulo: {
      type: "string",
      description: "Título descritivo da cotação.",
      example: "Aquisição de Suprimentos de TI e Material de Escritório"
    },
    objeto: {
      type: "string",
      description: "Finalidade e objeto da contratação pública.",
      example: "Contratação de fornecedor para suprimento das escolas municipais."
    },
    responsavel_nome: {
      type: "string",
      description: "Nome completo do servidor ou agente de contratação responsável.",
      example: "Carlos Eduardo da Silva"
    },
    responsavel_cargo: {
      type: "string",
      example: "Pregoeiro Oficial / Analista de Licitações"
    },
    departamento: {
      type: "string",
      example: "Diretoria de Suprimentos e Compras Governamentais"
    },
    metodologia_padrao: {
      type: "string",
      enum: ["MEDIA", "MEDIANA", "MENOR_VALOR"],
      default: "MEDIA"
    },
    itens: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["numero_item", "descricao", "quantidade", "unidade_medida"],
        properties: {
          numero_item: { type: "integer", minimum: 1 },
          descricao: { type: "string", minLength: 3 },
          quantidade: { type: "number", minimum: 0.001 },
          unidade_medida: { type: "string" },
          codigo_catmat: { type: "string" }
        }
      }
    }
  }
};

export const FRONTEND_REQUEST_PAYLOAD_EXAMPLE = {
  cotacao_id: "cot-2024-8849",
  numero_processo: "LIC-2024/0488-SEDUC",
  titulo: "Aquisição Anual de Material Permanente e de Consumo",
  objeto: "Registro de preços para fornecimento contínuo de materiais administrativos.",
  responsavel_nome: "Mariana Souza Ribeiro",
  responsavel_cargo: "Agente de Contratação (Lei 14.133/21)",
  departamento: "Secretaria Municipal de Educação e Cultura",
  metodologia_padrao: "MEDIA",
  parametros_busca: {
    meses_retroativos: 12,
    metodo_outlier: "IQR_TUKEY",
    fator_iqr: 1.5,
    limite_cv_porcento: 25,
    max_fontes_por_item: 3
  },
  itens: [
    {
      numero_item: 1,
      descricao: "Papel sulfite A4, 75g/m², alcalino, pacote com 500 folhas",
      quantidade: 500,
      unidade_medida: "RESMA",
      codigo_catmat: "447214"
    },
    {
      numero_item: 2,
      descricao: "Cadeira de escritório ergonômica giratória com laudo NR-17",
      quantidade: 30,
      unidade_medida: "UNIDADE",
      codigo_catmat: "318920"
    },
    {
      numero_item: 3,
      descricao: "Notebook corporativo Core i7 16GB RAM SSD 512GB tela 15.6",
      quantidade: 15,
      unidade_medida: "UNIDADE",
      codigo_catmat: "482910"
    }
  ]
};

export const BACKEND_RESPONSE_PAYLOAD_EXAMPLE = {
  status: "CONCLUIDO_COM_SUCESSO",
  codigo_status: 200,
  mensagem: "Pesquisa de preços no PNCP processada com sucesso conforme Lei 14.133/21 e IN SEGES/ME 65/2021.",
  timestamp: "2024-12-18T14:35:10.820Z",
  mapa_cotacao: {
    identificacao_processo: {
      numero_processo: "LIC-2024/0488-SEDUC",
      titulo: "Aquisição Anual de Material Permanente e de Consumo",
      orgao: "PREFEITURA MUNICIPAL / SECRETARIA DE EDUCAÇÃO",
      responsavel: "Mariana Souza Ribeiro - Agente de Contratação",
      amparo_legal: "Art. 23, § 1º, II da Lei nº 14.133/2021 e IN SEGES/ME nº 65/2021",
      codigo_autenticidade_pncp: "PNCP-VAL-8849-DF918"
    },
    resumo_geral: {
      total_itens_processados: 3,
      total_itens_com_3_precos: 3,
      valor_total_estimado_global: 108155.00,
      coeficiente_variacao_medio_percent: 4.12
    },
    itens_cotados: [
      {
        numero_item: 1,
        descricao: "Papel sulfite A4, 75g/m², alcalino, pacote com 500 folhas",
        quantidade: 500,
        unidade_medida: "RESMA",
        status_fontes: "SUCESSO_3_FONTES",
        estatisticas: {
          preco_minimo: 23.90,
          preco_maximo: 25.80,
          preco_medio: 24.73,
          preco_mediana: 24.50,
          desvio_padrao: 0.96,
          coeficiente_variacao_percent: 3.88,
          preco_referencia_adotado: 24.73,
          valor_total_estimado: 12365.00,
          metodologia_justificada: "Média aritmética simples adotada com base em 3 fontes distintas do PNCP (CV% = 3.88% < 25%)."
        },
        auditoria_amostras: {
          total_amostras_coletadas: 5,
          total_outliers_expurgados: 2,
          amostras_descartadas: [
            {
              valor_unitario: 89.90,
              orgao: "CÂMARA MUNICIPAL DE CIDADE PEQUENA",
              motivo: "OUTLIER_SUPERIOR (Preço discrepante pelo critério IQR Tukey Q3 + 1.5*IQR)",
              link_pncp: "https://pncp.gov.br/app/contratos/13937073000156/2024/000019"
            },
            {
              valor_unitario: 3.50,
              orgao: "AUTARQUIA MUNICIPAL REGIONAL",
              motivo: "OUTLIER_INFERIOR (Inexequibilidade / erro de unidade de medida)",
              link_pncp: "https://pncp.gov.br/app/contratos/76416940000128/2024/000005"
            }
          ]
        },
        orcam_1: {
          posicao: 1,
          valor_unitario: 24.50,
          cnpj_fornecedor: "04.288.966/0001-20",
          razao_social: "KALUNGA COMÉRCIO E INDÚSTRIA GRÁFICA LTDA",
          orgao_contratante: "PREFEITURA MUNICIPAL DE LONDRINA",
          uf: "PR",
          data_compra: "2024-11-15",
          modalidade: "Pregão Eletrônico",
          numero_compra: "PE 042/2024",
          marca: "Chamex",
          link_pncp: "https://pncp.gov.br/app/contratos/10352377000185/2024/000042"
        },
        orcam_2: {
          posicao: 2,
          valor_unitario: 23.90,
          cnpj_fornecedor: "12.445.890/0001-99",
          razao_social: "DISTRIBUIDORA BRASIL DE PAPÉIS E EMBALAGENS S.A.",
          orgao_contratante: "MINISTÉRIO DA EDUCAÇÃO - MEC / FNDE",
          uf: "DF",
          data_compra: "2024-10-22",
          modalidade: "Pregão Eletrônico SRP",
          numero_compra: "PE SRP 115/2024",
          marca: "Report",
          link_pncp: "https://pncp.gov.br/app/contratos/00394452000103/2024/000115"
        },
        orcam_3: {
          posicao: 3,
          valor_unitario: 25.80,
          cnpj_fornecedor: "33.567.891/0001-44",
          razao_social: "MULTIOFFICE SUPRIMENTOS CORPORATIVOS EIRELI",
          orgao_contratante: "SECRETARIA DE ESTADO DE SAÚDE DE SÃO PAULO",
          uf: "SP",
          data_compra: "2024-12-05",
          modalidade: "Pregão Eletrônico",
          numero_compra: "PE 088/2024",
          marca: "Suzano Report",
          link_pncp: "https://pncp.gov.br/app/contratos/46384111000140/2024/000088"
        }
      }
    ]
  }
};
