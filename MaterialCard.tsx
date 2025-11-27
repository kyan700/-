import React from 'react';
import { Course } from '../../services/db';

const MaterialCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="rounded-lg border-2 shadow p-4" style={{ borderColor: course.color }}>
    <h3 className="text-lg font-bold" style={{ color: course.color }}>{course.name}</h3>
    <div className="text-gray-500 text-sm mb-1">{course.code}</div>
    <div className="text-sm">د.{course.instructor} ({course.instructorId})</div>
  </div>
);

export default MaterialCard;
