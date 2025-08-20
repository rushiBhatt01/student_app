import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { analyticsData } from '../data/analyticsData';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
  TrendingUp, BarChart2, PieChart as PieChartIcon, Activity,
  Award, Calendar, Clock, AlertCircle
} from 'lucide-react';

const Analytics = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Colors for charts
  const colors = {
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#8b5cf6',
    warning: '#f59e0b',
    danger: '#ef4444',
    success: '#22c55e',
    info: '#06b6d4',
    light: '#f3f4f6',
    dark: '#1f2937',
    student: '#3b82f6',
    classAverage: '#10b981',
    topScore: '#8b5cf6'
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
          Performance Analytics
        </h1>
        <div className="flex space-x-2">
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option>Current Term</option>
            <option>Previous Term</option>
            <option>Last Year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`${activeTab === 'subjects'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Subject Analysis
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`${activeTab === 'skills'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Activity className="h-4 w-4 mr-2" />
            Skills Assessment
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`${activeTab === 'exams'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Award className="h-4 w-4 mr-2" />
            Exam Results
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Average</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.comparisonData.student}%</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Class Average: {analyticsData.comparisonData.classAverage}%</span>
                  <span className="text-blue-600 dark:text-blue-400">+{analyticsData.comparisonData.student - analyticsData.comparisonData.classAverage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: `${analyticsData.comparisonData.student}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Class Average: 85%</span>
                  <span className="text-green-600 dark:text-green-400">+7%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Class Rank</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">5 / 40</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Top 12.5%</span>
                  <span className="text-purple-600 dark:text-purple-400">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData.performanceTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="term" 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'} 
                  />
                  <YAxis 
                    stroke={darkMode ? '#9ca3af' : '#6b7280'}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    name="Term Average" 
                    stroke={colors.primary} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Impact Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Attendance & Performance Correlation</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.attendanceImpact}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    name="Attendance %" 
                    stroke={colors.info} 
                    fill={darkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)'} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    name="Performance %" 
                    stroke={colors.success} 
                    fill={darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)'} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Areas for Improvement</h2>
            <div className="space-y-4">
              {analyticsData.improvementAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className={`h-5 w-5 mr-3 ${area.priority === 'High' ? 'text-red-500' : area.priority === 'Medium' ? 'text-yellow-500' : 'text-blue-500'}`} />
                    <span className="text-gray-900 dark:text-white">{area.area}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${area.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : area.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                    {area.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Subject Analysis Tab */}
      {activeTab === 'subjects' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Subject Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Subject Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.subjectPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="subject" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="score" name="Your Score" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" name="Class Average" fill={colors.secondary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Strongest Subjects</h2>
              <div className="space-y-4">
                {analyticsData.subjectPerformance
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{subject.subject}</h3>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{subject.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${subject.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Areas for Improvement</h2>
              <div className="space-y-4">
                {analyticsData.subjectPerformance
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 3)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{subject.subject}</h3>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{subject.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${subject.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'A (90-100%)', value: 2 },
                      { name: 'B (80-89%)', value: 1 },
                      { name: 'C (70-79%)', value: 1 },
                      { name: 'D (60-69%)', value: 1 },
                      { name: 'F (Below 60%)', value: 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: 'A (90-100%)', value: 2, color: colors.success },
                      { name: 'B (80-89%)', value: 1, color: colors.primary },
                      { name: 'C (70-79%)', value: 1, color: colors.info },
                      { name: 'D (60-69%)', value: 1, color: colors.warning },
                      { name: 'F (Below 60%)', value: 0, color: colors.danger },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skills Assessment Tab */}
      {activeTab === 'skills' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Skills Radar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skills Assessment</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyticsData.skillAssessment}>
                  <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <PolarAngleAxis dataKey="skill" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Radar name="Skills" dataKey="score" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skill Breakdown</h2>
              <div className="space-y-4">
                {analyticsData.skillAssessment.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.skill}</span>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${skill.score >= 90 ? 'bg-green-600 dark:bg-green-500' : skill.score >= 80 ? 'bg-blue-600 dark:bg-blue-500' : skill.score >= 70 ? 'bg-yellow-600 dark:bg-yellow-500' : 'bg-red-600 dark:bg-red-500'}`} 
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skill Development Recommendations</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Join the Debate Club</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Improve critical thinking and communication skills</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Participate in Group Projects</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enhance teamwork and collaboration abilities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Attend Creative Workshops</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Boost creativity and innovative thinking</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Take Online Courses</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Develop technical skills in areas of interest</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Exam Results Tab */}
      {activeTab === 'exams' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Exam Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Exam Results</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your performance in the last 5 exams</p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Exam
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {analyticsData.examResults.map((exam, index) => {
                      const percentage = (exam.score / exam.maxScore) * 100;
                      let grade, colorClass;
                      
                      if (percentage >= 90) {
                        grade = 'A';
                        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                      } else if (percentage >= 80) {
                        grade = 'B';
                        colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                      } else if (percentage >= 70) {
                        grade = 'C';
                        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
                      } else if (percentage >= 60) {
                        grade = 'D';
                        colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
                      } else {
                        grade = 'F';
                        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                      }
                      
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {exam.exam}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {exam.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {exam.score} / {exam.maxScore} ({percentage.toFixed(0)}%)
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
                              {grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Exam Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Exam Performance Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.examResults.map(exam => ({
                    name: exam.exam.split(' ').slice(-1)[0], // Just take the subject name
                    score: (exam.score / exam.maxScore) * 100
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="score" name="Score (%)" fill={colors.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Exam Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Average</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {(analyticsData.examResults.reduce((sum, exam) => sum + (exam.score / exam.maxScore) * 100, 0) / analyticsData.examResults.length).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Class Average</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">78.5%</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Score</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">96.0%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Analytics;