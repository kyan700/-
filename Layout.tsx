import React from 'react';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-arabic">
    <Sidebar />
    <main className="flex-grow p-4">{children}</main>
  </div>
);

export default Layout;
