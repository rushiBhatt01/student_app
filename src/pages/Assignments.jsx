import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { assignmentsData } from '../data/assignmentsData';
import { FileText, Upload, Check, Clock, Filter } from 'lucide-react';

const Assignments = () => {
  const { userRole } = useContext(ThemeContext);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'submitted'
  const [searchTerm, setSearchTerm] = useState('');

  // Filter assignments based on status and search term
  const filteredAssignments = assignmentsData.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter;
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="w-3 h-3 mr-1" />
            Submitted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Assignments
        </h1>
        {userRole === 'teacher' || userRole === 'admin' ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => alert('Create assignment functionality will be implemented soon!')}
          >
            <FileText className="h-5 w-5 mr-2" />
            Create Assignment
          </motion.button>
        ) : null}
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${filter === 'all' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 text-sm rounded-md ${filter === 'pending' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('submitted')}
              className={`px-3 py-1 text-sm rounded-md ${filter === 'submitted' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
            >
              Submitted
            </button>
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAssignments.length > 0 ? filteredAssignments.map((assignment) => {
          const daysRemaining = getDaysRemaining(assignment.dueDate);
          const isOverdue = daysRemaining < 0;
          
          return (
            <motion.div
              key={assignment.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {assignment.subject}
                  </span>
                  {getStatusBadge(assignment.status)}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {assignment.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Due: </span>
                    <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                      {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                  {isOverdue ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Overdue by {Math.abs(daysRemaining)} days
                    </span>
                  ) : daysRemaining <= 3 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Due in {daysRemaining} days
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Due in {daysRemaining} days
                    </span>
                  )}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                {assignment.status === 'pending' ? (
                  <button
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => alert(`Upload functionality for ${assignment.title} will be implemented soon!`)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Assignment
                  </button>
                ) : (
                  <button
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                    onClick={() => alert(`View submission for ${assignment.title}`)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Submission
                  </button>
                )}
              </div>
            </motion.div>
          );
        }) : (
          <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
            No assignments found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Assignments;