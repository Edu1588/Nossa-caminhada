import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { X, Check, BookOpen, PenTool } from 'lucide-react';

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, currentUser, completeActivity } = useAppContext();
  
  const [stage, setStage] = useState<'intro' | 'action' | 'success'>('intro');
  const [reflection, setReflection] = useState('');

  const activity = activities.find(a => a.id === id);

  if (!activity || !currentUser) return null;

  const handleComplete = () => {
    completeActivity(currentUser.id, activity.id);
    setStage('success');
  };

  const handleFinish = () => {
    navigate('/hoje');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
      <div className="px-6 py-6 flex items-center justify-between bg-white border-b border-slate-100">
        <button onClick={() => navigate('/hoje')} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={28} />
        </button>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Aula {activity.unit}
        </div>
        <div className="w-7"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex flex-col px-6 py-8 overflow-y-auto pb-32">
        {stage === 'intro' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-lg mx-auto w-full">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen size={32} className="text-rose-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">{activity.title}</h1>
            
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Missão da Semana</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        )}

        {stage === 'action' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-lg mx-auto w-full flex flex-col h-full">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <PenTool size={32} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Seu Registro</h2>
            <p className="text-slate-500 font-medium mb-6">
              O que você aprendeu ou tentou praticar? (Opcional e visível apenas para você)
            </p>
            
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Escreva suas reflexões aqui..."
              className="w-full flex-1 min-h-[200px] bg-white border border-slate-200 rounded-3xl p-5 text-slate-700 font-medium outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all resize-none shadow-sm"
            ></textarea>
          </div>
        )}

        {stage === 'success' && (
          <div className="text-center animate-in zoom-in duration-300 my-auto">
            <div className="w-24 h-24 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-100">
              <Check size={48} className="text-emerald-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-3">Registro Salvo</h1>
            <p className="text-slate-500 font-medium max-w-xs mx-auto">
              Sua constância está sendo construída. Você deu mais um passo importante no seu casamento.
            </p>
            <div className="mt-8 inline-flex items-center bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-600">
              +{activity.xp} Pontos Pessoais
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-lg mx-auto">
          {stage === 'intro' && (
            <button
              onClick={() => setStage('action')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all"
            >
              Fazer meu registro
            </button>
          )}
          {stage === 'action' && (
            <button
              onClick={handleComplete}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all"
            >
              Concluir Passo
            </button>
          )}
          {stage === 'success' && (
            <button
              onClick={handleFinish}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all"
            >
              Voltar para Hoje
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
