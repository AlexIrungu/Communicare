// src/components/notifications/NotificationCenter.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlerts, markAlertAsRead } from '../../features/alerts/alertsSlice';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const NotificationCenter = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();
  const { alerts, status, error } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (status === 'idle' && user) {
      dispatch(fetchAlerts(user.id));
    }
  }, [status, dispatch, user]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = (alertId) => {
    dispatch(markAlertAsRead(alertId));
  };

  const getUnreadCount = () => {
    return alerts.filter(alert => !alert.read).length;
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleNotifications}
        className="flex items-center p-2 rounded-full hover:bg-gray-100"
      >
        <Bell size={24} />
        {getUnreadCount() > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {getUnreadCount()}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {status === 'loading' && <LoadingSpinner />}
              {status === 'failed' && <ErrorMessage message={error} />}
              
              {status === 'succeeded' && (
                <>
                  {alerts.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No notifications</p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {alerts.map((alert) => (
                        <li 
                          key={alert.id} 
                          className={`py-3 ${!alert.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{alert.title}</h3>
                              <p className="text-sm text-gray-600">{alert.message}</p>
                              <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleString()}</span>
                            </div>
                            {!alert.read && (
                              <button 
                                onClick={() => handleMarkAsRead(alert.id)}
                                className="text-xs text-blue-500 hover:text-blue-700"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;