import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { LogOut, User, Flame, Trophy, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { currentUser, couples, logout } = useAppContext();
  const navigate = useNavigate();

  const couple = couples.find(c => c.id === currentUser?.id);

  if (!couple) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-6">
      <div className="bg-white border-b-2 border-slate-100">
        <div className="flex flex-col items-center py-10 px-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center mb-4">
            <User size={48} className="text-slate-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 text-center">
            {couple.husbandName} & {couple.wifeName}
          </h1>
          <p className="text-slate-400 font-bold mt-1 text-sm">Desde {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-extrabold text-slate-800 uppercase tracking-wide mb-4">Estatísticas</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-100 flex flex-col items-start">
            <div className="flex items-center text-orange-500 mb-2">
              <Flame size={20} className="fill-orange-500 mr-2" />
              <span className="font-bold text-sm">Ofensiva</span>
            </div>
            <span className="text-2xl font-black text-slate-800">{couple.streak}</span>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col items-start">
            <div className="flex items-center text-rose-500 mb-2">
              <Trophy size={20} className="fill-rose-500 mr-2" />
              <span className="font-bold text-sm">XP Total</span>
            </div>
            <span className="text-2xl font-black text-slate-800">{couple.xp}</span>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col items-start col-span-2">
            <div className="flex items-center text-emerald-500 mb-2">
              <CheckCircle size={20} className="fill-emerald-500 mr-2" />
              <span className="font-bold text-sm">Atividades Concluídas</span>
            </div>
            <span className="text-2xl font-black text-slate-800">{couple.completedActivities.length}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-red-500 font-bold text-lg py-4 rounded-2xl transition-all uppercase tracking-wide flex items-center justify-center"
        >
          <LogOut size={24} className="mr-2" />
          Sair
        </button>
      </div>
    </div>
  );
}
