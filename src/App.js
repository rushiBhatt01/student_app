import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useMemo } from 'react';
import './App.css';

// Layout Components
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import StudyMaterial from './pages/StudyMaterial';
import Assignments from './pages/Assignments';
import Fees from './pages/Fees';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';


// Create Theme Context
export const ThemeContext = createContext();

function App() {
  // State for user authentication and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student'); // 'student', 'teacher', 'admin'
  
  // State for theme (dark/light mode) with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode at OS level
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Return true if saved theme is 'dark' or if no saved theme but OS prefers dark
    return savedTheme === 'dark' || (savedTheme === null && prefersDark);
  });
  
  // Apply dark mode class to body and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  // Listen for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const themeContextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
    userRole,
    setUserRole,
    toggleDarkMode: () => setDarkMode(prev => !prev)
  }), [darkMode, userRole]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="app-container transition-colors duration-300">
        <Router>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
            
            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="study-material" element={<StudyMaterial />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="fees" element={<Fees />} />
              <Route path="profile" element={<Profile />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
