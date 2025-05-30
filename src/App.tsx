import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import ProtectedRoute from './components/auth/protected-route';
import MainLayout from './components/layout/main-layout';
import DashboardPage from './pages/dashboard';
import UsersPage from './pages/users';
import TasksPage from './pages/tasks';
import CalendarPage from './pages/calendar';
import ProfilePage from './pages/profile';
import SettingsPage from './pages/settings';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <MainLayout>
                <UsersPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <MainLayout>
                <TasksPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <MainLayout>
                <CalendarPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;