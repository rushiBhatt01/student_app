import { useState, useContext} from 'react';
import { Outlet, NavLink,useNavigate} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../App';
import logo from './logo.png';

// Icons
import { 
  Home, Calendar, BookOpen, FileText, CreditCard, 
  User, BarChart2,  LogOut, Menu, X, Sun, Moon, CheckSquare,
  Settings,
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, setDarkMode, userRole } = useContext(ThemeContext);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Timetable', href: '/timetable', icon: Calendar },
    { name: 'Attendance', href: '/attendance', icon: CheckSquare },
    { name: 'Study Material', href: '/study-material', icon: BookOpen },
    { name: 'Assignments', href: '/assignments', icon: FileText },
    { name: 'Fees', href: '/fees', icon: CreditCard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout clicked"); 
    navigate("/login");              
  };
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for mobile */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: sidebarOpen ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex z-40"
          >
            {/* Sidebar component */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img src={logo} alt="Logo"className="w-12 h-12" />
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Student App</h1>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}  
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </motion.div>
          
          {/* Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          )}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 shadow">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img src={logo} alt="Logo" className="w-12 h-12"/>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Student App</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="w-full">
                {/* Theme toggle in sidebar for desktop */}
                <div className="mb-4 px-2">
                  <div 
                    className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {darkMode ? 'Dark' : 'Light'}
                      </span>
                      {darkMode ? 
                        <Moon className="h-4 w-4 text-blue-500" /> : 
                        <Sun className="h-4 w-4 text-amber-500" />}
                    </div>
                  </div>
                </div>
                
                {/* Logout button */}
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5 text-red-500" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex items-center">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Header with theme toggle */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center md:hidden">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Student App</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle with Label */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1 cursor-pointer"
                 onClick={() => setDarkMode(!darkMode)}>
              <motion.div 
                className="flex items-center space-x-1 px-2 py-1 rounded-full"
                animate={{ 
                  backgroundColor: darkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,1)',
                  color: darkMode ? 'rgba(156,163,175,1)' : 'rgba(55,65,81,1)'
                }}
              >
                <Sun className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Light</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-1 px-2 py-1 rounded-full"
                animate={{ 
                  backgroundColor: darkMode ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0)', 
                  color: darkMode ? 'rgba(55,65,81,1)' : 'rgba(156,163,175,1)'
                }}
              >
                <Moon className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Dark</span>
              </motion.div>
            </div>
            
            {/* User Role Badge */}
            <div className="flex items-center">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
            
            {/* Settings Dropdown */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => console.log('Settings clicked')}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={window.location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[calc(100vh-12rem)]"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;