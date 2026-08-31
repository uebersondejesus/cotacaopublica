import React, { useState } from 'react';
import { Cotacao } from '../types.ts';
import { gerarMapaCotacaoRelatorio } from '../services/pncpEngine.ts';
import {
  Printer,
  Download,
  ShieldCheck,
  Building,
  ExternalLink,
  Scale,
  FileCheck2,
  Tag,
  Package,
  Layers,
  Info
} from 'lucide-react';

interface MapaCotacaoViewProps {
  cotacao: Cotacao;
  onVoltarParaItens: () => void;
}

export const MapaCotacaoView: React.FC<MapaCotacaoViewProps> = ({
  cotacao,
  onVoltarParaItens
}) => {
  const relatorio = gerarMapaCotacaoRelatorio(cotacao);
  const [detalhesExpandidos, setDetalhesExpandidos] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(relatorio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mapa_cotacao_${cotacao.numero_processo.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar (hidden during print) */}
      <div className="print:hidden bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            Mapa de Cotação de Preços Homologado
          </h3>
          <p className="text-xs text-slate-500">
            Documento formal para instrução do processo licitatório com respaldo no Art. 23 da Lei 14.133/21 e IN SEGES/ME 65/2021.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDetalhesExpandidos(!detalhesExpandidos)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            {detalhesExpandidos ? 'Ocultar Detalhes PNCP' : 'Expandir Detalhes PNCP'}
          </button>
          <button
            onClick={onVoltarParaItens}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Editar Itens
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar JSON
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Gerar PDF
          </button>
        </div>
      </div>

      {/* Relatório Oficial A4 Formatted Document */}
      <div className="bg-white rounded-xl border border-slate-300 p-8 sm:p-12 shadow-md max-w-5xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 text-slate-800 font-sans">
        
        {/* Cabeçalho Oficial Governamental */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-1">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow">
              <Building className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <h1 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
            ESTADO DE GESTÃO PÚBLICA • ADMINISTRAÇÃO DIRETA
          </h1>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {relatorio.cabecalho.departamento}
          </h2>
          <div className="pt-2">
            <span className="inline-block bg-slate-900 text-white px-3 py-1 text-xs font-extrabold tracking-wider uppercase rounded">
              MAPA DE COTAÇÃO DE PREÇOS ESTIMATIVOS (PNCP)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1 font-mono">
            Amparo: {relatorio.cabecalho.amparo_legal}
          </p>
        </div>

        {/* Metadados do Processo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Nº Processo Administrativo</span>
            <span className="font-bold text-slate-900">{relatorio.cabecalho.numero_processo}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Data de Emissão</span>
            <span className="font-semibold text-slate-800">{relatorio.cabecalho.data_emissao}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Responsável da Pesquisa</span>
            <span className="font-semibold text-slate-800">{relatorio.cabecalho.responsavel}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Código Autenticação PNCP</span>
            <span className="font-mono text-[11px] font-bold text-blue-700">{relatorio.cabecalho.codigo_verificacao}</span>
          </div>
          <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Objeto da Licitação / Contratação</span>
            <p className="font-medium text-slate-800 text-xs mt-0.5">{relatorio.cabecalho.objeto}</p>
          </div>
        </div>

        {/* Banner Informativo sobre Similaridade e Marcas PNCP */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5 print:bg-white print:border-slate-300">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">
              Metodologia de Aferição por Similaridade Técnica e Amostras do PNCP
            </p>
            <p className="text-[11px] text-blue-800/90 print:text-slate-700">
              Em cumprimento ao Art. 23 da Lei 14.133/2021 e IN SEGES/ME 65/2021, cada item possui sua cesta de preços composta por contratações similares registradas no PNCP, exibindo o <strong>Preço Unitário Homologado</strong>, a <strong>Descrição/Nome Similar do Item no PNCP</strong> e a <strong>Marca/Fabricante Adjudicada</strong>.
            </p>
          </div>
        </div>

        {/* Tabela do Mapa de Cotação Consolidado */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            1. Demonstrativo das Amostras Coletadas no PNCP e Consolidação Estatística
          </h3>

          {relatorio.itens.map((item, idx) => {
            const orcamentosLista = [item.orcam_1, item.orcam_2, item.orcam_3].filter(Boolean);

            return (
              <div
                key={idx}
                className="border border-slate-300 rounded-lg overflow-hidden text-xs break-inside-avoid shadow-xs"
              >
                {/* Cabeçalho do Item */}
                <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-bold">
                        ITEM {item.item_numero}
                      </span>
                      <span>{item.descricao}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-slate-700 font-mono text-xs bg-white px-2.5 py-1 rounded border border-slate-200">
                      Qtd: <strong>{item.quantidade.toLocaleString('pt-BR')}</strong> {item.unidade_medida}
                    </div>
                    <div className="text-right bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                      <span className="text-[10px] text-blue-700 block font-bold">Preço Unitário Ref.</span>
                      <strong className="text-blue-950 text-xs">
                        R$ {item.preco_referencia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Tabela de Fontes do Item */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                        <th className="p-2.5 w-12 text-center">Fonte</th>
                        <th className="p-2.5 min-w-[200px]">Item Similar & Marca no PNCP</th>
                        <th className="p-2.5 min-w-[180px]">Fornecedor Adjudicado (CNPJ)</th>
                        <th className="p-2.5">Órgão Contratante / UF</th>
                        <th className="p-2.5 text-center">Data Compra</th>
                        <th className="p-2.5 text-center">Modalidade / Processo</th>
                        <th className="p-2.5 text-right font-extrabold bg-blue-50/50">Preço Unitário</th>
                        <th className="p-2.5 text-center print:hidden">Comprovante</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {orcamentosLista.length > 0 ? (
                        orcamentosLista.map((orc, orcIdx) => (
                          <tr key={orcIdx} className="hover:bg-slate-50/60 transition">
                            {/* Fonte Index */}
                            <td className="p-2.5 text-center font-bold text-blue-700 align-top">
                              <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] leading-6 font-mono">
                                #{orcIdx + 1}
                              </span>
                            </td>

                            {/* Item Similar PNCP e Marca */}
                            <td className="p-2.5 align-top">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] px-1.5 py-0.5 rounded">
                                    <Tag className="w-3 h-3 text-amber-700" />
                                    Marca: {orc?.marca_produto || 'Não informada'}
                                  </span>
                                  {orc?.unidade_medida_pncp && (
                                    <span className="text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                      Unid. PNCP: {orc.unidade_medida_pncp}
                                    </span>
                                  )}
                                </div>

                                <div className="text-[11px] font-medium text-slate-900 leading-snug flex items-start gap-1">
                                  <Package className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                                  <span>
                                    {orc?.descricao_item_pncp || item.descricao}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Fornecedor */}
                            <td className="p-2.5 align-top">
                              <div className="font-semibold text-slate-800">{orc?.razao_social_fornecedor}</div>
                              <div className="text-[10px] text-slate-500 font-mono">CNPJ: {orc?.cnpj_fornecedor}</div>
                            </td>

                            {/* Órgão */}
                            <td className="p-2.5 align-top">
                              <div className="font-medium text-slate-800">{orc?.orgao_contratante}</div>
                              <div className="text-[10px] text-slate-500">
                                UF: <strong className="text-slate-700">{orc?.uf_orgao}</strong>
                                {orc?.municipio_orgao ? ` • ${orc.municipio_orgao}` : ''}
                                {orc?.uasg_codigo ? ` (UASG: ${orc.uasg_codigo})` : ''}
                              </div>
                            </td>

                            {/* Data Compra */}
                            <td className="p-2.5 text-center font-mono text-slate-700 align-top">
                              {orc?.data_compra ? new Date(orc.data_compra).toLocaleDateString('pt-BR') : '-'}
                            </td>

                            {/* Modalidade */}
                            <td className="p-2.5 text-center text-slate-600 font-mono align-top">
                              <div className="font-semibold text-slate-800">{orc?.modalidade_licitacao || 'Pregão'}</div>
                              <div className="text-[10px] text-slate-500">{orc?.numero_compra || '-'}</div>
                            </td>

                            {/* Preço Unitário */}
                            <td className="p-2.5 text-right font-extrabold text-slate-900 bg-blue-50/40 align-top">
                              <div className="text-xs text-blue-900 font-mono font-bold">
                                R$ {(orc?.valor_unitario || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              <span className="text-[9px] font-normal text-slate-500">
                                /{item.unidade_medida}
                              </span>
                            </td>

                            {/* Link Comprovante */}
                            <td className="p-2.5 text-center print:hidden align-top">
                              {orc?.link_pncp && (
                                <a
                                  href={orc.link_pncp}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition"
                                >
                                  PNCP
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-slate-400 italic">
                            Nenhum orçamento válido homologado registrado para este item.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Linha de Consolidação e Apuração Estatística */}
                <div className="bg-slate-100/80 p-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                  <div className="flex flex-wrap items-center gap-4 text-slate-700">
                    <span>Preço Mín: <strong>R$ {item.preco_min.toFixed(2)}</strong></span>
                    <span className="text-blue-900 font-bold bg-blue-100/60 px-1.5 py-0.5 rounded">
                      Média: R$ {item.preco_medio.toFixed(2)}
                    </span>
                    <span>Mediana: <strong>R$ {item.preco_mediana.toFixed(2)}</strong></span>
                    <span>Preço Máx: <strong>R$ {item.preco_max.toFixed(2)}</strong></span>
                    <span className="text-slate-600 font-mono">
                      CV: <strong>{item.cv_percent}%</strong>
                    </span>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div className="text-slate-600 text-xs">
                      Preço Unitário Referência: <strong className="text-slate-900">R$ {item.preco_referencia.toFixed(2)}/{item.unidade_medida}</strong>
                    </div>
                    <div className="bg-slate-900 text-white px-2.5 py-1 rounded text-xs">
                      <span className="text-[10px] text-slate-300 mr-1">Valor Total Estimado:</span>
                      <strong className="font-extrabold text-amber-300">
                        R$ {item.total_item.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Justificativa Metodológica */}
                <div className="px-3.5 py-2 bg-white border-t border-slate-200 text-[11px] text-slate-600 italic">
                  <strong>Enquadramento Legal:</strong> {item.justificativa_metodo}
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo Financeiro Global */}
        <div className="my-6 p-5 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-300 block tracking-wider">
              VALOR TOTAL GLOBAL ESTIMADO DA CONTRATAÇÃO
            </span>
            <div className="text-2xl font-extrabold mt-0.5 text-amber-300">
              R$ {relatorio.resumo_financeiro.valor_total_estimado_global.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Extenso: Calculado por apuração de preços unitários públicos homologados no PNCP
            </p>
          </div>
          <div className="text-right text-xs space-y-0.5 text-slate-300">
            <div>Total de Itens: <strong className="text-white">{relatorio.resumo_financeiro.total_itens}</strong></div>
            <div>Itens Cotados com Sucesso: <strong className="text-white">{relatorio.resumo_financeiro.itens_cotados_sucesso} de {relatorio.resumo_financeiro.total_itens}</strong></div>
            <div>Metodologia Base: <strong className="text-white">Média Aritmética / Mediana</strong></div>
            <div className="text-emerald-400 font-medium">CV Médio Global: {relatorio.resumo_financeiro.coeficiente_variacao_medio}% (Variação Controlada)</div>
          </div>
        </div>

        {/* Termo de Conformidade e Declaração Legal */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-xs text-slate-700 space-y-2 mt-6">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Declaração de Conformidade com a Lei Federal nº 14.133/2021
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {relatorio.termo_conformidade}
          </p>
          <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-200">
            Autenticidade e Trilha de Auditoria: {relatorio.assinatura_digital_mock}
          </div>
        </div>

        {/* Campos de Assinatura */}
        <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-slate-300 text-center text-xs">
          <div className="space-y-1">
            <div className="border-b border-slate-400 w-3/4 mx-auto mb-2"></div>
            <p className="font-bold text-slate-900">{relatorio.cabecalho.responsavel}</p>
            <p className="text-[11px] text-slate-500">{relatorio.cabecalho.cargo_responsavel}</p>
          </div>

          <div className="space-y-1">
            <div className="border-b border-slate-400 w-3/4 mx-auto mb-2"></div>
            <p className="font-bold text-slate-900">Autoridade Competente / Ordenador de Despesa</p>
            <p className="text-[11px] text-slate-500">Secretaria / Diretoria de Administração</p>
          </div>
        </div>
      </div>
    </div>
  );
};
