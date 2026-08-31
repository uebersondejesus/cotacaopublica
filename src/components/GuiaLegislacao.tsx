import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, BookOpen, ShieldCheck, FileText, Check } from 'lucide-react';

export const GuiaLegislacao: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Marco Regulatório da Pesquisa de Preços (Lei 14.133/21 & IN 65/2021)
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Fundamentação jurídica, requisitos de validade para órgãos de controle (TCU/TCE) e boas práticas de engenharia pública.
        </p>
      </div>

      {/* Grid de Regras Fundamentais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Art. 23 Lei 14.133/2021 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            Art. 23, § 1º, Inciso II da Lei 14.133/2021
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            O valor previamente estimado para a contratação deverá ser compatível com os valores praticados pelo mercado, considerados os preços constantes de bancos de dados públicos e as quantidades a serem contratadas, com prioridade para contratações similares feitas pela Administração Pública em execução ou concluídas no período de <strong>1 (um) ano anterior</strong> à data da pesquisa.
          </p>
          <div className="bg-blue-50 p-2.5 rounded text-[11px] text-blue-900 font-medium">
            ✓ O PNCP é a fonte primária e prioritária oficial para obtenção dessas contratações similares homologadas.
          </div>
        </div>

        {/* Card 2: IN SEGES/ME nº 65/2021 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <FileText className="w-4 h-4" />
            Instrução Normativa SEGES/ME nº 65/2021 (Art. 3º e 6º)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Estabelece que a pesquisa de preços deve conter no mínimo <strong>3 (três) preços válidos</strong> de fontes distintas. Devem ser expurgados os preços inexequíveis ou excessivamente elevados (outliers). Quando o Coeficiente de Variação (CV) for superior a 25%, recomenda-se o uso da <strong>Mediana</strong> em substituição à Média.
          </p>
          <div className="bg-indigo-50 p-2.5 rounded text-[11px] text-indigo-900 font-medium">
            ✓ Nosso motor estatístico aplica automaticamente o teste de Tukey (IQR) e o cálculo de CV%.
          </div>
        </div>
      </div>

      {/* Checklist para Auditoria TCU/TCE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Checklist de Conformidade para Auditoria de Tribunais de Contas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Comprovação da Origem dos Preços</strong>
              <span className="text-slate-500">Cada orçamento possui identificador PNCP e URL pública para verificação do auditor.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Pluralidade de Fornecedores e Órgãos</strong>
              <span className="text-slate-500">Descarte automático de orçamentos do mesmo CNPJ para evitar conluio ou distorção.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Memória de Cálculo e Expurgo Fundamentado</strong>
              <span className="text-slate-500">Registro de todas as amostras descartadas com a justificativa matemática no processo.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Janela Temporal Válida (&lt; 12 Meses)</strong>
              <span className="text-slate-500">Filtro rigoroso limitando as compras homologadas aos últimos 365 dias anteriores à pesquisa.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
