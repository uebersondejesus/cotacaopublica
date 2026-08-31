import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, XCircle, Code, Info, Sparkles, Filter } from 'lucide-react';
import { RawPNCPItem, MetodoFiltroOutlier } from '../types.ts';
import { filtrarOutliersPNCP, selecionarMelhores3Orcamentos, calcularEstatisticasItem } from '../services/pncpEngine.ts';

export const OutlierPlayground: React.FC = () => {
  // Amostra de teste com outliers propositais
  const [amostrasInput, setAmostrasInput] = useState<string>(
    '23.90, 24.50, 25.80, 24.10, 89.90, 3.50, 25.20'
  );
  const [metodo, setMetodo] = useState<MetodoFiltroOutlier>('IQR_TUKEY');
  const [fatorIQR, setFatorIQR] = useState<number>(1.5);
  const [limiteCV, setLimiteCV] = useState<number>(25);

  // Parse dos valores
  const precosNumericos = amostrasInput
    .split(',')
    .map(v => parseFloat(v.trim().replace('R$', '').replace(',', '.')))
    .filter(v => !isNaN(v) && v > 0);

  // Simulação de RawPNCPItems
  const rawItems: RawPNCPItem[] = precosNumericos.map((preco, idx) => ({
    id_compra_pncp: `PNCP-TESTE-${idx + 1}`,
    numero_item: idx + 1,
    descricao_item: `Amostra PNCP #${idx + 1}`,
    quantidade: 100,
    unidade_medida: 'UNIDADE',
    valor_unitario: preco,
    valor_total: preco * 100,
    data_homologacao_adjudicacao: `2024-1${idx % 2 + 0}-1${idx + 1}`,
    cnpj_orgao: `00.123.45${idx}/0001-0${idx}`,
    nome_orgao: `Órgão Público ${String.fromCharCode(65 + idx)}`,
    uf: ['SP', 'MG', 'DF', 'PR', 'RJ'][idx % 5],
    cnpj_vencedor: `12.345.67${idx}/0001-9${idx}`,
    razao_social_vencedor: `Fornecedor Homologado ${String.fromCharCode(65 + idx)} Ltda`,
    modalidade_nome: 'Pregão Eletrônico',
    numero_processo_pncp: `PE 0${idx + 1}/2024`,
    url_pncp: 'https://pncp.gov.br',
  }));

  // Executa algoritmo
  const { itensValidos, itensDescartados, estatisticasAmostra } = filtrarOutliersPNCP(
    rawItems,
    metodo,
    fatorIQR,
    limiteCV
  );

  const { orcamentosSelecionados } = selecionarMelhores3Orcamentos(itensValidos, 3);
  const metricas = calcularEstatisticasItem(orcamentosSelecionados, 100, 'MEDIA');

  const codigoFonteEngine = `/**
 * ALGORITMO ESTATÍSTICO DE PURGAÇÃO DE OUTLIERS E CÁLCULO DE MÉDIAS
 * Conforme Art. 23 da Lei 14.133/2021 e Art. 3º/6º da IN SEGES/ME nº 65/2021
 */
function processarAmostrasPNCP(amostrasBrutas, metodo = 'IQR_TUKEY') {
  // 1. Sanitização inicial (elimina nulos e negativos)
  const validas = amostrasBrutas.filter(i => i.valor_unitario > 0);
  if (validas.length < 3) return validas;

  // 2. Ordenação para análise não-paramétrica de Quartis
  const ordenados = [...validas].sort((a, b) => a.valor_unitario - b.valor_unitario);
  const precos = ordenados.map(i => i.valor_unitario);
  
  const q1 = percentil(precos, 0.25);
  const mediana = percentil(precos, 0.50);
  const q3 = percentil(precos, 0.75);
  const iqr = q3 - q1; // Amplitude Interquartílica

  // 3. Delimitação das cercas de Tukey
  const limiteInferior = Math.max(0.01, q1 - 1.5 * iqr);
  const limiteSuperior = q3 + 1.5 * iqr;

  // 4. Filtragem dos Outliers (preços excessivos ou inexequíveis)
  const homogeneos = validas.filter(
    i => i.valor_unitario >= limiteInferior && i.valor_unitario <= limiteSuperior
  );

  // 5. Seleção de 3 fontes distintas (evita duplicação de CNPJ e Órgão)
  const tresFontes = selecionarFontesDistintas(homogeneos, 3);

  // 6. Cálculo das Médias, Desvio Padrão e Coeficiente de Variação (CV%)
  const precosFinal = tresFontes.map(f => f.valor_unitario);
  const media = precosFinal.reduce((a, b) => a + b, 0) / precosFinal.length;
  const precoMinimo = Math.min(...precosFinal);
  const precoMaximo = Math.max(...precosFinal);
  
  const variancia = precosFinal.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) / precosFinal.length;
  const desvioPadrao = Math.sqrt(variancia);
  const cvPercent = (desvioPadrao / media) * 100;

  // Se CV > 25%, a IN 65/2021 faculta o uso da MEDIANA como referência
  const precoReferencia = cvPercent > 25 ? mediana : media;

  return {
    precoMinimo,
    precoMaximo,
    precoMedio: media,
    precoMediana: mediana,
    desvioPadrao,
    cvPercent,
    precoReferencia,
    fontesSelecionadas: tresFontes
  };
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Motor Matemático & Algoritmo de Outliers (Lei 14.133/21)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstração interativa da remoção de discrepâncias (Tukey IQR / Desvio Padrão) e consolidação das 3 fontes.
          </p>
        </div>
      </div>

      {/* Interactive Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters (Left Column) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-blue-600" />
            Parâmetros do Teste em Tempo Real
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Amostras de Preços Brutos do PNCP (separados por vírgula):
            </label>
            <textarea
              rows={3}
              value={amostrasInput}
              onChange={e => setAmostrasInput(e.target.value)}
              className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ex: 23.90, 24.50, 25.80, 89.90, 3.50"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Dica: Experimente valores discrepantes como <code className="text-red-600 font-bold">89.90</code> (outlier superior) ou <code className="text-red-600 font-bold">3.50</code> (outlier inferior).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Método Estatístico:
              </label>
              <select
                value={metodo}
                onChange={e => setMetodo(e.target.value as MetodoFiltroOutlier)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="IQR_TUKEY">Quartis de Tukey (IQR)</option>
                <option value="DESVIO_PADRAO">Desvio Padrão (2σ)</option>
                <option value="COEFICIENTE_VARIACAO_EXPURGO">Expurgo CV (&gt;25%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fator de Sensibilidade:
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="3.0"
                value={fatorIQR}
                onChange={e => setFatorIQR(parseFloat(e.target.value) || 1.5)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Delimitações Calculadas */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5 font-mono">
            <div className="font-bold text-slate-800 flex justify-between">
              <span>Cerca Inferior (Mínimo Admissível):</span>
              <span className="text-blue-700 font-extrabold">R$ {estatisticasAmostra.limiteInferior.toFixed(2)}</span>
            </div>
            <div className="font-bold text-slate-800 flex justify-between">
              <span>Cerca Superior (Máximo Admissível):</span>
              <span className="text-blue-700 font-extrabold">R$ {estatisticasAmostra.limiteSuperior.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
              <span>Q1 (25%): R$ {estatisticasAmostra.q1.toFixed(2)}</span>
              <span>Mediana: R$ {estatisticasAmostra.mediana.toFixed(2)}</span>
              <span>Q3 (75%): R$ {estatisticasAmostra.q3.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Results Visualizer (Right Column) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Diagnóstico das Amostras & 3 Preços Válidos</span>
            <span className="text-xs font-normal text-slate-500">
              {itensValidos.length} válidas | {itensDescartados.length} expurgadas
            </span>
          </h3>

          {/* Amostras Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {precosNumericos.map((preco, idx) => {
              const isValido = preco >= estatisticasAmostra.limiteInferior && preco <= estatisticasAmostra.limiteSuperior;
              const isSelecionado = orcamentosSelecionados.some(o => o.valor_unitario === preco);

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs transition ${
                    !isValido
                      ? 'bg-red-50/70 border-red-200 text-red-800'
                      : isSelecionado
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] opacity-75">#{idx + 1}</span>
                    {!isValido ? (
                      <span className="text-[10px] font-bold text-red-600 flex items-center gap-0.5">
                        <XCircle className="w-3 h-3" /> Outlier
                      </span>
                    ) : isSelecionado ? (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> 1 das 3 Fontes
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500">Válida (Reserva)</span>
                    )}
                  </div>
                  <div className="text-base font-extrabold mt-1">
                    R$ {preco.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resultado Final Consolidado */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
              Resultado Estatístico Final (Base para o Mapa de Cotação)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Mínimo Válido</span>
                <span className="font-bold text-sm">R$ {metricas.precoMinimo.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Média Aritmética</span>
                <span className="font-bold text-sm text-blue-400">R$ {metricas.precoMedio.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Mediana</span>
                <span className="font-bold text-sm">R$ {metricas.precoMediana.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Máximo Válido</span>
                <span className="font-bold text-sm">R$ {metricas.precoMaximo.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Coeficiente de Variação (CV%): <strong>{metricas.coeficienteVariacao}%</strong>
              </span>
              <span className="text-emerald-400 font-bold">
                Preço de Referência: R$ {metricas.precoReferencia.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Código Fonte do Algoritmo em TypeScript */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-slate-300">
              algoritmo_outliers_lei14133.ts (Lógica de Produção)
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs text-amber-200/90 leading-relaxed">
          <pre>{codigoFonteEngine}</pre>
        </div>
      </div>
    </div>
  );
};
