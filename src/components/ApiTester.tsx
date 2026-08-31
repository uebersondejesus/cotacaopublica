import React, { useState } from 'react';
import { FRONTEND_REQUEST_PAYLOAD_EXAMPLE, BACKEND_RESPONSE_PAYLOAD_EXAMPLE } from '../data/schemaDocs.ts';
import { Code2, Send, Check, Copy, RefreshCw, Sparkles, Terminal } from 'lucide-react';

export const ApiTester: React.FC = () => {
  const [requestJson, setRequestJson] = useState<string>(
    JSON.stringify(FRONTEND_REQUEST_PAYLOAD_EXAMPLE, null, 2)
  );
  const [responseJson, setResponseJson] = useState<string>(
    JSON.stringify(BACKEND_RESPONSE_PAYLOAD_EXAMPLE, null, 2)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExecutarChamada = async () => {
    setIsLoading(true);
    try {
      const parsedBody = JSON.parse(requestJson);
      const res = await fetch('/api/cotacoes/processar-lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedBody),
      });

      if (!res.ok) {
        throw new Error(`Erro na chamada API: Status ${res.status}`);
      }

      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseJson(JSON.stringify({ erro: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              API REST & Payloads (Front-end ⇄ Back-end)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Exemplos completos dos contratos de dados (Request / Response) e terminal de execução ao vivo.
          </p>
        </div>

        <button
          onClick={handleExecutarChamada}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow transition"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isLoading ? 'Processando no PNCP...' : 'Testar Requisição POST /api/cotacoes/processar-lote'}
        </button>
      </div>

      {/* Grid: Request (Left) vs Response (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Payload */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                POST /api/cotacoes/processar-lote
              </span>
              <span className="text-xs text-slate-300 font-bold">Request Payload (Front-end)</span>
            </div>
            <button
              onClick={() => handleCopy(requestJson, 'req')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition"
            >
              {copied === 'req' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              Copiar
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <label className="text-[11px] text-slate-400 font-medium mb-1.5">
              JSON Editável de Entrada:
            </label>
            <textarea
              rows={18}
              value={requestJson}
              onChange={e => setRequestJson(e.target.value)}
              className="w-full flex-1 bg-slate-950 text-blue-300 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Response Payload */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                200 OK
              </span>
              <span className="text-xs text-slate-300 font-bold">Response Payload (Mapa de Cotação)</span>
            </div>
            <button
              onClick={() => handleCopy(responseJson, 'res')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition"
            >
              {copied === 'res' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              Copiar
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <label className="text-[11px] text-slate-400 font-medium mb-1.5">
              JSON de Saída Homologado:
            </label>
            <textarea
              readOnly
              rows={18}
              value={responseJson}
              className="w-full flex-1 bg-slate-950 text-emerald-300 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
