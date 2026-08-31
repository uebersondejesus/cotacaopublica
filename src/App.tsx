import React, { useState } from 'react';
import { Cotacao } from './types.ts';
import { CotacaoManager } from './components/CotacaoManager.tsx';
import { MapaCotacaoView } from './components/MapaCotacaoView.tsx';
import { SchemaViewer } from './components/SchemaViewer.tsx';
import { OutlierPlayground } from './components/OutlierPlayground.tsx';
import { ApiTester } from './components/ApiTester.tsx';
import { GuiaLegislacao } from './components/GuiaLegislacao.tsx';
import {
  FileSpreadsheet,
  Scale,
  Database,
  Cpu,
  Code2,
  CheckCircle2,
  Menu,
  X,
  RefreshCw,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'sistema' | 'mapa' | 'schema' | 'algoritmo' | 'api' | 'legislacao'
  >('sistema');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado Inicial da Cotação com Itens para Demonstração Imediata
  const [cotacao, setCotacao] = useState<Cotacao>({
    id: `COT-${Date.now()}`,
    numero_processo: 'PROC-LIC-2024/0488-SEDUC',
    titulo: 'Aquisição de Material de Escritório e Suprimentos Administrativos',
    objeto: 'Registro de Preços para fornecimento parcelado de material de expediente e consumo para as unidades da Administração Direta.',
    data_criacao: new Date().toISOString(),
    status: 'RASCUNHO',
    responsavel_nome: 'Carlos Eduardo da Silva',
    responsavel_cargo: 'Agente de Contratação / Pregoeiro Oficial',
    departamento: 'Diretoria de Suprimentos e Compras Governamentais',
    municipio_uf: 'Brasília/DF',
    metodologia_padrao: 'MEDIA',
    valor_total_cotacao: 0,
    itens: [
      {
        id: 'item-demo-1',
        cotacao_id: 'COT-DEMO',
        numero_item: 1,
        descricao: 'Papel sulfite A4, 75g/m², alcalino, 210x297mm, resma com 500 folhas',
        quantidade: 500,
        unidade_medida: 'RESMA',
        codigo_catmat: '447214',
        status_processamento: 'PENDENTE',
        orcamentos: [],
      },
      {
        id: 'item-demo-2',
        cotacao_id: 'COT-DEMO',
        numero_item: 2,
        descricao: 'Caneta esferográfica azul, corpo plástico transparente sextavado, ponta média 1.0mm',
        quantidade: 2000,
        unidade_medida: 'UNIDADE',
        codigo_catmat: '312890',
        status_processamento: 'PENDENTE',
        orcamentos: [],
      }
    ]
  });

  const hasGeneratedMap = cotacao.itens.some(i => i.orcamentos && i.orcamentos.length > 0);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'sistema': return 'Gestão de Cotações & Itens';
      case 'mapa': return 'Mapa de Cotação Homologado (A4)';
      case 'schema': return 'Modelagem de Dados (SQL DDL & JSON)';
      case 'algoritmo': return 'Motor Estatístico de Outliers';
      case 'api': return 'API REST & Contratos de Dados';
      case 'legislacao': return 'Marco Legal (Lei 14.133/21 & TCU)';
      default: return 'Painel';
    }
  };

  const navItems = [
    {
      id: 'sistema' as const,
      label: 'Gestão de Cotações',
      icon: FileSpreadsheet,
      badge: `${cotacao.itens.length} itens`
    },
    {
      id: 'mapa' as const,
      label: 'Mapa Oficial (A4)',
      icon: Scale,
      hasDot: hasGeneratedMap
    },
    {
      id: 'schema' as const,
      label: 'Modelagem SQL & DER',
      icon: Database
    },
    {
      id: 'algoritmo' as const,
      label: 'Motor de Outliers',
      icon: Cpu
    },
    {
      id: 'api' as const,
      label: 'API REST & Payloads',
      icon: Code2
    },
    {
      id: 'legislacao' as const,
      label: 'Guia Legal & TCU',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="flex h-screen w-full font-sans text-slate-900 bg-slate-50 overflow-hidden">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sleek Dark Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-200 ease-in-out print:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              GovQuote <span className="text-blue-400">PNCP</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Conformidade Lei 14.133/21</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Módulos do Sistema
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  ) : (
                    <Icon className="w-4 h-4 text-slate-400" />
                  )}
                  <span className={isActive ? 'font-semibold text-white' : 'opacity-80'}>
                    {item.label}
                  </span>
                </div>
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {item.badge && (
                  <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User / Public Agent Profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs uppercase">
              {cotacao.responsavel_nome.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{cotacao.responsavel_nome}</p>
              <p className="text-[10px] text-slate-400 truncate">{cotacao.responsavel_cargo}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        {/* Sleek Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 print:hidden z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hidden sm:inline">Painel</span>
              <span className="opacity-30 hidden sm:inline">/</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {cotacao.numero_processo}
              </span>
              <span className="opacity-30 hidden md:inline">/</span>
              <span className="text-slate-600 hidden md:inline text-xs bg-slate-100 px-2 py-0.5 rounded">
                {getBreadcrumbTitle()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PNCP API Online
            </div>

            <button
              onClick={() => setActiveTab('mapa')}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Mapa Oficial</span> (A4)
            </button>

            <button
              onClick={() => setActiveTab('sistema')}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium bg-blue-600 text-white rounded-lg shadow-xs shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sincronizar PNCP</span>
            </button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'sistema' && (
            <CotacaoManager
              cotacao={cotacao}
              setCotacao={setCotacao}
              onGerarMapa={() => setActiveTab('mapa')}
            />
          )}

          {activeTab === 'mapa' && (
            <MapaCotacaoView
              cotacao={cotacao}
              onVoltarParaItens={() => setActiveTab('sistema')}
            />
          )}

          {activeTab === 'schema' && <SchemaViewer />}

          {activeTab === 'algoritmo' && <OutlierPlayground />}

          {activeTab === 'api' && <ApiTester />}

          {activeTab === 'legislacao' && <GuiaLegislacao />}
        </main>
      </div>
    </div>
  );
}
