import React, { useEffect, useState } from 'react';
import { db, Course, Lecture, Task } from '../../services/db';

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    db.courses.toArray().then(setCourses);
    db.lectures.toArray().then(setLectures);
    db.tasks.toArray().then(setTasks);
  }, []);

  const tasksDone = tasks.filter(t => t.status === 'done').length;
  const percent = tasks.length ? Math.round((tasksDone / tasks.length) * 100) : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📊 لوحة التحكم</h1>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="rounded bg-green-100 text-green-700 p-3 text-center">المهام: {tasks.length}</div>
        <div className="rounded bg-blue-100 text-blue-700 p-3 text-center">المواد: {courses.length}</div>
        <div className="rounded bg-yellow-100 text-yellow-700 p-3 text-center">المحاضرات: {lectures.length}</div>
      </div>
      <div>
        <div className="mb-2">نسبة الإنجاز الكلية</div>
        <div className="w-full bg-gray-200 h-4 rounded overflow-hidden mb-4">
          <div className="h-4 bg-blue-500" style={{ width: `${percent}%` }}></div>
        </div>
        <div>{percent} %</div>
      </div>
    </div>
  );
};
export default Dashboard;
