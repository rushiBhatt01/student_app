import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

// Sample data
import { studentData, teacherData, adminData } from '../data/dashboardData';

const Dashboard = () => {
  const { userRole } = useContext(ThemeContext);

  // Render different dashboard based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard data={studentData} />;
      case 'teacher':
        return <TeacherDashboard data={teacherData} />;
      case 'admin':
        return <AdminDashboard data={adminData} />;
      default:
        return <StudentDashboard data={studentData} />;
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
      </h1>
      {renderDashboard()}
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Timetable Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Today's Schedule</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.todayClasses.map((cls, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${cls.color}`}>
                        <span className="text-white text-xs">{cls.time.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {cls.subject}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {cls.time} • {cls.room}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Attendance Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Attendance</h3>
          <div className="mt-5">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{data.attendance.overall}%</div>
              <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">Overall</div>
            </div>
            <div className="mt-6 space-y-4">
              {data.attendance.subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{subject.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{subject.percentage}%</div>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${subject.percentage > 75 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assignments Due */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Assignments Due</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.assignments.map((assignment, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.subject}</p>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${assignment.daysLeft <= 2 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        Due in {assignment.daysLeft} days
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg sm:col-span-2 lg:col-span-3"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Notifications</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.notifications.map((notification, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${notification.type === 'announcement' ? 'bg-blue-500' : notification.type === 'assignment' ? 'bg-purple-500' : 'bg-green-500'}`}>
                        <span className="text-white text-xs">{notification.type.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Teacher Dashboard Component
const TeacherDashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Class List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg sm:col-span-2"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">My Classes</h3>
          <div className="mt-5">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.classes.map((cls, index) => (
                <li key={index} className="col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 dark:text-white text-sm font-medium truncate">{cls.name}</h3>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                          {cls.students} students
                        </span>
                      </div>
                      <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm truncate">{cls.schedule}</p>
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-600">
                      <div className="w-0 flex-1 flex">
                        <button className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-200 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:hover:text-white">
                          View Details
                        </button>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <button className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-200 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:hover:text-white">
                          Take Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Assignments */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Assignments</h3>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.assignments.map((assignment, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.class}</p>
                    </div>
                    <div className="ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${assignment.submissions > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {assignment.submissions} submissions
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg sm:col-span-3"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Class Performance</h3>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {data.performance.map((perf, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{perf.class}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{perf.average}%</dd>
                      <dd className="mt-2">
                        <span className={`text-sm font-medium ${perf.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {perf.change >= 0 ? '+' : ''}{perf.change}%
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> from previous term</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Stats Cards */}
      {data.stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
              <dd className="mt-2">
                <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400"> from previous month</span>
              </dd>
            </dl>
          </div>
        </motion.div>
      ))}

      {/* Fees Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg sm:col-span-2"
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Fees Collection</h3>
          <div className="mt-5">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{data.fees.collected}</div>
              <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">collected of {data.fees.total}</div>
            </div>
            <div className="mt-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-200">
                      {Math.round((parseInt(data.fees.collected.replace(/[^0-9]/g, '')) / parseInt(data.fees.total.replace(/[^0-9]/g, ''))) * 100)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                      {Math.round((parseInt(data.fees.collected.replace(/[^0-9]/g, '')) / parseInt(data.fees.total.replace(/[^0-9]/g, ''))) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200 dark:bg-green-900">
                  <div style={{ width: `${Math.round((parseInt(data.fees.collected.replace(/[^0-9]/g, '')) / parseInt(data.fees.total.replace(/[^0-9]/g, ''))) * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-400"></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recent Payments</h4>
              <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                {data.fees.recent.map((payment, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{payment.student}</div>
                        <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">({payment.class})</div>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">{payment.amount}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Announcements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg sm:col-span-2"
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Announcements</h3>
            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              New Announcement
            </button>
          </div>
          <div className="mt-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.announcements.map((announcement, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {announcement.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {announcement.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                      {announcement.date}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;