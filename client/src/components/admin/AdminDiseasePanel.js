// components/admin/AdminDiseasePanel.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDiseases, addDisease, modifyDisease, removeDisease } from '../../features/admin/adminSlice';

import Modal from '../common/Modal';
import Pagination from '../common/Pagination';

const AdminDiseasePanel = () => {
  const dispatch = useDispatch();
  const { diseases, loading, error } = useSelector(state => state.admin);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDisease, setCurrentDisease] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    symptoms: '',
    prevention: '',
    treatment: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const diseasesPerPage = 10;

  useEffect(() => {
    dispatch(loadDiseases());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(addDisease(formData))
      .unwrap()
      .then(() => {
        setShowCreateModal(false);
        setFormData({ name: '', description: '', symptoms: '', prevention: '', treatment: '' });
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyDisease({ 
      id: currentDisease.id, 
      ...formData 
    }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
      });
  };

  const openEditModal = (disease) => {
    setCurrentDisease(disease);
    setFormData(disease);
    setShowEditModal(true);
  };

  const handleDeleteDisease = (diseaseId) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      dispatch(removeDisease(diseaseId));
    }
  };

  // Pagination logic
  const indexOfLastDisease = currentPage * diseasesPerPage;
  const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
  const currentDiseases = diseases.slice(indexOfFirstDisease, indexOfLastDisease);
  const totalPages = Math.ceil(diseases.length / diseasesPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Disease Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Disease
        </button>
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
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDiseases.map(disease => (
                  <tr key={disease.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{disease.name}</td>
                    <td className="py-3 px-4">{disease.description.substring(0, 100)}...</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(disease)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDisease(disease.id)}
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

          {diseases.length > diseasesPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Create Disease Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Disease">
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Symptoms
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prevention
            </label>
            <textarea
              name="prevention"
              value={formData.prevention}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Treatment
            </label>
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Disease'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Disease Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Disease">
        {currentDisease && (
          <form onSubmit={handleEditSubmit}>
            {/* Same form fields as Create Modal */}
            {/* ... */}
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
                {loading ? 'Updating...' : 'Update Disease'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminDiseasePanel;