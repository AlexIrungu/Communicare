import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Modal from '../common/Modal';

// Placeholder for actual user slice actions
const { fetchUserProfile, updateUserProfile, updateHealthRecord } = require('../../features/auth/authSlice');

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, healthRecords, loading, error } = useSelector(state => state.auth);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingHealthRecord, setIsAddingHealthRecord] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredNotification: 'email'
  });
  
  const [newHealthRecord, setNewHealthRecord] = useState({
    condition: '',
    diagnosisDate: '',
    medication: '',
    notes: ''
  });
  
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        preferredNotification: user.preferredNotification || 'email'
      });
    }
  }, [user]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleHealthRecordChange = (e) => {
    const { name, value } = e.target;
    setNewHealthRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(profileData));
    setIsEditingProfile(false);
  };
  
  const handleHealthRecordSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHealthRecord(newHealthRecord));
    setIsAddingHealthRecord(false);
    setNewHealthRecord({
      condition: '',
      diagnosisDate: '',
      medication: '',
      notes: ''
    });
  };
  
  if (loading) return <LoadingSpinner />;
  
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Health Profile</h1>
      
      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setIsEditingProfile(true)}
          >
            Edit Profile
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{user?.address || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Preferred Notification</p>
              <p className="font-medium capitalize">{user?.preferredNotification || 'Email'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Health Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Health Records</CardTitle>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => setIsAddingHealthRecord(true)}
          >
            Add Health Record
          </button>
        </CardHeader>
        <CardContent>
          {healthRecords && healthRecords.length > 0 ? (
            <div className="space-y-4">
              {healthRecords.map((record, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{record.condition}</h3>
                    <span className="text-sm text-gray-500">
                      Diagnosed: {new Date(record.diagnosisDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Medication</p>
                    <p>{record.medication || 'None'}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p>{record.notes || 'No notes provided'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No health records found. Add your first record to track your health history.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Health Alerts Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Health Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="diseaseAlerts" 
                className="h-4 w-4"
                defaultChecked={user?.notifications?.diseaseAlerts}
              />
              <label htmlFor="diseaseAlerts">Disease outbreak alerts in my area</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="preventionTips" 
                className="h-4 w-4"
                defaultChecked={user?.notifications?.preventionTips}
              />
              <label htmlFor="preventionTips">Prevention tips and educational content</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="researchUpdates" 
                className="h-4 w-4"
                defaultChecked={user?.notifications?.researchUpdates}
              />
              <label htmlFor="researchUpdates">Research updates on diseases of interest</label>
            </div>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Save Preferences
          </button>
        </CardContent>
      </Card>
      
      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleProfileSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="preferredNotification" className="block text-sm font-medium text-gray-700">
                Preferred Notification Method
              </label>
              <select
                id="preferredNotification"
                name="preferredNotification"
                value={profileData.preferredNotification}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Add Health Record Modal */}
      <Modal
        isOpen={isAddingHealthRecord}
        onClose={() => setIsAddingHealthRecord(false)}
        title="Add Health Record"
      >
        <form onSubmit={handleHealthRecordSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Health Condition
              </label>
              <input
                type="text"
                id="condition"
                name="condition"
                value={newHealthRecord.condition}
                onChange={handleHealthRecordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="diagnosisDate" className="block text-sm font-medium text-gray-700">
                Date of Diagnosis
              </label>
              <input
                type="date"
                id="diagnosisDate"
                name="diagnosisDate"
                value={newHealthRecord.diagnosisDate}
                onChange={handleHealthRecordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
                Medication
              </label>
              <input
                type="text"
                id="medication"
                name="medication"
                value={newHealthRecord.medication}
                onChange={handleHealthRecordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={newHealthRecord.notes}
                onChange={handleHealthRecordChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddingHealthRecord(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;