/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './store/AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminLessons from './pages/AdminLessons';
import CoupleDashboard from './pages/CoupleDashboard';
import ActivityDetail from './pages/ActivityDetail';
import BottomNav from './components/BottomNav';
import Profile from './pages/Profile';
import Hoje from './pages/Hoje';
import Nos from './pages/Nos';
import Apoio from './pages/Apoio';

export default function App() {
  const { currentUser } = useAppContext();

  return (
    <div className="h-[100dvh] bg-slate-100 font-sans text-slate-800 flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative">
        <div className="flex-1 overflow-hidden flex flex-col relative">
          <Routes>
            <Route path="/" element={
              currentUser ? (
                currentUser.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/hoje" />
              ) : (
                <Navigate to="/login" />
              )
            } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/admin" element={
              currentUser?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
            } />
            
            <Route path="/admin/lessons" element={
              currentUser?.role === 'admin' ? <AdminLessons /> : <Navigate to="/login" />
            } />
            
            <Route path="/hoje" element={
              currentUser?.role === 'couple' ? <Hoje /> : <Navigate to="/login" />
            } />
            
            <Route path="/jornada" element={
              currentUser?.role === 'couple' ? <CoupleDashboard /> : <Navigate to="/login" />
            } />
            
            <Route path="/nos" element={
              currentUser?.role === 'couple' ? <Nos /> : <Navigate to="/login" />
            } />
            
            <Route path="/apoio" element={
              currentUser?.role === 'couple' ? <Apoio /> : <Navigate to="/login" />
            } />
            
            <Route path="/activity/:id" element={
              currentUser?.role === 'couple' ? <ActivityDetail /> : <Navigate to="/login" />
            } />
            
            <Route path="/profile" element={
              currentUser?.role === 'couple' ? <Profile /> : <Navigate to="/login" />
            } />
          </Routes>
        </div>

        {currentUser && <BottomNav />}
      </div>
    </div>
  );
}
