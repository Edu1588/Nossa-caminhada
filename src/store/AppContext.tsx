import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'couple';

export interface Couple {
  id: string;
  husbandName: string;
  husbandAge: number;
  husbandEmail: string;
  husbandWhatsapp: string;
  wifeName: string;
  wifeAge: number;
  wifeEmail: string;
  wifeWhatsapp: string;
  xp: number;
  streak: number;
  completedActivities: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  xp: number;
  unit: number;
}

interface AppState {
  currentUser: { id: string; role: UserRole; name: string } | null;
  couples: Couple[];
  activities: Activity[];
}

interface AppContextType extends AppState {
  login: (role: UserRole, id: string, name: string) => void;
  logout: () => void;
  registerCouple: (couple: Omit<Couple, 'id' | 'xp' | 'streak' | 'completedActivities'>) => void;
  completeActivity: (coupleId: string, activityId: string) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
}

const initialActivities: Activity[] = [
  { id: 'aula1', unit: 1, title: 'O Segredo do Casamento', description: 'Orar juntos duas vezes, praticar um ato de serviço, realizar três breves devocionais e uma conversa intencional.', xp: 10 },
  { id: 'aula2', unit: 2, title: 'O Poder para o Casamento', description: 'Escolher uma atitude pessoal que possa iniciar cura no relacionamento, sem exigir que o outro mude primeiro.', xp: 10 },
  { id: 'aula3', unit: 3, title: 'A Essência do Casamento', description: 'Identificar uma expectativa individualista e transformá-la em um compromisso de cooperação e cuidado mútuo.', xp: 10 },
  { id: 'aula4', unit: 4, title: 'A Missão do Casamento', description: 'Praticar uma atitude que demonstre que o casamento é prioridade e realizar uma conversa sobre o horizonte espiritual comum.', xp: 10 },
  { id: 'aula5', unit: 5, title: 'Amar o Desconhecido', description: 'Praticar durante a semana uma linguagem de amor valorizada pelo cônjuge e conversar sobre o resultado.', xp: 10 },
  { id: 'aula6', unit: 6, title: 'Acolher o Outro', description: 'Praticar uma ação de acolhimento sem exigir mudança imediata do outro e registrar o que essa atitude produziu.', xp: 10 },
  { id: 'aula7', unit: 7, title: 'A Importância da Mesa', description: 'Realizar ao menos duas refeições intencionais à mesa e um encontro de qualidade do casal, ainda que seja um café.', xp: 10 },
  { id: 'aula8', unit: 8, title: 'Gestão Financeira no Casamento', description: 'Realizar uma reunião financeira de 30 minutos, montar ou revisar o orçamento e escolher uma meta conjunta para 90 dias.', xp: 10 },
  { id: 'aula9', unit: 9, title: 'O Homem e a Mulher no Casamento', description: 'Cada cônjuge pratica uma atitude específica de honra e serviço; avaliar o fruto dessa escolha.', xp: 10 },
  { id: 'aula10', unit: 10, title: 'Sexo e o Casamento', description: 'Definir um compromisso de diálogo e cuidado com a intimidade; iniciar o Plano de 90 Dias.', xp: 10 },
];

const initialCouples: Couple[] = [
  {
    id: 'couple1',
    husbandName: 'João',
    husbandAge: 30,
    husbandEmail: 'joao@email.com',
    husbandWhatsapp: '11999999999',
    wifeName: 'Maria',
    wifeAge: 28,
    wifeEmail: 'maria@email.com',
    wifeWhatsapp: '11988888888',
    xp: 0,
    streak: 0,
    completedActivities: [],
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ id: string; role: UserRole; name: string } | null>(null);
  const [couples, setCouples] = useState<Couple[]>(initialCouples);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const login = (role: UserRole, id: string, name: string) => {
    setCurrentUser({ role, id, name });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerCouple = (newCouple: Omit<Couple, 'id' | 'xp' | 'streak' | 'completedActivities'>) => {
    const id = `couple_${Date.now()}`;
    const couple: Couple = {
      ...newCouple,
      id,
      xp: 0,
      streak: 0,
      completedActivities: [],
    };
    setCouples([...couples, couple]);
    login('couple', id, `${couple.husbandName} & ${couple.wifeName}`);
  };

  const completeActivity = (coupleId: string, activityId: string) => {
    setCouples(prev => prev.map(c => {
      if (c.id === coupleId && !c.completedActivities.includes(activityId)) {
        const act = activities.find(a => a.id === activityId);
        return {
          ...c,
          xp: c.xp + (act?.xp || 0),
          completedActivities: [...c.completedActivities, activityId]
        };
      }
      return c;
    }));
  };

  const addActivity = (newActivity: Omit<Activity, 'id'>) => {
    const id = `act_${Date.now()}`;
    setActivities([...activities, { ...newActivity, id }]);
  };

  return (
    <AppContext.Provider value={{ currentUser, couples, activities, login, logout, registerCouple, completeActivity, addActivity }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
