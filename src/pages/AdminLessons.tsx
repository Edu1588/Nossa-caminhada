import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { BookOpen, Plus, Target, X } from 'lucide-react';

export default function AdminLessons() {
  const { activities, addActivity } = useAppContext();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    xp: 10,
    unit: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      title: formData.title,
      description: formData.description,
      xp: Number(formData.xp),
      unit: Number(formData.unit)
    });
    setFormData({ title: '', description: '', xp: 10, unit: 1 });
    setShowForm(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Grade Curricular</h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">Gerenciar Missões Semanais</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full space-y-8">
        {showForm && (
          <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-top-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center">
              <Target className="text-indigo-500 mr-2" size={24} />
              Nova Missão
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ml-1">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                  placeholder="Ex: O Segredo do Casamento"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ml-1">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all h-28 resize-none"
                  placeholder="Descreva a atividade prática que o casal deve realizar..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ml-1">Pontos</label>
                  <input
                    type="number"
                    name="xp"
                    value={formData.xp}
                    onChange={handleChange}
                    required
                    min="5"
                    step="5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ml-1">Aula N°</label>
                  <input
                    type="number"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all"
              >
                Cadastrar Missão
              </button>
            </div>
          </form>
        )}

        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1 flex items-center">
            <BookOpen size={16} className="mr-2" />
            Conteúdo Programático ({activities.length})
          </h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-start">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 mr-4 shrink-0">
                  {activity.unit}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{activity.title}</h3>
                  <p className="text-slate-500 text-sm font-medium mt-1 mb-3 leading-relaxed">{activity.description}</p>
                  <div className="inline-flex items-center text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500">
                    {activity.xp} Pontos Pessoais
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
