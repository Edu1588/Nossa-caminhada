import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { LifeBuoy, MessageCircle, Send, ShieldCheck, Clock, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

type SupportState = 'idle' | 'form' | 'sent';

export default function Apoio() {
  const { currentUser } = useAppContext();
  const [supportState, setSupportState] = useState<SupportState>('idle');
  const [formData, setFormData] = useState({
    recipient: 'mentor',
    channel: 'whatsapp',
    safeTime: ''
  });
  
  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um app real, aqui enviaríamos os dados para o backend silenciosamente
    setSupportState('sent');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Apoio</h1>
        <p className="text-slate-500 font-medium text-sm mt-0.5">Contato reservado com mentores</p>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full">
        
        {supportState === 'idle' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 mb-6 shadow-lg shadow-indigo-200 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <LifeBuoy size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Precisa de ajuda?</h2>
              <p className="text-white/80 text-sm font-medium">
                Sua liderança e seu casal de apoio estão disponíveis para conversar, orar e ajudar a concretizar os passos da mentoria.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <MessageCircle size={20} className="text-indigo-500 mr-2" />
                Solicitar Contato
              </h3>
              
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-start">
                <ShieldCheck size={20} className="text-slate-400 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Este pedido é <strong className="text-slate-700">100% privado</strong>. Não pediremos detalhes do ocorrido por aqui, e seu cônjuge não será notificado no aplicativo.
                </p>
              </div>

              <button
                onClick={() => setSupportState('form')}
                className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-4 rounded-2xl flex items-center justify-center transition-colors"
              >
                Configurar pedido de apoio
                <ArrowLeft size={18} className="ml-2 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {supportState === 'form' && (
          <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <button 
              type="button" 
              onClick={() => setSupportState('idle')}
              className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
            </button>

            <h3 className="font-black text-xl text-slate-800 mb-2">Detalhes do Contato</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Apenas nos diga com quem prefere falar e qual a melhor forma de te encontrar.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Com quem deseja falar?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, recipient: 'mentor'})}
                    className={cn(
                      "py-3 px-4 rounded-2xl font-bold text-sm transition-all border-2 text-left flex flex-col",
                      formData.recipient === 'mentor' ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    Casal Mentor
                    <span className="text-xs font-medium opacity-70 font-normal mt-0.5">Acompanhamento</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, recipient: 'lideranca'})}
                    className={cn(
                      "py-3 px-4 rounded-2xl font-bold text-sm transition-all border-2 text-left flex flex-col",
                      formData.recipient === 'lideranca' ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    Liderança Pastoral
                    <span className="text-xs font-medium opacity-70 font-normal mt-0.5">Orientação aguda</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 flex items-center">
                  <Phone size={14} className="mr-1.5" /> Canal Seguro
                </label>
                <select
                  value={formData.channel}
                  onChange={(e) => setFormData({...formData, channel: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none"
                >
                  <option value="whatsapp">Mensagem no WhatsApp</option>
                  <option value="ligacao">Ligação Telefônica</option>
                  <option value="presencial">Gostaria de um encontro presencial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1 flex items-center">
                  <Clock size={14} className="mr-1.5" /> Horário Seguro
                </label>
                <input
                  type="text"
                  required
                  value={formData.safeTime}
                  onChange={(e) => setFormData({...formData, safeTime: e.target.value})}
                  placeholder="Ex: Amanhã de manhã, ou hoje após as 18h"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-indigo-200"
            >
              <Send size={18} className="mr-2" />
              Enviar Pedido de Apoio
            </button>
          </form>
        )}

        {supportState === 'sent' && (
          <div className="animate-in zoom-in duration-300 bg-emerald-50 border border-emerald-100 rounded-3xl p-8 shadow-sm text-center my-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-emerald-800 mb-3">Pedido Recebido</h3>
            <p className="text-emerald-600 font-medium mb-8 leading-relaxed">
              Fique em paz. O seu pedido foi encaminhado com segurança. Alguém da equipe entrará em contato com você pelo canal e horário combinados.
            </p>

            <button
              onClick={() => setSupportState('idle')}
              className="w-full bg-white text-emerald-700 hover:bg-emerald-100 font-bold py-3.5 rounded-2xl transition-colors border border-emerald-200"
            >
              Voltar para Apoio
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
