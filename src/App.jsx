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
  Send,
  Trash2,
  Edit3
} from 'lucide-react';

export default function App() {
  // Estados de Personalização (Padrões: João e Centro)
  const [nomeUsuario, setNomeUsuario] = useState('João');
  const [editandoNome, setEditandoNome] = useState(false);
  const [tempNome, setTempNome] = useState(nomeUsuario);

  const [nomeRua, setNomeRua] = useState('Centro');
  const [editandoRua, setEditandoRua] = useState(false);
  const [tempRua, setTempRua] = useState(nomeRua);

  // Estado do Nível da Lixeira (Porcentagem escolhida pelo usuário)
  const [nivelLixeira, setNivelLixeira] = useState(65);

  // Estados dos Modais e Formulários
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true);
  const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false);
  const [modalAgendaAberto, setModalAgendaAberto] = useState(false);
  const [tipoDenuncia, setTipoDenuncia] = useState('acumulo');
  const [denunciaEnviada, setDenunciaEnviada] = useState(false);

  // Estado da Contagem Regressiva para a Próxima Coleta
  const [infoProximaColeta, setInfoProximaColeta] = useState({
    textoExtenso: '',
    tempoRestanteTexto: ''
  });

  // Cálculo preciso da próxima Terça (2) ou Sexta (5) às 07:00
  const calcularProximaColeta = () => {
    const agora = new Date();
    const diaSemana = agora.getDay(); // 0: Dom, 1: Seg, 2: Ter, 3: Qua, 4: Qui, 5: Sex, 6: Sáb
    const hora = agora.getHours();

    let proximaData = new Date(agora);
    let nomeDiaTarget = '';

    // Se for Terça-feira antes das 07:00 da manhã
    if (diaSemana === 2 && hora < 7) {
      proximaData.setHours(7, 0, 0, 0);
      nomeDiaTarget = 'Hoje (Terça-feira)';
    } 
    // Se for Sexta-feira antes das 07:00 da manhã
    else if (diaSemana === 5 && hora < 7) {
      proximaData.setHours(7, 0, 0, 0);
      nomeDiaTarget = 'Hoje (Sexta-feira)';
    } 
    // Caso contrário, calcula o próximo dia (Terça ou Sexta)
    else {
      let diasAteProximo = 0;

      if (diaSemana === 2) { // Terça após 07h -> Próxima é Sexta (3 dias)
        diasAteProximo = 3;
        nomeDiaTarget = 'Sexta-feira';
      } else if (diaSemana === 5) { // Sexta após 07h -> Próxima é Terça (4 dias)
        diasAteProximo = 4;
        nomeDiaTarget = 'Terça-feira';
      } else if (diaSemana === 0) { // Domingo -> Terça (2 dias)
        diasAteProximo = 2;
        nomeDiaTarget = 'Terça-feira';
      } else if (diaSemana === 1) { // Segunda -> Terça (1 dia)
        diasAteProximo = 1;
        nomeDiaTarget = 'Terça-feira';
      } else if (diaSemana === 3) { // Quarta -> Sexta (2 dias)
        diasAteProximo = 2;
        nomeDiaTarget = 'Sexta-feira';
      } else if (diaSemana === 4) { // Quinta -> Sexta (1 dia)
        diasAteProximo = 1;
        nomeDiaTarget = 'Sexta-feira';
      } else if (diaSemana === 6) { // Sábado -> Terça (3 dias)
        diasAteProximo = 3;
        nomeDiaTarget = 'Terça-feira';
      }

      proximaData.setDate(agora.getDate() + diasAteProximo);
      proximaData.setHours(7, 0, 0, 0);
    }

    // Diferença em milissegundos convertida para Dias, Horas e Minutos
    const diffMs = proximaData.getTime() - agora.getTime();
    const diffMinutosTotal = Math.floor(diffMs / (1000 * 60));
    const diffHorasTotal = Math.floor(diffMinutosTotal / 60);
    const dias = Math.floor(diffHorasTotal / 24);
    const horas = diffHorasTotal % 24;
    const minutos = diffMinutosTotal % 60;

    let textoTempo = '';
    if (dias > 0) {
      textoTempo = `Faltam ${dias}d, ${horas}h e ${minutos}min`;
    } else {
      textoTempo = `Faltam ${horas}h e ${minutos}min`;
    }

    const dataFormatada = proximaData.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    return {
      textoExtenso: `${nomeDiaTarget} (${dataFormatada}) às 07:00`,
      tempoRestanteTexto: textoTempo
    };
  };

  // Atualizar a contagem a cada minuto
  useEffect(() => {
    setInfoProximaColeta(calcularProximaColeta());
    const interval = setInterval(() => {
      setInfoProximaColeta(calcularProximaColeta());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSalvarNome = (e) => {
    e.preventDefault();
    if (tempNome.trim() !== '') setNomeUsuario(tempNome);
    setEditandoNome(false);
  };

  const handleSalvarRua = (e) => {
    e.preventDefault();
    if (tempRua.trim() !== '') setNomeRua(tempRua);
    setEditandoRua(false);
  };

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
              
              {/* Nome da Rua Editável */}
              {editandoRua ? (
                <form onSubmit={handleSalvarRua} className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-emerald-200" />
                  <input 
                    type="text" 
                    value={tempRua} 
                    onChange={(e) => setTempRua(e.target.value)} 
                    className="px-1 py-0.2 text-xs text-gray-900 rounded border-none focus:outline-none w-32"
                    autoFocus
                  />
                  <button type="submit" className="text-xs text-emerald-200 font-bold hover:text-white">✓</button>
                </form>
              ) : (
                <p 
                  onClick={() => { setTempRua(nomeRua); setEditandoRua(true); }}
                  className="text-xs text-emerald-100 flex items-center gap-1 cursor-pointer hover:underline"
                  title="Clique para editar a rua"
                >
                  <MapPin className="h-3 w-3" /> Rua {nomeRua} - Parelhas/RN
                  <Edit3 className="h-2.5 w-2.5 text-emerald-300 ml-0.5" />
                </p>
              )}
            </div>
          </div>

          {/* Nome do Usuário Editável */}
          <div className="flex items-center space-x-2 bg-emerald-800 px-3 py-1.5 rounded-full text-xs">
            <User className="h-4 w-4 text-emerald-200" />
            {editandoNome ? (
              <form onSubmit={handleSalvarNome} className="flex items-center gap-1">
                <input 
                  type="text" 
                  value={tempNome} 
                  onChange={(e) => setTempNome(e.target.value)} 
                  className="px-1.5 py-0.5 text-xs text-gray-900 rounded border-none focus:outline-none w-24"
                  autoFocus
                />
                <button type="submit" className="text-emerald-200 font-bold hover:text-white">✓</button>
              </form>
            ) : (
              <div 
                onClick={() => { setTempNome(nomeUsuario); setEditandoNome(true); }}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                title="Clique para alterar seu nome"
              >
                <span className="font-medium">{nomeUsuario}</span>
                <Edit3 className="h-3 w-3 text-emerald-300" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── CONTEÚDO PRINCIPAL ─── */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* CARD PRINCIPAL: STATUS DA COLETA */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Status da Coleta
              </h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-semibold">
              Terças e Sextas (07:00)
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-600 text-white rounded-xl">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Rota de Coleta - Rua {nomeRua}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                  <Clock className="h-4 w-4 text-emerald-600" /> Previsão de atendimento: 
                  <span className="font-bold text-emerald-700 ml-1">Terça e Sexta às 07:00</span>
                </p>
              </div>
            </div>
          </div>

          {/* BARRA FIXA BASEADA NA PORCENTAGEM DO LIXO */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Início da Rota ({nomeRua})</span>
              <span className="font-bold text-emerald-700">Sua Lixeira ({nivelLixeira}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${nivelLixeira}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* CARD DE CONTAGEM REGRESSIVA REAL */}
        <section className="bg-emerald-900 text-white p-5 rounded-2xl shadow-sm border border-emerald-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-800 rounded-xl">
                <Calendar className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">Próxima Coleta Programada</h4>
                <p className="text-base font-bold text-white mt-0.5">{infoProximaColeta.textoExtenso}</p>
              </div>
            </div>
            <div>
              <span className="text-xs bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-lg font-bold block sm:inline-block">
                {infoProximaColeta.tempoRestanteTexto}
              </span>
            </div>
          </div>
        </section>

        {/* CONTROLADOR DO VOLUME DA LIXEIRA DA CASA */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-emerald-600" /> Nível da Lixeira da Sua Casa
            </h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
              nivelLixeira > 80 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {nivelLixeira}% Cheia
            </span>
          </div>
          
          <p className="text-xs text-gray-500 mb-4">
            Ajuste o volume estimado para que a barra de progresso do trecho reflita a demanda da sua lixeira.
          </p>

          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={nivelLixeira} 
            onChange={(e) => setNivelLixeira(Number(e.target.value))}
            className="w-full accent-emerald-600 h-2.5 bg-gray-200 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
            <span>Vazia (0%)</span>
            <span>Metade (50%)</span>
            <span>Cheia (100%)</span>
          </div>
        </section>

        {/* SEÇÃO DUPLA: CONFIGURAÇÕES E AÇÕES RÁPIDAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
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
                Aviso sonoro disparado 15 minutos antes da coleta na **Rua {nomeRua}**.
              </p>
            </div>
          </section>

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

              <button 
                onClick={() => setModalAgendaAberto(true)}
                className="flex flex-col items-center justify-center p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl hover:bg-emerald-100 transition"
              >
                <Calendar className="h-6 w-6 text-emerald-600 mb-1" />
                <span className="text-xs font-bold">Agenda Verde</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* MODAL AGENDA VERDE */}
      {modalAgendaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" /> Cronograma de Coleta (Parelhas/RN)
              </h3>
              <button onClick={() => setModalAgendaAberto(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900 block">Terça-feira</span>
                  <span className="text-xs text-emerald-700">Coleta de Resíduos Comuns e Orgânicos</span>
                </div>
                <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-1 rounded">07:00</span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900 block">Sexta-feira</span>
                  <span className="text-xs text-emerald-700">Coleta Seletiva e Recicláveis</span>
                </div>
                <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-1 rounded">07:00</span>
              </div>
            </div>

            <button 
              onClick={() => setModalAgendaAberto(false)}
              className="w-full py-2 bg-gray-100 font-bold text-xs text-gray-700 rounded-xl hover:bg-gray-200"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE DENÚNCIA */}
      {modalDenunciaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" /> Reportar Problema de Lixo
              </h3>
              <button onClick={() => setModalDenunciaAberto(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            {denunciaEnviada ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-gray-800">Relatório Enviado com Sucesso!</h4>
                <p className="text-xs text-gray-500">A equipe de zeladoria foi notificada por {nomeUsuario} (Rua {nomeRua}).</p>
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
                  <span>GPS: Rua {nomeRua}, Parelhas - RN</span>
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
