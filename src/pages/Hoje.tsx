import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Sparkles, ArrowRight, Play, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Hoje() {
  const { currentUser, couples, activities } = useAppContext();
  const navigate = useNavigate();

  const couple = couples.find(c => c.id === currentUser?.id);
  if (!couple) return null;

  // Encontrar a atividade atual (primeira não concluída)
  const currentActivityIndex = activities.findIndex(a => !couple.completedActivities.includes(a.id));
  const currentActivity = currentActivityIndex !== -1 ? activities[currentActivityIndex] : null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24">
      {/* Cabeçalho */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hoje</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">Sua caminhada diária</p>
        </div>
        <div 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
        >
          <span className="font-bold text-slate-600">{couple.husbandName[0]}{couple.wifeName[0]}</span>
        </div>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full space-y-6">
        
        {/* Banner de Boas Vindas */}
        <div className="bg-gradient-to-br from-rose-500 to-orange-400 rounded-3xl p-6 shadow-lg shadow-rose-200 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-1">Olá, {couple.husbandName} & {couple.wifeName}!</h2>
            <p className="text-white/90 text-sm font-medium mb-4">Prontos para mais um passo na jornada?</p>
            
            <div className="inline-flex items-center bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm text-sm font-bold">
              <Sparkles size={16} className="mr-2" />
              {couple.xp} Pontos acumulados
            </div>
          </div>
        </div>

        {/* Missão da Semana */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Missão da Semana</h3>
          
          {currentActivity ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center text-rose-500 font-bold text-xs tracking-widest uppercase mb-2">
                Aula {currentActivity.unit}
              </div>
              <h4 className="font-extrabold text-xl text-slate-800 mb-2">{currentActivity.title}</h4>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed font-medium">
                {currentActivity.description}
              </p>
              
              <button 
                onClick={() => navigate(`/activity/${currentActivity.id}`)}
                className="w-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3.5 rounded-2xl transition-colors"
              >
                <Play size={18} className="mr-2 fill-rose-600" />
                Continuar Prática
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Jornada Concluída</h4>
              <p className="text-slate-500 text-sm">Vocês completaram todas as aulas disponíveis no momento!</p>
            </div>
          )}
        </div>

        {/* Devocional (Mockup Visual) */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Devocional</h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mr-4 shrink-0">
              <FileText size={24} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Leitura de Quarta-feira</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">5 min de reflexão pessoal</p>
            </div>
            <ArrowRight size={20} className="text-slate-300" />
          </div>
        </div>

      </div>
    </div>
  );
}
