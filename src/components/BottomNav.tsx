import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Heart, LifeBuoy, Settings, BookOpen } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="bg-white border-t-2 border-slate-200 flex items-center justify-around px-2 py-2 shrink-0 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] z-50">
      {currentUser.role === 'admin' ? (
        <>
          <NavItem to="/admin" icon={<Settings size={28} />} label="Painel" />
          <NavItem to="/admin/lessons" icon={<BookOpen size={28} />} label="Lições" />
        </>
      ) : (
        <>
          <NavItem to="/hoje" icon={<Home size={28} />} label="Hoje" />
          <NavItem to="/jornada" icon={<Map size={28} />} label="Jornada" />
          <NavItem to="/nos" icon={<Heart size={28} />} label="Nós" />
          <NavItem to="/apoio" icon={<LifeBuoy size={28} />} label="Apoio" />
        </>
      )}
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({isActive}) => cn(
        "flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-200 border-2 border-transparent w-full max-w-[80px]",
        isActive ? "text-rose-500 bg-rose-50 border-rose-100" : "text-slate-400 hover:bg-slate-50"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{label}</span>
    </NavLink>
  )
}
