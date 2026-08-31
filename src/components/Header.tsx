import React from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  Database, 
  Code2, 
  Cpu, 
  Scale, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'sistema' | 'mapa' | 'schema' | 'algoritmo' | 'api' | 'legislacao';
  setActiveTab: (tab: 'sistema' | 'mapa' | 'schema' | 'algoritmo' | 'api' | 'legislacao') => void;
  hasGeneratedMap: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasGeneratedMap }) => {
  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top status bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 border-b border-slate-800/80 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            API PNCP Conectada (Portal Nacional de Contratações Públicas)
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">
            Normativa: <strong>Lei Federal nº 14.133/2021</strong> (Art. 23) & <strong>IN SEGES/ME 65/2021</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded text-[11px] font-mono">
            Motor Estatístico: IQR Tukey + CV%
          </span>
          <a
            href="https://pncp.gov.br"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px] transition-colors"
          >
            Portal PNCP Oficial
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-inner border border-blue-400/30">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                PNCP Cotações Governamentais
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded">
                Lei 14.133/21
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sistema de Pesquisa de Preços de Referência & Mapa de Cotação Homologado
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="tab-sistema"
            onClick={() => setActiveTab('sistema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sistema'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Cotação & Itens
          </button>

          <button
            id="tab-mapa"
            onClick={() => setActiveTab('mapa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap relative ${
              activeTab === 'mapa'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            Mapa de Cotação Oficial
            {hasGeneratedMap && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1"></span>
            )}
          </button>

          <button
            id="tab-schema"
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'schema'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            Schema Relacional (SQL/JSON)
          </button>

          <button
            id="tab-algoritmo"
            onClick={() => setActiveTab('algoritmo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'algoritmo'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Algoritmo & Outliers
          </button>

          <button
            id="tab-api"
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'api'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            API & Payloads
          </button>

          <button
            id="tab-legislacao"
            onClick={() => setActiveTab('legislacao')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'legislacao'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Guia Legal (TCU)
          </button>
        </nav>
      </div>
    </header>
  );
};
