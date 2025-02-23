// src/pages/Admin/HealthAlerts.js
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import reviewService from '../../services/reviewService';

const HealthAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await reviewService.getHealthAlerts();
        setAlerts(data.alerts);
      } catch (err) {
        setError('Failed to load health alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <div className="p-4">Loading health alerts...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Health Alerts</h1>
      
      <div className="grid gap-4">
        {alerts.map(alert => (
          <Alert key={alert.id} variant={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>
              <div className="mt-2">
                <p>{alert.description}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <span>Region: {alert.region}</span>
                  <span className="ml-4">Date: {new Date(alert.date).toLocaleDateString()}</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default HealthAlerts;