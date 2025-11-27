import React, { useState } from 'react';
import { Course } from '../../services/db';

const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#818CF8', '#F472B6'];

const initial: Partial<Course> = {
  name: '', code: '', instructor: '', instructorId: '', color: colors[0],
};

const CourseForm: React.FC<{ onSave: (course: Course) => void }> = ({ onSave }) => {
  const [form, setForm] = useState(initial);

  return (
    <form className="bg-white rounded shadow p-4 mb-4 space-y-4"
      onSubmit={e => {
        e.preventDefault();
        if (!form.name || !form.code) return;
        onSave(form as Course);
        setForm(initial);
      }}>
      <input required className="input" placeholder="اسم المادة" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input required className="input" placeholder="رقم المادة" value={form.code}
        onChange={e => setForm({ ...form, code: e.target.value })} />
      <input className="input" placeholder="اسم المدرس" value={form.instructor}
        onChange={e => setForm({ ...form, instructor: e.target.value })} />
      <input className="input" placeholder="رقم المدرس" value={form.instructorId}
        onChange={e => setForm({ ...form, instructorId: e.target.value })} />
      <div className="flex items-center gap-2">
        {colors.map(clr =>
          <label key={clr} className="cursor-pointer">
            <input type="radio" name="color" value={clr}
              checked={form.color === clr}
              onChange={() => setForm({ ...form, color: clr })}
            />
            <span className="inline-block w-5 h-5 rounded-full ml-1" style={{ backgroundColor: clr }}></span>
          </label>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-full">حفظ</button>
    </form>
  );
};
export default CourseForm;
