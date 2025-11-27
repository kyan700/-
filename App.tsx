import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import CoursesPage from './features/courses/CoursesPage';
import LecturesPage from './features/lectures/LecturesPage';
import TasksPage from './features/tasks/TasksPage';
import SettingsPage from './features/settings/SettingsPage';
import WeeklySchedulePage from './features/courses/WeeklySchedulePage';
import Layout from './components/Layout';

const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/lectures" element={<LecturesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/schedule" element={<WeeklySchedulePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
