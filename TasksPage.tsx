import React, { useState, useEffect } from 'react';
import { db, Task, Course } from '../../services/db';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Partial<Task>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    db.tasks.toArray().then(setTasks);
    db.courses.toArray().then(setCourses);
  }, []);

  const addTask = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!form.title || !form.dueDate || !form.courseId) return;
    await db.tasks.add({
      ...form,
      createdAt: new Date(),
      status: 'todo',
      progress: 0,
      reminders: [],
      priority: form.priority ?? 'medium'
    } as Task);
    setTasks(await db.tasks.toArray());
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🗂️ المهام</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">{showForm ? 'إلغاء' : '+ مهمة'}</button>
      </div>
      {showForm &&
        <form className="space-y-2 bg-white rounded p-4 mb-4" onSubmit={addTask}>
          <input required className="input" placeholder="عنوان المهمة"
            value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <select required className="input"
              value={form.courseId || ''}
              onChange={e => setForm(f => ({ ...f, courseId: +e.target.value }))}>
            <option value="">اختر المادة</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="date" className="input" required value={form.dueDate || ''}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          <select className="input" value={form.priority || 'medium'}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as any }))}>
            <option value="high">هامة</option>
            <option value="medium">متوسطة</option>
            <option value="low">عادية</option>
          </select>
          <button type="submit" className="btn btn-primary w-full">حفظ</button>
        </form>
      }
      <div className="space-y-2">
        {tasks.map(t =>
          <div key={t.id} className="border rounded p-3 flex flex-col">
            <div className="flex justify-between items-center">
              <b>{t.title}</b>
              <span className="rounded px-2 text-sm"
                style={{ background: t.priority === 'high' ? '#F87171' : t.priority === 'medium' ? '#FBBF24' : '#34D399' }}>
                {t.priority === 'high' ? 'هام' : t.priority === 'medium' ? 'متوسط' : 'عادي'}
              </span>
            </div>
            <div className="text-xs mt-1 text-gray-500">
              المادة: {courses.find(c => c.id === t.courseId)?.name} | الموعد: {t.dueDate}
            </div>
            <progress value={t.progress} max={100} className="w-full mt-2"></progress>
          </div>)}
      </div>
    </div>
  );
};
export default TasksPage;
