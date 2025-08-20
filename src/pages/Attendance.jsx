import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { attendanceData } from '../data/attendanceData';
import { Calendar, CheckSquare, UserCheck } from 'lucide-react';

const Attendance = () => {
  const { userRole } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'daily'

  // Calculate attendance percentage
  const calculateAttendancePercentage = (present, total) => {
    return Math.round((present / total) * 100);
  };

  // Get color based on attendance percentage
  const getColorByPercentage = (percentage) => {
    if (percentage >= 90) return 'bg-green-500 dark:bg-green-600';
    if (percentage >= 75) return 'bg-blue-500 dark:bg-blue-600';
    if (percentage >= 60) return 'bg-yellow-500 dark:bg-yellow-600';
    return 'bg-red-500 dark:bg-red-600';
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Attendance
        </h1>
        {userRole === 'teacher' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => alert('Mark attendance functionality will be implemented soon!')}
          >
            <UserCheck className="h-5 w-5 mr-2" />
            Mark Attendance
          </motion.button>
        )}
      </div>

      {/* View toggle */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setViewMode('monthly')}
          className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'monthly'
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors duration-200`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Monthly View
        </button>
        <button
          onClick={() => setViewMode('daily')}
          className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'daily'
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors duration-200`}
        >
          <CheckSquare className="h-4 w-4 mr-2" />
          Daily View
        </button>
      </div>

      {/* Monthly View */}
      {viewMode === 'monthly' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {attendanceData.monthly.map((month, index) => {
            const percentage = calculateAttendancePercentage(month.present, month.total);
            const colorClass = getColorByPercentage(percentage);
            
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{month.month}</h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {month.present} / {month.total} days
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
                        Attendance
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-200">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      style={{ width: `${percentage}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClass}`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Daily View */}
      {viewMode === 'daily' && (
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
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {attendanceData.daily.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${day.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                      >
                        {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-200">Overall Attendance</p>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-100">85%</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-200">Present Days</p>
            <p className="text-2xl font-bold text-green-800 dark:text-green-100">63</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-200">Absent Days</p>
            <p className="text-2xl font-bold text-red-800 dark:text-red-100">9</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;