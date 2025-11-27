import React, { useEffect, useState } from 'react';
import { db, Course } from '../../services/db';
import MaterialCard from './MaterialCard';
import CourseForm from './CourseForm';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    db.courses.toArray().then(setCourses);
  }, []);

  const addCourse = async (course: Course) => {
    await db.courses.add({ ...course, createdAt: new Date() });
    setCourses(await db.courses.toArray());
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📚 المواد الدراسية</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary">
          {showAdd ? 'إلغاء' : 'إضافة مادة'}
        </button>
      </div>
      {showAdd && <CourseForm onSave={addCourse} />}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {courses.map((c) => <MaterialCard key={c.id} course={c} />)}
      </div>
    </div>
  );
};
export default CoursesPage;
