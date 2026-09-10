import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Bell, 
  Camera, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Menu, 
  User, 
  Clock, 
  Send 
} from 'lucide-react';

export default function App() {
  // Estados da Aplicação
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true);
  const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false);
  const [distanciaCaminhao, setDistanciaCaminhao] = useState(80); // Porcentagem do percurso
  const [tempoEstimado, setTempoEstimado] = useState(12); // Minutos
  const [tipoDenuncia, setTipoDenuncia] = useState('acumulo');
  const [denunciaEnviada, setDenunciaEnviada] = useState(false);

  // Simulação de deslocamento em tempo real do veículo de coleta
  useEffect(() => {
    const timer = setInterval(() => {
      setDistanciaCaminhao((prev) => {
        if (prev >= 100) return 30; // Reseta a rota para simular nova passagem
        return prev + 5;
      });

      setTempoEstimado((prev) => (prev > 2 ? prev - 1 : 15));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleEnviarDenuncia = (e) => {
    e.preventDefault();
    setDenunciaEnviada(true);
    setTimeout(() => {
      setDenunciaEnviada(false);
      setModalDenunciaAberto(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* ─── NAVBAR / CABEÇALHO ─── */}
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Menu className="h-6 w-6 cursor-pointer hover:opacity-80" />
            <div>
              <h1 className="font-bold text-lg leading-tight">SMOCR</h1>
              <p className="text-xs text-emerald-100 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Rua Comendador José Gomes - Parelhas/RN
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-800 px-3 py-1 rounded-full text-xs">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Lucas Macedo</span>
          </div>
        </div>
      </header>

      {/* ─── CONTEÚDO PRINCIPAL (PAINEL DO CIDADÃO) ─── */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* CARD PRINCIPAL: STATUS DA COLETA EM TEMPO REAL */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Status da Coleta Hoje
              </h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium">
              Em Deslocamento
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-600 text-white rounded-xl">
                <Truck className="h-8 w-8 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Caminhão de Lixo Próximo</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                  <Clock className="h-4 w-4 text-emerald-600" /> Previsão no seu trecho: 
                  <span className="font-bold text-emerald-700 ml-1">{tempoEstimado} minutos</span>
                </p>
              </div>
            </div>
          </div>

          {/* BARRA DE PROGRESSO DO VEÍCULO */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Início da Rota (Centro)</span>
              <span>Sua Lixeira ({distanciaCaminhao}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${distanciaCaminhao}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DUPLA: CONFIGURAÇÕES E AÇÕES RÁPIDAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PAINEL DE ALERTAS */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-600" /> Configuração de Alertas
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <span className="text-sm font-medium text-gray-700">Notificação Push (Sonora)</span>
                <input 
                  type="checkbox" 
                  checked={notificacaoAtiva} 
                  onChange={() => setNotificacaoAtiva(!notificacaoAtiva)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                />
              </label>
              <p className="text-xs text-gray-500 px-1">
                Você receberá um aviso sonoro 15 minutos antes de o caminhão entrar na Rua Comendador José Gomes.
              </p>
            </div>
          </section>

          {/* AÇÕES RÁPIDAS */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setModalDenunciaAberto(true)}
                className="flex flex-col items-center justify-center p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl hover:bg-amber-100 transition"
              >
                <Camera className="h-6 w-6 text-amber-600 mb-1" />
                <span className="text-xs font-bold">Nova Denúncia</span>
              </button>

              <button className="flex flex-col items-center justify-center p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl hover:bg-emerald-100 transition">
                <Calendar className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-xs font-bold">Agenda Verde</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* ─── MODAL DE REGISTRO DE DENÚNCIA (OUVIDORIA VISUAL) ─── */}
      {modalDenunciaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" /> Reportar Problema de Lixo
              </h3>
              <button 
                onClick={() => setModalDenunciaAberto(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {denunciaEnviada ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-gray-800">Relatório Enviado com Sucesso!</h4>
                <p className="text-xs text-gray-500">A equipe de zeladoria de Parelhas/RN foi notificada.</p>
              </div>
            ) : (
              <form onSubmit={handleEnviarDenuncia} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipo de Ocorrência</label>
                  <select 
                    value={tipoDenuncia} 
                    onChange={(e) => setTipoDenuncia(e.target.value)}
                    className="w-full text-sm border-gray-300 rounded-xl p-2.5 bg-gray-50 border focus:ring-emerald-500"
                  >
                    <option value="acumulo">Acúmulo Crônico de Lixo</option>
                    <option value="entulho">Descarte Irregular de Entulho</option>
                    <option value="animais">Sacos Rasgados por Animais</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-600 font-medium">Clique para anexar foto do local</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-500 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>GPS: Rua Comendador José Gomes, Parelhas - RN</span>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalDenunciaAberto(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 flex items-center gap-1"
                  >
                    <Send className="h-3.5 w-3.5" /> Enviar Denúncia
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
