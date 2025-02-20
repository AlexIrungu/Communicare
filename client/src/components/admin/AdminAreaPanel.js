import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAreas, 
  createArea, 
  updateArea, 
  deleteArea 
} from '../../features/admin/adminSlice';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';

const AdminAreaPanel = () => {
  const dispatch = useDispatch();
  const { areas, loading, error } = useSelector(state => state.admin);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentArea, setCurrentArea] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    population: '',
    severity: 'low',
    status: 'active'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const areasPerPage = 10;

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(createArea(formData))
      .unwrap()
      .then(() => {
        setShowCreateModal(false);
        setFormData({
          name: '',
          description: '',
          population: '',
          severity: 'low',
          status: 'active'
        });
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateArea({ 
      id: currentArea.id, 
      ...formData 
    }))
      .unwrap()
      .then(() => {
        setShowEditModal(false);
      });
  };

  const openEditModal = (area) => {
    setCurrentArea(area);
    setFormData(area);
    setShowEditModal(true);
  };

  const handleDeleteArea = (areaId) => {
    if (window.confirm('Are you sure you want to delete this affected area?')) {
      dispatch(deleteArea(areaId));
    }
  };

  // Pagination logic
  const indexOfLastArea = currentPage * areasPerPage;
  const indexOfFirstArea = indexOfLastArea - areasPerPage;
  const currentAreas = areas.slice(indexOfFirstArea, indexOfLastArea);
  const totalPages = Math.ceil(areas.length / areasPerPage);

  const severityBadgeColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Affected Areas Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Area
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
                  <th className="py-3 px-4 text-left">Population</th>
                  <th className="py-3 px-4 text-left">Severity</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentAreas.map(area => (
                  <tr key={area.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{area.name}</td>
                    <td className="py-3 px-4">{area.population.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${severityBadgeColor(area.severity)}`}>
                        {area.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusBadgeColor(area.status)}`}>
                        {area.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(area)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area.id)}
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

          {areas.length > areasPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Create Area Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Affected Area">
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
              Population
            </label>
            <input
              type="number"
              name="population"
              value={formData.population}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Severity
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-6">
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
              <option value="active">Active</option>
              <option value="monitoring">Monitoring</option>
              <option value="resolved">Resolved</option>
            </select>
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
              {loading ? 'Adding...' : 'Add Area'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Area Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Affected Area">
        {currentArea && (
          <form onSubmit={handleEditSubmit}>
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
                Population
              </label>
              <input
                type="number"
                name="population"
                value={formData.population}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Severity
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-6">
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
                <option value="active">Active</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
              </select>
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
                {loading ? 'Updating...' : 'Update Area'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminAreaPanel;