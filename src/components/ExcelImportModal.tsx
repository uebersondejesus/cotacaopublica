import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { ItemCotacao } from '../types.ts';
import {
  parseExcelFile,
  convertRowsToItems,
  downloadPlanilhaModeloExcel,
  ParsedSheetData,
  ColumnMapping
} from '../utils/excelParser.ts';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportItems?: (items: ItemCotacao[], mode: 'REPLACE' | 'APPEND', autoSync: boolean) => void;
  onImport?: (items: ItemCotacao[], mode: 'REPLACE' | 'APPEND', autoSync: boolean) => void;
  currentItemsCount?: number;
  currentItensCount?: number;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onImportItems,
  onImport,
  currentItemsCount = 0,
  currentItensCount = 0,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedSheetData | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({
    descricao: '',
    quantidade: '',
    unidade_medida: '',
    codigo_catmat: '',
    numero_item: '',
  });
  const [importMode, setImportMode] = useState<'REPLACE' | 'APPEND'>('APPEND');
  const [autoSyncPNCP, setAutoSyncPNCP] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const totalCurrent = currentItemsCount || currentItensCount || 0;
  const importCallback = onImportItems || onImport;

  const handleFileChange = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      const data = await parseExcelFile(file);
      setParsedData(data);
      setMapping(data.detectedMapping);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar arquivo. Verifique o formato e tente novamente.');
      setParsedData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = async () => {
    setError(null);

    if (!parsedData) {
      setError('Por favor, carregue uma planilha antes de confirmar.');
      return;
    }

    // Auto-fallback para descrição se ainda estiver em branco
    const activeMapping = { ...mapping };
    if (!activeMapping.descricao && parsedData.headers.length > 0) {
      activeMapping.descricao = parsedData.headers[0];
      setMapping(activeMapping);
    }

    const startIdx = importMode === 'APPEND' ? totalCurrent + 1 : 1;
    const items = convertRowsToItems(parsedData.rows, activeMapping, startIdx);

    if (items.length === 0) {
      setError('Nenhum item válido encontrado na planilha. Por favor, verifique se a coluna de "Descrição / Objeto" está selecionada corretamente.');
      return;
    }

    setIsImporting(true);

    try {
      if (importCallback) {
        await importCallback(items, importMode, autoSyncPNCP);
      }
      onClose();
    } catch (err: any) {
      console.error('Erro ao executar importação de itens:', err);
      setError(err.message || 'Ocorreu um erro ao importar os itens. Tente novamente.');
    } finally {
      setIsImporting(false);
    }
  };

  // Linhas de pré-visualização convertidas
  const previewItems = parsedData && mapping.descricao
    ? convertRowsToItems(parsedData.rows.slice(0, 5), mapping, 1)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Importar Lista de Itens do Excel
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  .XLSX, .XLS, .CSV
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Carregue a relação de itens do Termo de Referência ou ETP para cotação no PNCP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* File Upload Zone */}
          {!parsedData ? (
            <div className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/80 bg-slate-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                  {loading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {loading ? 'Lendo e estruturando planilha...' : 'Arraste a planilha aqui ou clique para selecionar'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Formatos suportados: Microsoft Excel (.xlsx, .xls) e CSV (.csv)
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                    Auto-detecção de colunas
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                    Sem limite de linhas
                  </span>
                </div>
              </div>

              {/* Template Download Option */}
              <div className="flex items-center justify-between p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-900">
                    Não tem uma planilha formatada? Baixe o modelo padrão preenchível:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={downloadPlanilhaModeloExcel}
                  className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar Modelo .XLSX
                </button>
              </div>
            </div>
          ) : (
            /* Spreadsheet Parsed & Column Mapping */
            <div className="space-y-5">
              {/* File Info Bar */}
              <div className="flex items-center justify-between p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                      {parsedData.fileName}
                      <span className="text-[10px] font-normal px-2 py-0.2 rounded-full bg-emerald-200 text-emerald-900">
                        {parsedData.totalRows} {parsedData.totalRows === 1 ? 'linha encontrada' : 'linhas encontradas'}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setParsedData(null);
                    setError(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 underline font-medium cursor-pointer"
                >
                  Trocar arquivo
                </button>
              </div>

              {/* Column Mapping Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Mapeamento das Colunas da Planilha
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Verifique se os campos foram vinculados corretamente
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Descrição (Obrigatório) */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Descrição / Objeto <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={mapping.descricao}
                      onChange={e => setMapping(prev => ({ ...prev, descricao: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Selecione a coluna...</option>
                      {parsedData.headers.map(h => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantidade (Obrigatório) */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Quantidade <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={mapping.quantidade}
                      onChange={e => setMapping(prev => ({ ...prev, quantidade: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Selecione a coluna...</option>
                      {parsedData.headers.map(h => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Unidade de Medida */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Unidade de Medida
                    </label>
                    <select
                      value={mapping.unidade_medida || ''}
                      onChange={e => setMapping(prev => ({ ...prev, unidade_medida: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">(Padrão: UNIDADE)</option>
                      {parsedData.headers.map(h => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Código CATMAT */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Código CATMAT / CATSER
                    </label>
                    <select
                      value={mapping.codigo_catmat || ''}
                      onChange={e => setMapping(prev => ({ ...prev, codigo_catmat: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">(Opcional)</option>
                      {parsedData.headers.map(h => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Número do Item */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Número / Posição do Item
                    </label>
                    <select
                      value={mapping.numero_item || ''}
                      onChange={e => setMapping(prev => ({ ...prev, numero_item: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">(Sequencial Automático)</option>
                      {parsedData.headers.map(h => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Preview Table */}
              {previewItems.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>Prévia dos primeiros {previewItems.length} itens convertidos:</span>
                    <span className="text-emerald-700 font-bold">
                      Total a importar: {parsedData.totalRows} itens
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="px-3 py-2 text-center w-12">#</th>
                          <th className="px-3 py-2">Descrição Detectada</th>
                          <th className="px-3 py-2 text-center w-24">Qtd</th>
                          <th className="px-3 py-2 text-center w-20">Unidade</th>
                          <th className="px-3 py-2 text-center w-24">CATMAT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {previewItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-3 py-2 text-center font-mono font-bold text-slate-500">
                              {item.numero_item}
                            </td>
                            <td className="px-3 py-2 font-medium text-slate-800">
                              {item.descricao}
                            </td>
                            <td className="px-3 py-2 text-center font-mono font-bold text-blue-700">
                              {item.quantidade}
                            </td>
                            <td className="px-3 py-2 text-center text-slate-600">
                              {item.unidade_medida}
                            </td>
                            <td className="px-3 py-2 text-center font-mono text-slate-500">
                              {item.codigo_catmat || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Import Options (Replace vs Append & Auto-sync) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Destination Mode */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Destino dos Itens:
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'APPEND'}
                        onChange={() => setImportMode('APPEND')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        Adicionar aos itens existentes ({currentItemsCount} já cadastrados)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'REPLACE'}
                        onChange={() => setImportMode('REPLACE')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-rose-700 font-medium">
                        Substituir toda a lista atual de itens
                      </span>
                    </label>
                  </div>
                </div>

                {/* Sincronização Automática */}
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200/80 space-y-2">
                  <label className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Sincronização com PNCP:
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-blue-900">
                    <input
                      type="checkbox"
                      checked={autoSyncPNCP}
                      onChange={e => setAutoSyncPNCP(e.target.checked)}
                      className="mt-0.5 text-blue-600 rounded-sm focus:ring-blue-500"
                    />
                    <span>
                      <strong>Sincronizar no PNCP imediatamente</strong> após a importação (obter as 3 cotações de cada item)
                    </span>
                  </label>
                  <p className="text-[11px] text-blue-700/80 pl-5">
                    Se desmarcado, os itens serão importados como <span className="font-semibold text-amber-700">"Pendente de Sincronização"</span> para que você possa sincronizá-los individualmente ou em lote depois.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isImporting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
            {error && (
              <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </span>
            )}
          </div>

          {parsedData && (
            <button
              type="button"
              onClick={handleConfirmImport}
              disabled={isImporting}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isImporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Importando itens...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>
                    Confirmar Importação de {parsedData.totalRows} {parsedData.totalRows === 1 ? 'Item' : 'Itens'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
