import React from 'react';
const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const WeeklySchedulePage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📅 الجدول الأسبوعي</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border shadow">
          <thead>
            <tr>
              <th></th>
              {days.map(day => <th key={day} className="p-2 bg-blue-100">{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5,6].map(period =>
              <tr key={period}>
                <td className="bg-gray-100 text-center p-2">الحصة {period}</td>
                {days.map(day => <td key={day} className="h-16 border"></td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default WeeklySchedulePage;
