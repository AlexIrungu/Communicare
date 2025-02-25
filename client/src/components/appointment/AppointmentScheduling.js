// AppointmentScheduling.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Clock, User, MapPin, Phone, Mail, Check, X } from 'lucide-react';

// Main component for appointment scheduling
const AppointmentScheduling = () => {
  const [step, setStep] = useState(1);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    notes: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to get providers
    setProviders([
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', image: '/api/placeholder/80/80' },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiologist', image: '/api/placeholder/80/80' },
      { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', image: '/api/placeholder/80/80' },
      { id: 4, name: 'Dr. David Kim', specialty: 'Dermatologist', image: '/api/placeholder/80/80' }
    ]);
  }, []);

  // Generate available times based on selected date
  useEffect(() => {
    if (selectedDate && selectedProvider) {
      // In a real app, this would be an API call to get available slots
      const times = [];
      // Generate some mock time slots
      const startHour = 9;
      const endHour = 17;
      for (let i = startHour; i < endHour; i++) {
        // Add top of the hour
        if (Math.random() > 0.3) { // randomly make some slots unavailable
          times.push(`${i}:00`);
        }
        // Add half past the hour
        if (Math.random() > 0.3) {
          times.push(`${i}:30`);
        }
      }
      setAvailableTimes(times.sort());
    }
  }, [selectedDate, selectedProvider]);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to book appointment
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmationMessage('Your appointment has been scheduled successfully!');
      setStep(5);
    }, 1500);
  };

  const handleReschedule = () => {
    setStep(1);
    setSelectedProvider(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmationMessage('');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select a Healthcare Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.map(provider => (
                <div 
                  key={provider.id}
                  className="border rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleProviderSelect(provider)}
                >
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{provider.name}</h3>
                    <p className="text-gray-500">{provider.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <button 
              onClick={() => setStep(1)} 
              className="text-blue-500 flex items-center"
            >
              &larr; Back to providers
            </button>
            
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={selectedProvider.image} 
                alt={selectedProvider.name} 
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{selectedProvider.name}</h2>
                <p className="text-gray-500">{selectedProvider.specialty}</p>
              </div>
            </div>
            
            <h3 className="font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Select Date
            </h3>
            <div className="bg-white p-4 rounded-lg shadow">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateSelect}
                minDate={new Date()}
                inline
                className="w-full"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <button 
              onClick={() => setStep(2)} 
              className="text-blue-500 flex items-center"
            >
              &larr; Back to calendar
            </button>
            
            <div className="flex items-center space-x-4 mb-2">
              <img 
                src={selectedProvider.image} 
                alt={selectedProvider.name} 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{selectedProvider.name}</h2>
                <p className="text-gray-500 text-sm">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            
            <h3 className="font-medium flex items-center">
              <Clock className="mr-2 h-5 w-5" /> Select Available Time
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="py-2 px-4 border rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {time}
                </button>
              ))}
            </div>
            
            {availableTimes.length === 0 && (
              <p className="text-center py-4 text-gray-500">No available times for this date. Please select another date.</p>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <button 
              onClick={() => setStep(3)} 
              className="text-blue-500 flex items-center"
            >
              &larr; Back to time selection
            </button>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Appointment Summary</h3>
              <p className="flex items-center mb-1">
                <User className="h-4 w-4 mr-2" /> {selectedProvider.name}
              </p>
              <p className="flex items-center mb-1">
                <Calendar className="h-4 w-4 mr-2" /> 
                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> {selectedTime}
              </p>
            </div>
            
            <h3 className="font-medium">Personal Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={appointmentDetails.firstName}
                    onChange={handleDetailsChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={appointmentDetails.lastName}
                    onChange={handleDetailsChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={appointmentDetails.email}
                    onChange={handleDetailsChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={appointmentDetails.phone}
                    onChange={handleDetailsChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Visit</label>
                <select
                  name="reason"
                  value={appointmentDetails.reason}
                  onChange={handleDetailsChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a reason</option>
                  <option value="check-up">Routine Check-up</option>
                  <option value="illness">Illness or Injury</option>
                  <option value="follow-up">Follow-up Visit</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Additional Notes</label>
                <textarea
                  name="notes"
                  value={appointmentDetails.notes}
                  onChange={handleDetailsChange}
                  rows="3"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center space-y-6 py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold">{confirmationMessage}</h2>
            <div className="bg-blue-50 p-4 rounded-lg inline-block text-left">
              <p className="font-medium mb-2">Appointment Details:</p>
              <p className="mb-1"><span className="font-medium">Provider:</span> {selectedProvider.name}</p>
              <p className="mb-1"><span className="font-medium">Date:</span> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="mb-1"><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Patient:</span> {appointmentDetails.firstName} {appointmentDetails.lastName}</p>
            </div>
            <div className="pt-4">
              <p className="text-gray-500 mb-4">A confirmation email has been sent to {appointmentDetails.email}</p>
              <button
                onClick={handleReschedule}
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
              >
                Schedule Another Appointment
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {step < 5 && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>4</div>
            </div>
          </div>
        )}
        
        {renderStep()}
      </div>
    </div>
  );
};

export default AppointmentScheduling;