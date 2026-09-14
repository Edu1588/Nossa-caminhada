import React from 'react';
import { useAppContext } from '../store/AppContext';
import { LogOut, BookOpen, Users, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { couples, activities, logout } = useAppContext();

  // Sort couples by who needs more attention (least completed) or just alphabetically. Let's do alphabetical for neutrality.
  const sortedCouples = [...couples].sort((a, b) => a.husbandName.localeCompare(b.husbandName));

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Painel da Liderança</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">Acompanhamento Pastoral</p>
        </div>
        <button onClick={logout} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
          <LogOut size={20} />
        </button>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full space-y-8">
        <div className="flex gap-4">
          <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <Users className="text-indigo-500 mb-2" size={28} />
            <span className="text-3xl font-black text-slate-800">{couples.length}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Casais</span>
          </div>
          <div className="flex-1 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <BookOpen className="text-emerald-500 mb-2" size={28} />
            <span className="text-3xl font-black text-slate-800">10</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Aulas Totais</span>
          </div>
        </div>

        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1 flex items-center">
            <Clock size={16} className="mr-2" />
            Jornada dos Casais
          </h2>

          <div className="space-y-4">
            {sortedCouples.map((couple) => {
              const progressPercentage = (couple.completedActivities.length / activities.length) * 100;
              
              return (
                <div key={couple.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{couple.husbandName} & {couple.wifeName}</h3>
                      <p className="text-xs font-medium text-slate-500">
                        {couple.completedActivities.length} de {activities.length} passos concluídos
                      </p>
                    </div>
                    {couple.completedActivities.length === activities.length && (
                      <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full">
                        <CheckCircle size={20} />
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
