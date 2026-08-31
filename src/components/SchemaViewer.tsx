import React, { useState } from 'react';
import { SQL_POSTGRESQL_DDL, JSON_SCHEMA_COTACAO } from '../data/schemaDocs.ts';
import { Database, Copy, Check, Table, Key, Link2, Code, Shield } from 'lucide-react';

export const SchemaViewer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'sql' | 'json_schema' | 'er_diagram'>('sql');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Modelagem de Dados & Schemas (Lei 14.133/21)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Estrutura relacional para PostgreSQL com foreign keys, restrições CHECK, auditoria e schemas JSON validados.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveSubTab('sql')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'sql'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Script SQL (PostgreSQL DDL)
          </button>
          <button
            onClick={() => setActiveSubTab('er_diagram')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'er_diagram'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dicionário de Entidades (DER)
          </button>
          <button
            onClick={() => setActiveSubTab('json_schema')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'json_schema'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JSON Schema (Draft-07)
          </button>
        </div>
      </div>

      {/* Content */}
      {activeSubTab === 'sql' && (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">
                schema_pncp_cotacoes_postgres.sql
              </span>
            </div>
            <button
              onClick={() => handleCopy(SQL_POSTGRESQL_DDL, 'sql')}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition"
            >
              {copied === 'sql' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar SQL DDL
                </>
              )}
            </button>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[600px] font-mono text-xs text-blue-200/90 leading-relaxed">
            <pre>{SQL_POSTGRESQL_DDL}</pre>
          </div>
        </div>
      )}

      {activeSubTab === 'er_diagram' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tabela Cotacoes */}
            <div className="bg-white p-5 rounded-xl border-2 border-blue-500/40 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-blue-600" />
                  <h3 className="font-mono font-bold text-sm text-slate-900">cotacoes</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  1 (Pai)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Cabeçalho do processo de cotação e dados do agente de contratação.
              </p>
              <div className="text-xs space-y-1.5 font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Key className="w-3 h-3" /> id (UUID PK)
                </div>
                <div>numero_processo (VARCHAR)</div>
                <div>titulo (VARCHAR)</div>
                <div>objeto (TEXT)</div>
                <div>status (ENUM)</div>
                <div>responsavel_nome (VARCHAR)</div>
                <div>departamento (VARCHAR)</div>
                <div>metodologia_padrao (ENUM)</div>
                <div>valor_total_global (NUMERIC)</div>
              </div>
            </div>

            {/* Tabela Itens Cotacao */}
            <div className="bg-white p-5 rounded-xl border-2 border-indigo-500/40 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-mono font-bold text-sm text-slate-900">itens_cotacao</h3>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded">
                  1:N (Filho)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Produtos/serviços e métricas consolidadas (Média, Mediana, CV%).
              </p>
              <div className="text-xs space-y-1.5 font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Key className="w-3 h-3" /> id (UUID PK)
                </div>
                <div className="flex items-center gap-1.5 text-blue-700">
                  <Link2 className="w-3 h-3" /> cotacao_id (UUID FK)
                </div>
                <div>numero_item (INT)</div>
                <div>descricao (VARCHAR)</div>
                <div>quantidade (NUMERIC)</div>
                <div>unidade_medida (VARCHAR)</div>
                <div className="text-emerald-700 font-bold">preco_minimo (NUMERIC)</div>
                <div className="text-emerald-700 font-bold">preco_medio (NUMERIC)</div>
                <div className="text-emerald-700 font-bold">preco_mediana (NUMERIC)</div>
                <div className="text-emerald-700 font-bold">coeficiente_variacao (NUMERIC)</div>
                <div className="text-emerald-700 font-bold">valor_total_estimado (NUMERIC)</div>
              </div>
            </div>

            {/* Tabela Orcamentos Obtidos */}
            <div className="bg-white p-5 rounded-xl border-2 border-emerald-500/40 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-mono font-bold text-sm text-slate-900">orcamentos_obtidos</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  1:3 (PNCP)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Até 3 preços homologados no PNCP de fornecedores/órgãos distintos.
              </p>
              <div className="text-xs space-y-1.5 font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Key className="w-3 h-3" /> id (UUID PK)
                </div>
                <div className="flex items-center gap-1.5 text-indigo-700">
                  <Link2 className="w-3 h-3" /> item_cotacao_id (UUID FK)
                </div>
                <div>posicao (SMALLINT 1..3)</div>
                <div className="text-emerald-700 font-bold">valor_unitario (NUMERIC)</div>
                <div>cnpj_fornecedor (VARCHAR)</div>
                <div>razao_social_fornecedor (VARCHAR)</div>
                <div>orgao_contratante (VARCHAR)</div>
                <div>data_compra (DATE &lt;= 12m)</div>
                <div>id_pncp (VARCHAR)</div>
                <div className="text-blue-600">link_pncp (TEXT URL)</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-slate-700 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900">Integridade Referencial & Auditoria pelo TCU/TCE</h4>
              <p className="mt-0.5 leading-relaxed">
                As tabelas contam com índices dedicados em <code>cnpj_fornecedor</code>, <code>data_compra</code> e chaves estrangeiras com <code>ON DELETE CASCADE</code>. A tabela auxiliar <code>amostras_descartadas_auditoria</code> garante conformidade com o dever de fundamentação previsto no Art. 23 da Lei 14.133/21.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'json_schema' && (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-400">
                cotacao_schema_draft07.json
              </span>
            </div>
            <button
              onClick={() => handleCopy(JSON.stringify(JSON_SCHEMA_COTACAO, null, 2), 'json')}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition"
            >
              {copied === 'json' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar JSON Schema
                </>
              )}
            </button>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px] font-mono text-xs text-emerald-300 leading-relaxed">
            <pre>{JSON.stringify(JSON_SCHEMA_COTACAO, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
