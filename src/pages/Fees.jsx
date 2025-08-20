import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { feesData } from '../data/feesData';
import { CreditCard, Calendar, DollarSign, Check, AlertCircle } from 'lucide-react';

const Fees = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'history'

  // Calculate percentage paid
  const percentagePaid = Math.round((feesData.paid / feesData.totalFees) * 100);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Fees Payment
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${activeTab === 'history'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Payment History
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Fee Summary Card */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fee Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Fees</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(feesData.totalFees)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid</span>
                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">{formatCurrency(feesData.paid)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</span>
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">{formatCurrency(feesData.pending)}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Partially Paid
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Due Date: {formatDate(feesData.dueDate)}</span>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{percentagePaid}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${percentagePaid}%` }}
                      ></div>
                    </div>
                  </div>
                  {feesData.pending > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => alert('Payment gateway will be implemented soon!')}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Now ({formatCurrency(feesData.pending)})
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fee Breakdown Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fee Breakdown</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Tuition Fee</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(35000)}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Development Fee</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(8000)}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Library Fee</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(3000)}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Computer Lab Fee</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(4000)}</span>
                </li>
                <li className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 flex justify-between items-center font-medium">
                  <span className="text-sm text-gray-900 dark:text-white">Total</span>
                  <span className="text-sm text-gray-900 dark:text-white">{formatCurrency(feesData.totalFees)}</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Payment History Tab */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Mode</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {feesData.history.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">TXN{String(transaction.id).padStart(6, '0')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{formatCurrency(transaction.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className="capitalize">{transaction.mode}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.status === 'paid' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Placeholder for future transactions */}
                  {feesData.history.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No transaction history available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center">
              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => alert('Download receipt functionality will be implemented soon!')}
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download All Receipts
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Fees;