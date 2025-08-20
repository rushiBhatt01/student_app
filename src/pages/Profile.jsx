import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { profileData } from '../data/profileData';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Award } from 'lucide-react';

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const [profile, setProfile] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'contact', 'parent', 'academic'

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setEditedProfile({
      ...editedProfile,
      [section]: {
        ...editedProfile[section],
        [field]: value
      }
    });
  };

  // Handle save
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Handle cancel
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Profile
        </h1>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-5 w-5 mr-2" />
            Edit Profile
          </motion.button>
        ) : (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={handleSave}
            >
              <Save className="h-5 w-5 mr-2" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={handleCancel}
            >
              <X className="h-5 w-5 mr-2" />
              Cancel
            </motion.button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        {/* Profile Header */}
        <div className="px-4 py-5 sm:px-6 flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {profile.personal.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {profile.personal.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              {profile.personal.rollNumber} • {profile.personal.class}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${activeTab === 'personal'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`${activeTab === 'contact'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab('parent')}
              className={`${activeTab === 'parent'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Parent
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`${activeTab === 'academic'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Academic
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-5 sm:p-6">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.name}
                    onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.personal.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Roll Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.rollNumber}
                    onChange={(e) => handleInputChange('personal', 'rollNumber', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.personal.rollNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Class
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.class}
                    onChange={(e) => handleInputChange('personal', 'class', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.personal.class}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.dateOfBirth}
                    onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(profile.personal.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.gender}
                    onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.personal.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Group
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.personal.bloodGroup}
                    onChange={(e) => handleInputChange('personal', 'bloodGroup', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.personal.bloodGroup}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Contact Information */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.contact.email}
                    onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900 dark:text-white">{profile.contact.email}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.contact.phone}
                    onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900 dark:text-white">{profile.contact.phone}</p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.contact.address}
                    onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                  />
                ) : (
                  <div className="flex items-start mt-1">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-900 dark:text-white">{profile.contact.address}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Parent Information */}
          {activeTab === 'parent' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Father's Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.parent.fatherName}
                    onChange={(e) => handleInputChange('parent', 'fatherName', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.parent.fatherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mother's Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.parent.motherName}
                    onChange={(e) => handleInputChange('parent', 'motherName', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.parent.motherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parent's Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.parent.parentEmail}
                    onChange={(e) => handleInputChange('parent', 'parentEmail', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900 dark:text-white">{profile.parent.parentEmail}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parent's Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.parent.parentPhone}
                    onChange={(e) => handleInputChange('parent', 'parentPhone', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900 dark:text-white">{profile.parent.parentPhone}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Academic Information */}
          {activeTab === 'academic' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Admission Year
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.academic.admissionYear}
                    onChange={(e) => handleInputChange('academic', 'admissionYear', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.academic.admissionYear}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Year
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.academic.currentYear}
                    onChange={(e) => handleInputChange('academic', 'currentYear', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.academic.currentYear}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.academic.section}
                    onChange={(e) => handleInputChange('academic', 'section', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.academic.section}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Roll Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={editedProfile.academic.rollNumber}
                    onChange={(e) => handleInputChange('academic', 'rollNumber', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{profile.academic.rollNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Achievements
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedProfile.academic.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...editedProfile.academic.achievements];
                            newAchievements[index] = e.target.value;
                            setEditedProfile({
                              ...editedProfile,
                              academic: {
                                ...editedProfile.academic,
                                achievements: newAchievements
                              }
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => {
                            const newAchievements = [...editedProfile.academic.achievements];
                            newAchievements.splice(index, 1);
                            setEditedProfile({
                              ...editedProfile,
                              academic: {
                                ...editedProfile.academic,
                                achievements: newAchievements
                              }
                            });
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setEditedProfile({
                          ...editedProfile,
                          academic: {
                            ...editedProfile.academic,
                            achievements: [...editedProfile.academic.achievements, '']
                          }
                        });
                      }}
                    >
                      + Add Achievement
                    </button>
                  </div>
                ) : (
                  <ul className="mt-1 space-y-1">
                    {profile.academic.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-900 dark:text-white">{achievement}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;