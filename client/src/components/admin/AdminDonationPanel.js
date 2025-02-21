import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDonations, modifyDonation, removeDonation } from '../../features/admin/adminSlice';

import Modal from '../common/Modal';
import Pagination from '../common/Pagination';

const AdminDonationPanel = () => {
  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector(state => state.admin);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [formData, setFormData] = useState({
    status: 'pending',
    notes: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 10;

  useEffect(() => {
    dispatch(loadDonations());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyDonation({ 
      id: currentDonation.id, 
      ...formData 
    }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
      });
  };

  const openEditModal = (donation) => {
    setCurrentDonation(donation);
    setFormData({
      status: donation.status,
      notes: donation.notes || ''
    });
    setShowEditModal(true);
  };

  const handleDeleteDonation = (donationId) => {
    if (window.confirm('Are you sure you want to delete this donation record?')) {
      dispatch(removeDonation(donationId));
    }
  };

  // Pagination logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const statusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Donations Management</h2>
      </div>

      {error && <div className="bg-red-100 p-4 mb-4 text-red-700 rounded-md">{error}</div>}

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Donor</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDonations.map(donation => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{formatDate(donation.date)}</td>
                    <td className="py-3 px-4">
                      <div>{donation.donorName}</div>
                      <div className="text-sm text-gray-500">{donation.donorEmail}</div>
                    </td>
                    <td className="py-3 px-4">{formatCurrency(donation.amount)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusBadgeColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(donation)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteDonation(donation.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {donations.length > donationsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Edit Donation Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Update Donation Status">
        {currentDonation && (
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                placeholder="Add any relevant notes about this donation"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Donation'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminDonationPanel;