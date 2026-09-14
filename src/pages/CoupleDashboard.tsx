import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Trophy, Flame, Heart, Check, Lock, Play, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CoupleDashboard() {
  const { currentUser, couples, activities } = useAppContext();
  const navigate = useNavigate();

  const couple = couples.find(c => c.id === currentUser?.id);

  if (!couple) return null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-20 px-6 py-4 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-md">
            <Heart size={20} className="text-white fill-white" />
          </div>
          <span className="font-extrabold text-slate-800 text-lg tracking-tight">Jornada</span>
        </div>
        <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center text-orange-500 font-bold">
            <Flame size={18} className="fill-orange-500 mr-1.5" />
            {couple.streak}
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center text-rose-500 font-bold">
            <Trophy size={18} className="fill-rose-500 mr-1.5" />
            {couple.xp}
          </div>
        </div>
      </div>

      <div className="p-6 pb-24 max-w-lg mx-auto w-full">
        {/* Unit Header */}
        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-8 mb-10 shadow-xl shadow-rose-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-white/90 font-bold text-xs tracking-widest uppercase mb-3">
              <Sparkles size={16} className="text-rose-200" />
              <span>Unidade 1</span>
            </div>
            <h3 className="text-white font-black text-3xl leading-tight">Construindo<br/>a Base do Amor</h3>
          </div>
        </div>

        {/* Path / Nodes - Vertical Timeline */}
        <div className="relative">
          {/* The Line */}
          <div className="absolute top-6 bottom-10 left-[2.15rem] w-[2px] bg-gradient-to-b from-rose-200 via-slate-200 to-slate-100"></div>

          {activities.map((activity, index) => {
            const isCompleted = couple.completedActivities.includes(activity.id);
            const isCurrent = !isCompleted && 
              (index === 0 || couple.completedActivities.includes(activities[index - 1].id));
            const isLocked = !isCompleted && !isCurrent;

            return (
              <div key={activity.id} className="relative flex items-center mb-8 last:mb-0 group">
                {/* Node Icon */}
                <div className="relative z-10 shrink-0 mr-5">
                  <button
                    onClick={() => !isLocked && navigate(`/activity/${activity.id}`)}
                    disabled={isLocked}
                    className={cn(
                      "w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center transition-all duration-300 shadow-md border-[4px] border-white",
                      isCompleted ? "bg-rose-500 text-white" :
                      isCurrent ? "bg-gradient-to-tr from-orange-400 to-rose-500 text-white scale-110 shadow-rose-300" :
                      "bg-slate-100 text-slate-400"
                    )}
                  >
                    {isCompleted ? (
                      <Check size={28} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={28} className="ml-1 fill-white" />
                    ) : (
                      <Lock size={24} />
                    )}
                  </button>
                  
                  {isCurrent && (
                    <div className="absolute -inset-2 rounded-full border-2 border-rose-400 animate-ping opacity-20"></div>
                  )}
                </div>

                {/* Card Content */}
                <div 
                  onClick={() => !isLocked && navigate(`/activity/${activity.id}`)}
                  className={cn(
                    "flex-1 bg-white rounded-2xl p-5 border transition-all duration-300 cursor-pointer text-left",
                    isCurrent ? "border-rose-200 shadow-lg shadow-rose-100/50 hover:-translate-y-1" :
                    isCompleted ? "border-slate-100 shadow-sm opacity-80 hover:opacity-100" :
                    "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <h4 className={cn(
                      "font-bold text-lg leading-tight",
                      isCurrent ? "text-rose-600" : "text-slate-700"
                    )}>
                      {activity.title}
                    </h4>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ml-2 uppercase tracking-wide",
                      isCurrent ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {activity.xp} XP
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 font-medium">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
