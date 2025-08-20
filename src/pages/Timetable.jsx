import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { timetableData } from '../data/timetableData';
import { Calendar, Plus } from 'lucide-react';

const Timetable = () => {
  const { userRole } = useContext(ThemeContext);
  const [activeDay, setActiveDay] = useState('monday');

  // Color mapping for subjects
  const subjectColors = {
    'Mathematics': 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Physics': 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200',
    'English': 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Chemistry': 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Computer Science': 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Biology': 'bg-pink-100 border-pink-500 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'History': 'bg-indigo-100 border-indigo-500 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'Geography': 'bg-orange-100 border-orange-500 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Timetable
        </h1>
        {userRole === 'teacher' || userRole === 'admin' ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => alert('Edit timetable functionality will be implemented soon!')}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add/Edit Timetable
          </motion.button>
        ) : null}
      </div>

      {/* Day selector */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-md flex items-center ${activeDay === day
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              } transition-colors duration-200`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Timetable grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Teacher
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {timetableData[activeDay] && timetableData[activeDay].length > 0 ? (
                timetableData[activeDay].map((period, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {period.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border-l-4 ${subjectColors[period.subject] || 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                        {period.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {period.teacher}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No classes scheduled for {activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Subject Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(subjectColors).map(([subject, colorClass]) => (
            <div key={subject} className="flex items-center">
              <span className={`inline-block w-4 h-4 rounded mr-2 ${colorClass.split(' ')[0]}`}></span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{subject}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;