import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { ArrowLeft } from 'lucide-react';

export default function Register() {
  const { registerCouple } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    husbandName: '', husbandAge: '', husbandEmail: '', husbandWhatsapp: '',
    wifeName: '', wifeAge: '', wifeEmail: '', wifeWhatsapp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerCouple({
      husbandName: formData.husbandName,
      husbandAge: Number(formData.husbandAge),
      husbandEmail: formData.husbandEmail,
      husbandWhatsapp: formData.husbandWhatsapp,
      wifeName: formData.wifeName,
      wifeAge: Number(formData.wifeAge),
      wifeEmail: formData.wifeEmail,
      wifeWhatsapp: formData.wifeWhatsapp,
    });
    navigate('/hoje');
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="flex items-center p-4 border-b-2 border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={28} />
        </Link>
        <div className="flex-1">
          <div className="h-4 bg-slate-100 rounded-full mx-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-rose-400 to-orange-400 w-1/3 rounded-full"></div>
            <div className="absolute top-1 left-2 w-full h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-6 text-center">Cadastro do Casal</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2 text-sm">Marido</span>
            </h2>
            <InputField label="Nome" name="husbandName" value={formData.husbandName} onChange={handleChange} required />
            <InputField label="Idade" name="husbandAge" type="number" value={formData.husbandAge} onChange={handleChange} required />
            <InputField label="Email" name="husbandEmail" type="email" value={formData.husbandEmail} onChange={handleChange} required />
            <InputField label="WhatsApp" name="husbandWhatsapp" value={formData.husbandWhatsapp} onChange={handleChange} required />
          </div>

          <div className="h-0.5 bg-slate-100 rounded-full w-full"></div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-500 flex items-center">
              <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mr-2 text-sm">Esposa</span>
            </h2>
            <InputField label="Nome" name="wifeName" value={formData.wifeName} onChange={handleChange} required />
            <InputField label="Idade" name="wifeAge" type="number" value={formData.wifeAge} onChange={handleChange} required />
            <InputField label="Email" name="wifeEmail" type="email" value={formData.wifeEmail} onChange={handleChange} required />
            <InputField label="WhatsApp" name="wifeWhatsapp" value={formData.wifeWhatsapp} onChange={handleChange} required />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-orange-400 hover:opacity-90 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-rose-200 hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wide mt-8"
          >
            Começar
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, type = 'text', value, onChange, required }: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-3 font-medium text-slate-700 outline-none focus:border-rose-400 focus:bg-white transition-all"
      />
    </div>
  )
}
