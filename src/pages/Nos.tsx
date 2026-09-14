import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Users, FileText, CheckCircle2, Target, Lock } from 'lucide-react';

export default function Nos() {
  const { currentUser, couples } = useAppContext();
  
  const couple = couples.find(c => c.id === currentUser?.id);
  if (!couple) return null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Nós</h1>
        <p className="text-slate-500 font-medium text-sm mt-0.5">Acordos, identidades e dinâmicas do casal</p>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full space-y-8">
        
        {/* Pacto */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
            <FileText size={16} className="mr-2" />
            Pacto de Compromisso
          </h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">As 12 Resoluções</h4>
            <p className="text-slate-500 font-medium text-sm mb-5 leading-relaxed">
              O compromisso de transformação, dignidade, escuta e perdão que vocês aceitaram no início da jornada.
            </p>
            <div className="flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-3 rounded-2xl">
              <CheckCircle2 size={20} className="mr-3" />
              Assinado por {couple.husbandName} e {couple.wifeName}
            </div>
          </div>
        </section>

        {/* Dinâmicas de Transformação */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
            <Target size={16} className="mr-2" />
            Dinâmicas de Transformação
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-start">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                <span className="font-black text-rose-500">D1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">O Casal que Somos</h4>
                <p className="text-xs text-slate-500 font-medium mt-1 mb-3">Identidade, história e forças do casamento.</p>
                <button className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center w-max">
                  <Lock size={12} className="mr-1" /> Desbloqueia na Aula 4
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-start opacity-70">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                <span className="font-black text-slate-400">D2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">Sonhos do Cônjuge</h4>
                <button className="text-xs font-bold text-slate-400 mt-2 flex items-center">
                  <Lock size={12} className="mr-1" /> Desbloqueia na Aula 5
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
