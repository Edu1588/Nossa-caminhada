import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Heart } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState<'couple' | 'admin'>('couple');
  const [code, setCode] = useState('');
  const { login, couples } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      if (code === 'admin123') {
        login('admin', 'admin', 'Pastor João');
        navigate('/admin');
      } else {
        alert('Código incorreto para admin.');
      }
    } else {
      // Mock login for couple
      const couple = couples[0];
      if (couple) {
        login('couple', couple.id, `${couple.husbandName} & ${couple.wifeName}`);
        navigate('/hoje');
      } else {
        alert('Nenhum casal cadastrado. Por favor, registre-se primeiro.');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-white">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-orange-400 rounded-[2rem] rotate-12 flex items-center justify-center shadow-lg shadow-rose-200 mb-6">
          <Heart size={40} className="text-white -rotate-12 fill-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight text-center">Devocional</h1>
        <p className="text-slate-500 text-center font-medium mt-2">Crescendo juntos no amor e na fé</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('couple')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'couple' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
          >
            Casais
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'admin' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
          >
            Líderes
          </button>
        </div>

        {role === 'admin' && (
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Código de Acesso</label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-4 font-medium text-lg outline-none focus:border-rose-400 focus:bg-white transition-all placeholder:text-slate-400"
              placeholder="Digite admin123"
            />
          </div>
        )}

        {role === 'couple' && (
          <div className="text-center p-4 bg-blue-50 text-blue-700 rounded-2xl font-medium border-2 border-blue-100">
            Modo demonstração: o login de casal entra automaticamente no primeiro casal cadastrado.
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-orange-400 hover:opacity-90 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-rose-200 hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wide"
        >
          Entrar
        </button>
      </form>

      {role === 'couple' && (
        <div className="mt-8 text-center">
          <Link to="/register" className="text-rose-500 font-bold uppercase tracking-wider text-sm hover:text-rose-600 transition-colors">
            CADASTRAR NOVO CASAL
          </Link>
        </div>
      )}
    </div>
  );
}
