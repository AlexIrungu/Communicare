// src/components/educational/EducationalResourceList.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../../features/resources/resourcesSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Pagination from '../common/Pagination';
import { FileText, Video, Link as LinkIcon, Download } from 'lucide-react';

const ResourceTypeIcon = ({ type }) => {
  switch (type) {
    case 'article':
      return <FileText size={20} className="text-blue-500" />;
    case 'video':
      return <Video size={20} className="text-red-500" />;
    case 'link':
      return <LinkIcon size={20} className="text-green-500" />;
    case 'pdf':
      return <Download size={20} className="text-orange-500" />;
    default:
      return <FileText size={20} />;
  }
};

const EducationalResourceList = ({ diseaseId }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const itemsPerPage = 6;
  
  const { resources, status, error } = useSelector((state) => state.resources);
  
  useEffect(() => {
    dispatch(fetchResources(diseaseId));
  }, [dispatch, diseaseId]);
  
  // Filter resources based on selected type
  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);
    
  // Pagination logic
  const indexOfLastResource = currentPage * itemsPerPage;
  const indexOfFirstResource = indexOfLastResource - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  // With this:
if (status === 'failed') {
    // Extract a meaningful error message
    let errorMessage = 'Failed to load resources. Please try again later.';
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      errorMessage = error.errors[0];
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    
    return <ErrorMessage message={errorMessage} />;
  }
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Educational Resources</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'article' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setFilter('link')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'link' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            External Links
          </button>
          <button
            onClick={() => setFilter('pdf')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Downloadable PDFs
          </button>
        </div>
      </div>
      
      {currentResources.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No resources found for the selected criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentResources.map(resource => (
            <Card key={resource.id} className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ResourceTypeIcon type={resource.type} />
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <div className="mt-auto">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    {resource.type === 'pdf' ? 'Download PDF' : 'View Resource'}
                    <span className="text-xs">↗</span>
                  </a>
                </div>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>Added: {new Date(resource.createdAt).toLocaleDateString()}</span>
                  <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default EducationalResourceList;