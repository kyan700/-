import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'لوحة التحكم', emoji: '📊' },
  { to: '/courses', label: 'المواد', emoji: '📚' },
  { to: '/lectures', label: 'المحاضرات', emoji: '📝' },
  { to: '/tasks', label: 'المهام', emoji: '🗂️' },
  { to: '/schedule', label: 'الجدول', emoji: '📅' },
  { to: '/settings', label: 'الإعدادات', emoji: '⚙️' },
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-48 py-6 px-2 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 min-h-screen shadow-lg">
      <div className="mb-8 text-center text-blue-600 font-bold text-xl tracking-widest">أواب</div>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.to}>
            <Link
              className={`flex items-center px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition ${
                pathname === link.to ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-white font-semibold' : ''
              }`}
              to={link.to}
            >
              <span className="ml-2">{link.emoji}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
