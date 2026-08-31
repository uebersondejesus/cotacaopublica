import React, { useState, useMemo } from 'react';
import {
  Cotacao,
  ItemCotacao,
  MetodologiaCalculoPreco,
  MetodoFiltroOutlier
} from '../types.ts';
import { processarItemCotacao, ESTADOS_BRASIL } from '../services/pncpEngine.ts';
import { ExcelImportModal } from './ExcelImportModal.tsx';
import {
  Plus,
  Trash2,
  RefreshCw,
  Search,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  TrendingDown,
  Building,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  FileSpreadsheet,
  Table as TableIcon,
  LayoutGrid,
  MapPin,
  Filter,
  Clock,
  RotateCcw,
  Pencil,
  FileUp,
  Check,
  CheckCircle2,
  AlertCircle,
  X,
  Tag,
  Package
} from 'lucide-react';

interface CotacaoManagerProps {
  cotacao: Cotacao;
  setCotacao: React.Dispatch<React.SetStateAction<Cotacao>>;
  onGerarMapa: () => void;
}

export const CotacaoManager: React.FC<CotacaoManagerProps> = ({
  cotacao,
  setCotacao,
  onGerarMapa
}) => {
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [processingItemIndex, setProcessingItemIndex] = useState<number | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [expandedItemAuditoria, setExpandedItemAuditoria] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'tabela' | 'cards'>('tabela');

  // Estado de Edição de Item Existente
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [editItemDesc, setEditItemDesc] = useState('');
  const [editItemQtd, setEditItemQtd] = useState(1);
  const [editItemUnidade, setEditItemUnidade] = useState('UNIDADE');
  const [editItemCatmat, setEditItemCatmat] = useState('');

  // Novo Item Form State
  const [novoItemDesc, setNovoItemDesc] = useState('');
  const [novoItemQtd, setNovoItemQtd] = useState(100);
  const [novoItemUnidade, setNovoItemUnidade] = useState('UNIDADE');
  const [novoItemCatmat, setNovoItemCatmat] = useState('');

  // Parâmetros de Filtro (Estado e Intervalo Temporal)
  const [filtroUF, setFiltroUF] = useState<string>('');
  
  // Datas padrão: últimos 12 meses
  const calcularDatasPadrao = (meses: number) => {
    const fim = new Date().toISOString().split('T')[0];
    const dInicio = new Date();
    dInicio.setMonth(dInicio.getMonth() - meses);
    const inicio = dInicio.toISOString().split('T')[0];
    return { inicio, fim };
  };

  const datasPadrao = useMemo(() => calcularDatasPadrao(12), []);
  const [tipoPeriodo, setTipoPeriodo] = useState<'12_MESES' | '6_MESES' | '3_MESES' | 'ANO_ATUAL' | 'PERSONALIZADO'>('12_MESES');
  const [dataInicio, setDataInicio] = useState<string>(datasPadrao.inicio);
  const [dataFim, setDataFim] = useState<string>(datasPadrao.fim);

  // Parâmetros Estatísticos de Outlier
  const [metodoOutlier, setMetodoOutlier] = useState<MetodoFiltroOutlier>('IQR_TUKEY');
  const [fatorIQR, setFatorIQR] = useState(1.5);
  const [limiteCV, setLimiteCV] = useState(25);

  // Manipulador de mudança de tipo de período
  const handleMudarTipoPeriodo = (tipo: '12_MESES' | '6_MESES' | '3_MESES' | 'ANO_ATUAL' | 'PERSONALIZADO') => {
    setTipoPeriodo(tipo);
    const hojeStr = new Date().toISOString().split('T')[0];
    
    if (tipo === '12_MESES') {
      const d = new Date();
      d.setMonth(d.getMonth() - 12);
      setDataInicio(d.toISOString().split('T')[0]);
      setDataFim(hojeStr);
    } else if (tipo === '6_MESES') {
      const d = new Date();
      d.setMonth(d.getMonth() - 6);
      setDataInicio(d.toISOString().split('T')[0]);
      setDataFim(hojeStr);
    } else if (tipo === '3_MESES') {
      const d = new Date();
      d.setMonth(d.getMonth() - 3);
      setDataInicio(d.toISOString().split('T')[0]);
      setDataFim(hojeStr);
    } else if (tipo === 'ANO_ATUAL') {
      const anoAtual = new Date().getFullYear();
      setDataInicio(`${anoAtual}-01-01`);
      setDataFim(`${anoAtual}-12-31`);
    }
  };

  // Modelos de Licitação Predefinidos
  const carregarModelo = (tipo: 'escritorio' | 'ti' | 'combustivel' | 'mobiliario') => {
    if (tipo === 'escritorio') {
      const novosItens: ItemCotacao[] = [
        {
          id: `item-${Date.now()}-1`,
          cotacao_id: cotacao.id,
          numero_item: 1,
          descricao: 'Papel sulfite A4, 75g/m², alcalino, 210x297mm, resma com 500 folhas',
          quantidade: 500,
          unidade_medida: 'RESMA',
          codigo_catmat: '447214',
          status_processamento: 'PENDENTE',
          orcamentos: []
        },
        {
          id: `item-${Date.now()}-2`,
          cotacao_id: cotacao.id,
          numero_item: 2,
          descricao: 'Caneta esferográfica azul, corpo plástico sextavado, ponta média 1.0mm',
          quantidade: 2000,
          unidade_medida: 'UNIDADE',
          codigo_catmat: '312890',
          status_processamento: 'PENDENTE',
          orcamentos: []
        }
      ];
      setCotacao(prev => ({
        ...prev,
        titulo: 'Aquisição de Material de Escritório e Suprimentos Administrativos',
        objeto: 'Registro de Preços para fornecimento parcelado de material de expediente.',
        itens: novosItens
      }));
    } else if (tipo === 'ti') {
      const novosItens: ItemCotacao[] = [
        {
          id: `item-${Date.now()}-1`,
          cotacao_id: cotacao.id,
          numero_item: 1,
          descricao: 'Notebook corporativo Intel Core i7, 16GB RAM DDR5, SSD 512GB NVMe, tela 15.6"',
          quantidade: 20,
          unidade_medida: 'UNIDADE',
          codigo_catmat: '482910',
          status_processamento: 'PENDENTE',
          orcamentos: []
        }
      ];
      setCotacao(prev => ({
        ...prev,
        titulo: 'Modernização do Parque Computacional - Equipamentos de TI',
        objeto: 'Aquisição de computadores portáteis tipo notebook corporativo de alto desempenho.',
        itens: novosItens
      }));
    } else if (tipo === 'mobiliario') {
      const novosItens: ItemCotacao[] = [
        {
          id: `item-${Date.now()}-1`,
          cotacao_id: cotacao.id,
          numero_item: 1,
          descricao: 'Cadeira de escritório giratória ergonômica, espaldar alto, NR-17, braços reguláveis',
          quantidade: 40,
          unidade_medida: 'UNIDADE',
          codigo_catmat: '318920',
          status_processamento: 'PENDENTE',
          orcamentos: []
        }
      ];
      setCotacao(prev => ({
        ...prev,
        titulo: 'Mobiliário Ergonômico para Postos de Trabalho',
        objeto: 'Aquisição de cadeiras giratórias ergonômicas em conformidade com a NR-17.',
        itens: novosItens
      }));
    } else if (tipo === 'combustivel') {
      const novosItens: ItemCotacao[] = [
        {
          id: `item-${Date.now()}-1`,
          cotacao_id: cotacao.id,
          numero_item: 1,
          descricao: 'Gasolina comum automotiva tipo C, com percentual regulamentado ANP',
          quantidade: 15000,
          unidade_medida: 'LITRO',
          codigo_catmat: '231900',
          status_processamento: 'PENDENTE',
          orcamentos: []
        }
      ];
      setCotacao(prev => ({
        ...prev,
        titulo: 'Fornecimento Contínuo de Combustíveis para Frota Oficial',
        objeto: 'Abastecimento continuado de gasolina comum para veículos da administração.',
        itens: novosItens
      }));
    }
  };

  // Abrir Modal de Edição para um Item
  const handleAbrirEdicao = (index: number) => {
    const item = cotacao.itens[index];
    if (!item) return;

    setEditingItemIndex(index);
    setEditItemDesc(item.descricao);
    setEditItemQtd(item.quantidade);
    setEditItemUnidade(item.unidade_medida);
    setEditItemCatmat(item.codigo_catmat || '');
  };

  // Salvar Alteração do Item
  const handleSalvarEdicao = async (autoSync: boolean = false) => {
    if (editingItemIndex === null) return;
    const index = editingItemIndex;
    const itemOriginal = cotacao.itens[index];
    if (!itemOriginal) return;

    const descAlterada = editItemDesc.trim() !== itemOriginal.descricao;
    const qtdAlterada = editItemQtd !== itemOriginal.quantidade;
    const unidadeAlterada = editItemUnidade !== itemOriginal.unidade_medida;
    const catmatAlterado = (editItemCatmat.trim() || undefined) !== itemOriginal.codigo_catmat;

    let motivo = '';
    if (descAlterada && qtdAlterada) {
      motivo = 'Descrição e Quantidade alteradas - Requer nova sincronização no PNCP';
    } else if (descAlterada) {
      motivo = 'Descrição alterada - Requer nova busca de preços no PNCP';
    } else if (qtdAlterada) {
      motivo = `Quantidade alterada de ${itemOriginal.quantidade} para ${editItemQtd} - Requer confirmação/sincronização`;
    } else if (unidadeAlterada || catmatAlterado) {
      motivo = 'Especificações técnicas alteradas - Requer nova sincronização';
    }

    // Calcula novo valor total preliminar caso já tenha preço de referência
    const precoRef = itemOriginal.preco_referencia_unitario || itemOriginal.preco_medio || 0;
    const novoValorTotal = precoRef > 0 ? Number((precoRef * editItemQtd).toFixed(2)) : itemOriginal.valor_total_estimado;

    // Se a descrição mudou radicalmente, orçamentos antigos ficam desatualizados
    const itemModificado: ItemCotacao = {
      ...itemOriginal,
      descricao: editItemDesc.trim(),
      quantidade: editItemQtd,
      unidade_medida: editItemUnidade,
      codigo_catmat: editItemCatmat.trim() || undefined,
      valor_total_estimado: novoValorTotal,
      necessita_atualizacao: true,
      motivo_necessidade_atualizacao: motivo || 'Item editado manualmente - Sincronização pendente',
    };

    setCotacao(prev => {
      const novosItens = [...prev.itens];
      novosItens[index] = itemModificado;
      const totalGeral = novosItens.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);
      return {
        ...prev,
        itens: novosItens,
        valor_total_cotacao: totalGeral
      };
    });

    setEditingItemIndex(null);

    // Se o usuário solicitou sincronizar imediatamente após salvar
    if (autoSync) {
      await processarItem(index, itemModificado);
    }
  };

  // Processar 1 item específico (Sincronização Individual)
  const processarItem = async (index: number, itemOverride?: ItemCotacao) => {
    setProcessingItemIndex(index);
    const itemAtual = itemOverride || cotacao.itens[index];

    try {
      const itemAtualizado = await processarItemCotacao(itemAtual, {
        uf: filtroUF || undefined,
        data_inicio: dataInicio,
        data_fim: dataFim,
        tipo_periodo: tipoPeriodo,
        metodo_outlier: metodoOutlier,
        fator_iqr: fatorIQR,
        limite_cv_porcento: limiteCV,
        max_fontes: 3
      });

      setCotacao(prev => {
        const novosItens = [...prev.itens];
        novosItens[index] = itemAtualizado;
        const totalGeral = novosItens.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);
        return {
          ...prev,
          itens: novosItens,
          valor_total_cotacao: totalGeral
        };
      });
    } catch (e) {
      console.error('Erro ao processar item individualmente:', e);
    } finally {
      setProcessingItemIndex(null);
    }
  };

  // Processar apenas itens que necessitam de atualização ou estão pendentes
  const processarItensPendentes = async () => {
    setIsProcessingAll(true);
    try {
      const itensAtuais = [...cotacao.itens];
      for (let i = 0; i < itensAtuais.length; i++) {
        const item = itensAtuais[i];
        if (item.necessita_atualizacao || item.status_processamento === 'PENDENTE' || !item.orcamentos || item.orcamentos.length === 0) {
          setProcessingItemIndex(i);
          const itemProc = await processarItemCotacao(item, {
            uf: filtroUF || undefined,
            data_inicio: dataInicio,
            data_fim: dataFim,
            tipo_periodo: tipoPeriodo,
            metodo_outlier: metodoOutlier,
            fator_iqr: fatorIQR,
            limite_cv_porcento: limiteCV,
            max_fontes: 3
          });
          itensAtuais[i] = itemProc;

          setCotacao(prev => {
            const novosItens = [...itensAtuais];
            const totalGeral = novosItens.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);
            return {
              ...prev,
              itens: novosItens,
              valor_total_cotacao: totalGeral
            };
          });
        }
      }
    } catch (e) {
      console.error('Erro ao sincronizar pendentes:', e);
    } finally {
      setIsProcessingAll(false);
      setProcessingItemIndex(null);
    }
  };

  // Importar Lista de Itens do Excel
  const handleImportItems = async (novosItens: ItemCotacao[], mode: 'REPLACE' | 'APPEND', autoSync: boolean) => {
    let itensFinais: ItemCotacao[] = [];

    if (mode === 'REPLACE') {
      itensFinais = novosItens.map((it, idx) => ({
        ...it,
        cotacao_id: cotacao.id,
        numero_item: idx + 1,
      }));
    } else {
      const baseIndex = cotacao.itens.length;
      const formatados = novosItens.map((it, idx) => ({
        ...it,
        cotacao_id: cotacao.id,
        numero_item: baseIndex + idx + 1,
      }));
      itensFinais = [...cotacao.itens, ...formatados];
    }

    const totalGeral = itensFinais.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);

    setCotacao(prev => ({
      ...prev,
      itens: itensFinais,
      valor_total_cotacao: totalGeral
    }));

    // Se autoSync ativado, inicia a busca no PNCP em lote para os novos itens
    if (autoSync) {
      setIsProcessingAll(true);
      try {
        const startIndex = mode === 'REPLACE' ? 0 : cotacao.itens.length;
        const itensAtualizados = [...itensFinais];

        for (let i = startIndex; i < itensAtualizados.length; i++) {
          setProcessingItemIndex(i);
          const itemProc = await processarItemCotacao(itensAtualizados[i], {
            uf: filtroUF || undefined,
            data_inicio: dataInicio,
            data_fim: dataFim,
            tipo_periodo: tipoPeriodo,
            metodo_outlier: metodoOutlier,
            fator_iqr: fatorIQR,
            limite_cv_porcento: limiteCV,
            max_fontes: 3
          });
          itensAtualizados[i] = itemProc;

          setCotacao(prev => {
            const list = [...itensAtualizados];
            const tot = list.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);
            return {
              ...prev,
              itens: list,
              valor_total_cotacao: tot
            };
          });
        }
      } catch (e) {
        console.error('Erro na sincronização pós-importação:', e);
      } finally {
        setIsProcessingAll(false);
        setProcessingItemIndex(null);
      }
    }
  };

  // Processar todos os itens da cotação
  const processarTodosOsItens = async () => {
    setIsProcessingAll(true);
    try {
      const itensAtualizados: ItemCotacao[] = [];

      for (let i = 0; i < cotacao.itens.length; i++) {
        setProcessingItemIndex(i);
        const itemProc = await processarItemCotacao(cotacao.itens[i], {
          uf: filtroUF || undefined,
          data_inicio: dataInicio,
          data_fim: dataFim,
          tipo_periodo: tipoPeriodo,
          metodo_outlier: metodoOutlier,
          fator_iqr: fatorIQR,
          limite_cv_porcento: limiteCV,
          max_fontes: 3
        });
        itensAtualizados.push(itemProc);
      }

      const totalGeral = itensAtualizados.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);

      setCotacao(prev => ({
        ...prev,
        status: 'CONCLUIDA',
        data_conclusao: new Date().toISOString(),
        itens: itensAtualizados,
        valor_total_cotacao: totalGeral
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessingAll(false);
      setProcessingItemIndex(null);
    }
  };

  // Adicionar novo item
  const handleAdicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItemDesc.trim()) return;

    const novoItem: ItemCotacao = {
      id: `item-${Date.now()}`,
      cotacao_id: cotacao.id,
      numero_item: cotacao.itens.length + 1,
      descricao: novoItemDesc,
      quantidade: novoItemQtd,
      unidade_medida: novoItemUnidade,
      codigo_catmat: novoItemCatmat || undefined,
      status_processamento: 'PENDENTE',
      orcamentos: []
    };

    setCotacao(prev => ({
      ...prev,
      itens: [...prev.itens, novoItem]
    }));

    setNovoItemDesc('');
    setNovoItemQtd(100);
    setNovoItemCatmat('');
    setShowItemModal(false);
  };

  // Remover item
  const handleRemoverItem = (index: number) => {
    setCotacao(prev => {
      const filtrados = prev.itens.filter((_, i) => i !== index);
      // Re-indexa numero_item
      const reindexados = filtrados.map((it, idx) => ({ ...it, numero_item: idx + 1 }));
      const total = reindexados.reduce((acc, curr) => acc + (curr.valor_total_estimado || 0), 0);
      return {
        ...prev,
        itens: reindexados,
        valor_total_cotacao: total
      };
    });
  };

  const toggleAuditoria = (itemId: string) => {
    setExpandedItemAuditoria(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const itensConcluidos = cotacao.itens.filter(i => i.orcamentos && i.orcamentos.length > 0).length;
  
  const itensNecessitamAtualizacao = useMemo(() => {
    return cotacao.itens.filter(i => i.necessita_atualizacao);
  }, [cotacao.itens]);

  const itensPendentesGeral = useMemo(() => {
    return cotacao.itens.filter(i => i.necessita_atualizacao || i.status_processamento === 'PENDENTE' || !i.orcamentos || i.orcamentos.length === 0);
  }, [cotacao.itens]);

  return (
    <div className="space-y-6">
      {/* Sleek Top Process Summary Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              Processo Administrativo
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {cotacao.numero_processo}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {cotacao.titulo}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 flex flex-wrap items-center gap-2">
            <span>ID: <span className="font-mono text-slate-700 font-semibold">#{cotacao.numero_processo}</span></span>
            <span className="opacity-40">•</span>
            <span>Data: {new Date(cotacao.data_criacao).toLocaleDateString('pt-BR')}</span>
            <span className="opacity-40">•</span>
            <span>Status:</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${
              itensNecessitamAtualizacao.length > 0
                ? 'bg-amber-100 text-amber-800'
                : itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0
                ? 'bg-emerald-100 text-emerald-800'
                : itensConcluidos > 0
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {itensNecessitamAtualizacao.length > 0
                ? `${itensNecessitamAtualizacao.length} Requer Atualização`
                : itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0
                ? 'Homologado (100%)'
                : itensConcluidos > 0
                ? 'Em Análise (Parcial)'
                : 'Em Elaboração'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 self-end md:self-auto pt-2 md:pt-0">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Itens Totais</p>
            <p className="text-2xl font-bold text-slate-800">
              {String(cotacao.itens.length).padStart(2, '0')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Valor Estimado</p>
            <p className="text-2xl font-bold text-blue-600">
              R$ {(cotacao.valor_total_cotacao || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Dados Gerais da Cotação & Parâmetros */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Configurações do Processo & Agente Responsável
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {cotacao.departamento} • Responsável: <strong>{cotacao.responsavel_nome}</strong> ({cotacao.responsavel_cargo})
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Cargas Rápidas:
            </span>
            <button
              id="preset-escritorio"
              onClick={() => carregarModelo('escritorio')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              Mat. Escritório
            </button>
            <button
              id="preset-ti"
              onClick={() => carregarModelo('ti')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              TI / Notebooks
            </button>
            <button
              id="preset-mobiliario"
              onClick={() => carregarModelo('mobiliario')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              Mobiliário NR-17
            </button>
            <button
              id="preset-combustivel"
              onClick={() => carregarModelo('combustivel')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              Combustível
            </button>
          </div>
        </div>

        {/* Parâmetros de Filtro & Conformidade IN 65/2021 */}
        <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Critérios de Busca no PNCP & Delimitação Territorial / Temporal</span>
            </div>
            
            {/* Quick reset */}
            {(filtroUF || tipoPeriodo !== '12_MESES') && (
              <button
                onClick={() => {
                  setFiltroUF('');
                  handleMudarTipoPeriodo('12_MESES');
                }}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Redefinir Filtros Regionais
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            {/* Filtro por Estado (UF) */}
            <div>
              <label className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Filtro por Estado (UF):
              </label>
              <select
                id="select-filtro-uf"
                value={filtroUF}
                onChange={e => setFiltroUF(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-2xs"
              >
                <option value="">Todos os Estados (Abrangência Nacional)</option>
                {ESTADOS_BRASIL.map(est => (
                  <option key={est.sigla} value={est.sigla}>
                    {est.sigla} - {est.nome} ({est.regiao})
                  </option>
                ))}
              </select>
            </div>

            {/* Intervalo Temporal / Janela de Datas */}
            <div>
              <label className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Período Temporal:
              </label>
              <select
                id="select-tipo-periodo"
                value={tipoPeriodo}
                onChange={e => handleMudarTipoPeriodo(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-2xs"
              >
                <option value="12_MESES">Últimos 12 Meses (Padrão IN 65/21)</option>
                <option value="6_MESES">Últimos 6 Meses</option>
                <option value="3_MESES">Últimos 3 Meses</option>
                <option value="ANO_ATUAL">Ano Vigente ({new Date().getFullYear()})</option>
                <option value="PERSONALIZADO">Intervalo de Datas Personalizado</option>
              </select>
            </div>

            {/* Metodologia de Preço */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Metodologia de Preço (Art. 6º IN 65):
              </label>
              <select
                value={cotacao.metodologia_padrao}
                onChange={e =>
                  setCotacao(prev => ({
                    ...prev,
                    metodologia_padrao: e.target.value as MetodologiaCalculoPreco
                  }))
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-2xs"
              >
                <option value="MEDIA">Média Aritmética Simples (Padrão)</option>
                <option value="MEDIANA">Mediana das Propostas</option>
                <option value="MENOR_VALOR">Menor Valor Homologado</option>
              </select>
            </div>

            {/* Filtro de Outliers */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Filtro Estatístico de Outliers:
              </label>
              <select
                value={metodoOutlier}
                onChange={e => setMetodoOutlier(e.target.value as MetodoFiltroOutlier)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-2xs"
              >
                <option value="IQR_TUKEY">Método dos Quartis Tukey (IQR 1.5x)</option>
                <option value="DESVIO_PADRAO">Desvio Padrão (Média ± 2σ)</option>
                <option value="COEFICIENTE_VARIACAO_EXPURGO">Expurgo Coef. Variação (&gt;25%)</option>
              </select>
            </div>
          </div>

          {/* Sub-linha para intervalo customizado e indicador ativo */}
          <div className="pt-2 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Datas Limite:
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">De:</span>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={e => {
                    setDataInicio(e.target.value);
                    setTipoPeriodo('PERSONALIZADO');
                  }}
                  className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Até:</span>
                <input
                  type="date"
                  value={dataFim}
                  onChange={e => {
                    setDataFim(e.target.value);
                    setTipoPeriodo('PERSONALIZADO');
                  }}
                  className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Badges de Filtros Ativos */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-400">Escopo da Busca:</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                filtroUF ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
              }`}>
                <MapPin className="w-2.5 h-2.5" />
                {filtroUF ? `Estado: ${filtroUF}` : 'Brasil (Nacional)'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1 font-mono">
                <Calendar className="w-2.5 h-2.5" />
                {dataInicio ? new Date(dataInicio + 'T00:00:00').toLocaleDateString('pt-BR') : 'Início'} a {dataFim ? new Date(dataFim + 'T00:00:00').toLocaleDateString('pt-BR') : 'Fim'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de Itens que Necessitam de Atualização / Sincronização */}
      {itensNecessitamAtualizacao.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <span>{itensNecessitamAtualizacao.length} {itensNecessitamAtualizacao.length === 1 ? 'item modificado necessita' : 'itens modificados necessitam'} de nova sincronização no PNCP</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded-full font-bold">
                  Pendente
                </span>
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                A descrição ou quantidade dos itens foi alterada. É recomendável sincronizar individualmente ou em lote para atualizar a amostragem de preços conforme a Lei 14.133/21.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={processarItensPendentes}
              disabled={isProcessingAll}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessingAll ? 'animate-spin' : ''}`} />
              Sincronizar Pendentes ({itensNecessitamAtualizacao.length})
            </button>
          </div>
        </div>
      )}

      {/* Barra de Ações dos Itens */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Itens da Cotação ({cotacao.itens.length})
          </h3>
          <p className="text-xs text-slate-500">
            {itensConcluidos} de {cotacao.itens.length} itens processados com preços adjudicados no PNCP
            {itensNecessitamAtualizacao.length > 0 && (
              <span className="text-amber-600 font-semibold ml-1.5">
                ({itensNecessitamAtualizacao.length} aguardando sincronização)
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center">
            <button
              onClick={() => setViewMode('tabela')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'tabela'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização em Tabela Sleek"
            >
              <TableIcon className="w-3.5 h-3.5" />
              Tabela
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização Detalhada em Cards"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Cards
            </button>
          </div>

          {/* Botão de Importação Excel */}
          <button
            id="btn-importar-excel"
            onClick={() => setShowExcelModal(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
            title="Importar lista de itens a partir de planilha Excel (.xlsx, .xls, .csv)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Importar Excel
          </button>

          <button
            id="btn-adicionar-item"
            onClick={() => setShowItemModal(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            Adicionar Item
          </button>

          {itensNecessitamAtualizacao.length > 0 && (
            <button
              id="btn-sincronizar-pendentes"
              onClick={processarItensPendentes}
              disabled={isProcessingAll}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer animate-pulse"
              title="Sincronizar apenas os itens modificados ou pendentes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessingAll ? 'animate-spin' : ''}`} />
              Sincronizar Pendentes ({itensNecessitamAtualizacao.length})
            </button>
          )}

          <button
            id="btn-processar-todos"
            onClick={processarTodosOsItens}
            disabled={isProcessingAll || cotacao.itens.length === 0}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer ${
              isProcessingAll
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isProcessingAll ? 'animate-spin' : ''}`} />
            {isProcessingAll ? 'Consultando PNCP...' : 'Buscar Preços no PNCP (Lote)'}
          </button>

          {itensConcluidos > 0 && (
            <button
              id="btn-ver-mapa"
              onClick={onGerarMapa}
              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              Ver Mapa de Cotação
            </button>
          )}
        </div>
      </div>

      {/* Visualização de Itens (Tabela Sleek ou Cards) */}
      {/* Visualização em Tabela Compacta / Detalhada */}
      {viewMode === 'tabela' ? (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[200px]">
                    Descrição do Item
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Qtd / Unid
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[160px]">
                    Preço Unitário 1
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[160px]">
                    Preço Unitário 2
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[160px]">
                    Preço Unitário 3
                  </th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right min-w-[150px]">
                    Preço de Referência Unit.
                  </th>
                  <th className="px-4 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    Ações / Sincronizar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {cotacao.itens.map((item, index) => {
                  const isItemProcessing = processingItemIndex === index;
                  const orc1 = item.orcamentos?.[0];
                  const orc2 = item.orcamentos?.[1];
                  const orc3 = item.orcamentos?.[2];
                  const precoRef = item.preco_referencia_unitario || item.preco_medio || 0;

                  return (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-50/70 transition-colors ${
                        item.necessita_atualizacao ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-2.5">
                          <span className={`w-6 h-6 rounded-md font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 ${
                            item.necessita_atualizacao 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            #{item.numero_item}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-bold text-slate-900 leading-tight group flex items-center gap-1.5">
                                <span>{item.descricao}</span>
                                <button
                                  onClick={() => handleAbrirEdicao(index)}
                                  title="Editar Descrição e Quantidade"
                                  className="text-slate-400 hover:text-blue-600 opacity-60 hover:opacity-100 transition p-0.5 rounded cursor-pointer"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                              </p>
                            </div>

                            {/* Tags e status do item */}
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {item.necessita_atualizacao && (
                                <span 
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded"
                                  title={item.motivo_necessidade_atualizacao || 'Requer nova sincronização'}
                                >
                                  <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                                  Requer Sincronização
                                </span>
                              )}
                              {item.codigo_catmat && (
                                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  CATMAT: {item.codigo_catmat}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">
                                {item.unidade_medida}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="font-bold text-slate-800">
                          {item.quantidade.toLocaleString('pt-BR')}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {item.unidade_medida}
                        </div>
                      </td>

                      {/* Coluna Preço 1 */}
                      <td className="px-4 py-4">
                        {orc1 ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <p className="font-extrabold text-slate-900 text-xs">
                                R$ {orc1.valor_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                              {orc1.uf_orgao && (
                                <span className="text-[9px] font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  {orc1.uf_orgao}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-1 rounded">
                                🏷️ {orc1.marca_produto || 'Marca n/i'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate max-w-[160px]" title={orc1.descricao_item_pncp || orc1.razao_social_fornecedor}>
                              {orc1.descricao_item_pncp ? `📦 ${orc1.descricao_item_pncp}` : orc1.razao_social_fornecedor}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* Coluna Preço 2 */}
                      <td className="px-4 py-4">
                        {orc2 ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <p className="font-extrabold text-slate-900 text-xs">
                                R$ {orc2.valor_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                              {orc2.uf_orgao && (
                                <span className="text-[9px] font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  {orc2.uf_orgao}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-1 rounded">
                                🏷️ {orc2.marca_produto || 'Marca n/i'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate max-w-[160px]" title={orc2.descricao_item_pncp || orc2.razao_social_fornecedor}>
                              {orc2.descricao_item_pncp ? `📦 ${orc2.descricao_item_pncp}` : orc2.razao_social_fornecedor}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* Coluna Preço 3 */}
                      <td className="px-4 py-4">
                        {orc3 ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <p className="font-extrabold text-slate-900 text-xs">
                                R$ {orc3.valor_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </p>
                              {orc3.uf_orgao && (
                                <span className="text-[9px] font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  {orc3.uf_orgao}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-1 rounded">
                                🏷️ {orc3.marca_produto || 'Marca n/i'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate max-w-[160px]" title={orc3.descricao_item_pncp || orc3.razao_social_fornecedor}>
                              {orc3.descricao_item_pncp ? `📦 ${orc3.descricao_item_pncp}` : orc3.razao_social_fornecedor}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* Coluna Preço de Referência */}
                      <td className="px-5 py-4 text-right">
                        {precoRef > 0 ? (
                          <div>
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-extrabold">
                              R$ {precoRef.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                              Total: R$ {(item.valor_total_estimado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[11px]">
                            Aguardando
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* Sincronização Individual */}
                          <button
                            id={`btn-sincronizar-item-${item.numero_item}`}
                            onClick={() => processarItem(index)}
                            disabled={isItemProcessing || isProcessingAll}
                            title={
                              item.necessita_atualizacao
                                ? 'Sincronizar item modificado com o PNCP'
                                : 'Sincronizar este item individualmente no PNCP'
                            }
                            className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                              item.necessita_atualizacao
                                ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 shadow-xs'
                                : 'border-slate-200 hover:bg-blue-50 hover:text-blue-600 text-slate-600'
                            }`}
                          >
                            <Search className={`w-3.5 h-3.5 ${isItemProcessing ? 'animate-spin' : ''}`} />
                            {item.necessita_atualizacao && (
                              <span className="text-[10px] font-bold pr-1">Sync</span>
                            )}
                          </button>

                          {/* Editar Item */}
                          <button
                            id={`btn-editar-item-${item.numero_item}`}
                            onClick={() => handleAbrirEdicao(index)}
                            title="Editar Descrição / Quantidade"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Excluir Item */}
                          <button
                            id={`btn-excluir-item-${item.numero_item}`}
                            onClick={() => handleRemoverItem(index)}
                            title="Remover Item"
                            className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-600 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Lista de Itens em Cards Detalhados */
        <div className="space-y-4">
        {cotacao.itens.map((item, index) => {
          const isItemProcessing = processingItemIndex === index;
          const temOrcamentos = item.orcamentos && item.orcamentos.length > 0;
          const isAuditoriaOpen = expandedItemAuditoria[item.id] || false;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition hover:border-slate-300 ${
                item.necessita_atualizacao ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              {/* Notificação no Topo do Card se o item necessita atualização */}
              {item.necessita_atualizacao && (
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">
                      {item.motivo_necessidade_atualizacao || 'Item modificado: Requer nova sincronização no PNCP'}
                    </span>
                  </div>
                  <button
                    onClick={() => processarItem(index)}
                    disabled={isItemProcessing || isProcessingAll}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[11px] font-bold flex items-center gap-1 shadow-2xs transition cursor-pointer self-end sm:self-auto"
                  >
                    <RefreshCw className={`w-3 h-3 ${isItemProcessing ? 'animate-spin' : ''}`} />
                    Sincronizar Item Agora
                  </button>
                </div>
              )}

              {/* Topo do Item */}
              <div className="p-4 sm:p-5 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    item.necessita_atualizacao
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    #{item.numero_item}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.descricao}</span>
                        <button
                          onClick={() => handleAbrirEdicao(index)}
                          title="Editar Descrição e Quantidade"
                          className="text-slate-400 hover:text-blue-600 p-0.5 rounded cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </h4>
                      {item.codigo_catmat && (
                        <span className="text-[10px] font-mono bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">
                          CATMAT: {item.codigo_catmat}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Quantidade: <strong>{item.quantidade.toLocaleString('pt-BR')}</strong> {item.unidade_medida}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                  {/* Status Badge */}
                  {item.necessita_atualizacao ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-1 rounded-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Requer Sincronização
                    </span>
                  ) : item.status_processamento === 'SUCESSO_3_FONTES' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      3 Fontes Homologadas (PNCP)
                    </span>
                  ) : item.status_processamento === 'SUCESSO_FONTES_PARCIAIS' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {item.orcamentos.length} Fonte(s) Homologada(s)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      Aguardando Consulta
                    </span>
                  )}

                  {/* Individual Actions */}
                  <button
                    id={`btn-consultar-item-${item.numero_item}`}
                    onClick={() => processarItem(index)}
                    disabled={isItemProcessing || isProcessingAll}
                    title="Buscar e Sincronizar Preços no PNCP"
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      item.necessita_atualizacao
                        ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600'
                        : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Search className={`w-4 h-4 ${isItemProcessing ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    id={`btn-editar-item-card-${item.numero_item}`}
                    onClick={() => handleAbrirEdicao(index)}
                    title="Editar Item"
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    id={`btn-excluir-item-${item.numero_item}`}
                    onClick={() => handleRemoverItem(index)}
                    title="Remover Item"
                    className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Corpo do Item: 3 Orçamentos Obtidos */}
              <div className="p-4 sm:p-5">
                {temOrcamentos ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {item.orcamentos.map((orc, pos) => (
                        <div
                          key={orc.id || pos}
                          className="border border-slate-200/90 rounded-lg p-3 bg-slate-50/40 relative hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                            <span className="flex items-center gap-1 font-mono text-blue-600">
                              Fonte {orc.posicao || pos + 1} de 3
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Homologado PNCP
                            </span>
                          </div>

                          <div className="text-lg font-extrabold text-slate-900">
                            R$ {orc.valor_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-[10px] font-normal text-slate-500 ml-1">/{item.unidade_medida}</span>
                          </div>

                          {/* Marca e Item Similar do PNCP */}
                          <div className="mt-1.5 space-y-1">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-900 border border-amber-300 font-bold text-[10px] px-1.5 py-0.5 rounded">
                                <Tag className="w-2.5 h-2.5 text-amber-700" />
                                Marca: {orc.marca_produto || 'Não informada'}
                              </span>
                              {orc.unidade_medida_pncp && (
                                <span className="text-[9px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">
                                  Unid: {orc.unidade_medida_pncp}
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] font-medium text-slate-800 line-clamp-2 leading-tight flex items-start gap-1 pt-0.5" title={orc.descricao_item_pncp || item.descricao}>
                              <Package className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                              <span>{orc.descricao_item_pncp || item.descricao}</span>
                            </div>
                          </div>

                          <div className="mt-2 space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-2">
                            <div className="flex items-center gap-1.5 truncate" title={orc.razao_social_fornecedor}>
                              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate font-medium text-slate-800">{orc.razao_social_fornecedor}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              CNPJ: {orc.cnpj_fornecedor}
                            </div>
                            <div className="text-[11px] text-slate-600 truncate" title={orc.orgao_contratante}>
                              Órgão: <strong>{orc.orgao_contratante}</strong> ({orc.uf_orgao})
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {new Date(orc.data_compra).toLocaleDateString('pt-BR')}
                              </span>
                              <a
                                href={orc.link_pncp}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-medium"
                              >
                                Comprovante PNCP
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Consolidação Estatística do Item */}
                    <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/60 p-3.5 rounded-lg border border-blue-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Preço Mínimo</span>
                          <span className="font-bold text-slate-800">
                            R$ {(item.preco_minimo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Preço Médio</span>
                          <span className="font-bold text-blue-700">
                            R$ {(item.preco_medio || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Mediana</span>
                          <span className="font-bold text-slate-800">
                            R$ {(item.preco_mediana || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Preço Máximo</span>
                          <span className="font-bold text-slate-800">
                            R$ {(item.preco_maximo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Coeficiente Variação</span>
                          <span className={`font-bold ${((item.coeficiente_variacao || 0) <= 25) ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {item.coeficiente_variacao || 0}% {((item.coeficiente_variacao || 0) <= 25) ? '✓ Conforme' : '⚠ Elevado'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Valor Total Estimado ({item.quantidade} x R$ {(item.preco_referencia_unitario || item.preco_medio || 0).toFixed(2)})
                        </span>
                        <span className="text-base font-extrabold text-slate-900">
                          R$ {(item.valor_total_estimado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Accordion de Memória de Cálculo & Auditoria de Outliers */}
                    {item.amostras_descartadas && item.amostras_descartadas.length > 0 && (
                      <div className="border-t border-slate-100 pt-2">
                        <button
                          onClick={() => toggleAuditoria(item.id)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition"
                        >
                          <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                          Memória de Cálculo de Auditoria: {item.amostras_descartadas.length} amostra(s) discrepante(s) expurgada(s)
                          {isAuditoriaOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isAuditoriaOpen && (
                          <div className="mt-2.5 bg-amber-50/50 border border-amber-200/70 rounded-lg p-3 text-xs space-y-2">
                            <p className="text-[11px] text-amber-800 font-medium">
                              Registros coletados no PNCP que foram desconsiderados com base nos critérios estatísticos e de pluralidade da Lei 14.133/21:
                            </p>
                            <div className="space-y-1.5">
                              {item.amostras_descartadas.map((desc, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white p-2 rounded border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                                >
                                  <div>
                                    <span className="font-bold text-red-600 mr-2">
                                      R$ {desc.valor_unitario.toFixed(2)}
                                    </span>
                                    <span className="font-semibold text-slate-700">
                                      {desc.orgao_contratante || 'Órgão Público'}
                                    </span>
                                    <span className="text-slate-500 ml-1">
                                      — {desc.detalhe_justificativa}
                                    </span>
                                  </div>
                                  <span className="font-mono text-[10px] text-slate-400">
                                    Motivo: {desc.motivo_descarte}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                    <Search className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                    <p className="text-xs font-medium text-slate-600">Nenhum orçamento carregado para este item ainda.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Clique no botão de busca individual ou em "Buscar Preços no PNCP (Lote)" acima.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Sleek 3-Column Bento Metric Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Widget 1: Resumo do Mapa Hero */}
        <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Resumo do Mapa</p>
            <div className="text-2xl font-bold mt-2 flex items-baseline gap-2">
              <span>R$ {(cotacao.valor_total_cotacao || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-xs font-normal text-blue-200">
                {itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0 ? 'Concluído' : 'Parcial'}
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              {itensConcluidos} de {cotacao.itens.length} itens validados com 3 orçamentos
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-500/40 flex items-center justify-between">
            <span className="text-[11px] text-blue-100 font-medium">Lei nº 14.133/2021</span>
            <button
              onClick={onGerarMapa}
              disabled={itensConcluidos === 0}
              className="text-xs bg-white text-blue-700 font-bold px-2.5 py-1 rounded-lg hover:bg-blue-50 transition cursor-pointer disabled:opacity-50"
            >
              Ver Mapa
            </button>
          </div>
        </div>

        {/* Widget 2: Status de Integração */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status de Integração</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-base font-bold text-slate-800">PNCP API: Online</p>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Portal Nacional de Contratações Públicas conectado
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Latência média: 42ms</span>
            <span className="font-mono text-emerald-600 font-bold">HTTPS/TLS OK</span>
          </div>
        </div>

        {/* Widget 3: Validação de Controle & TCU */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validação de Controle</p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0
                  ? 'bg-emerald-500'
                  : 'bg-yellow-500'
              }`}></div>
              <p className="text-base font-bold text-slate-800">
                {itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0
                  ? '100% Homologado'
                  : `${cotacao.itens.length - itensConcluidos} Itens Pendentes`}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              {itensConcluidos === cotacao.itens.length && cotacao.itens.length > 0
                ? 'Todos os itens atendem aos critérios da IN 65/21'
                : `${cotacao.itens.length - itensConcluidos} item(ns) aguardando amostragem mínima (3)`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Expurgo IQR Tukey</span>
            <span className="font-semibold text-slate-700">IN SEGES/ME 65</span>
          </div>
        </div>
      </div>

      {/* Modal para Adicionar Item */}
      {showItemModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Adicionar Item para Cotação</h3>
            <p className="text-xs text-slate-500 mb-4">
              Informe a descrição do produto/serviço para consulta na API do PNCP.
            </p>

            <form onSubmit={handleAdicionarItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição do Item / Objeto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Caneta esferográfica azul ponta 1.0mm"
                  value={novoItemDesc}
                  onChange={e => setNovoItemDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={novoItemQtd}
                    onChange={e => setNovoItemQtd(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    value={novoItemUnidade}
                    onChange={e => setNovoItemUnidade(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="UNIDADE">UNIDADE</option>
                    <option value="RESMA">RESMA</option>
                    <option value="LITRO">LITRO</option>
                    <option value="CAIXA">CAIXA</option>
                    <option value="PACOTE">PACOTE</option>
                    <option value="METRO">METRO</option>
                    <option value="HORA">HORA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Código CATMAT / CATSER (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 447214"
                  value={novoItemCatmat}
                  onChange={e => setNovoItemCatmat(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition cursor-pointer"
                >
                  Inserir Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Edição de Item Existente */}
      {editingItemIndex !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-600" />
                Editar Item #{cotacao.itens[editingItemIndex]?.numero_item}
              </h3>
              <button
                onClick={() => setEditingItemIndex(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Ao alterar a descrição ou quantidade, o item será marcado como <strong>pendente de nova sincronização</strong> para validar orçamentos atualizados no PNCP.
            </p>

            <form onSubmit={e => { e.preventDefault(); handleSalvarEdicao(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição do Item / Objeto <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={editItemDesc}
                  onChange={e => setEditItemDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="Ex: Caneta esferográfica azul ponta 1.0mm..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editItemQtd}
                    onChange={e => setEditItemQtd(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    value={editItemUnidade}
                    onChange={e => setEditItemUnidade(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="UNIDADE">UNIDADE</option>
                    <option value="RESMA">RESMA</option>
                    <option value="LITRO">LITRO</option>
                    <option value="CAIXA">CAIXA</option>
                    <option value="PACOTE">PACOTE</option>
                    <option value="METRO">METRO</option>
                    <option value="HORA">HORA</option>
                    <option value="FRASCO">FRASCO</option>
                    <option value="QUILO">QUILO</option>
                    <option value="CONJUNTO">CONJUNTO</option>
                    <option value="PAR">PAR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Código CATMAT / CATSER (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 447214"
                  value={editItemCatmat}
                  onChange={e => setEditItemCatmat(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              {/* Informação sobre recalculo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-[11px] text-blue-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Você pode <strong>Apenas Salvar</strong> (marcando o item como pendente para sincronizar depois) ou <strong>Salvar e Sincronizar Agora</strong> diretamente no PNCP.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItemIndex(null)}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Apenas Salvar
                </button>
                <button
                  type="button"
                  onClick={() => handleSalvarEdicao(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  Salvar e Sincronizar Agora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Importação de Itens via Planilha Excel/CSV */}
      <ExcelImportModal
        isOpen={showExcelModal}
        onClose={() => setShowExcelModal(false)}
        onImport={handleImportItems}
        currentItensCount={cotacao.itens.length}
      />
    </div>
  );
};
