import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForums, fetchPosts } from '../../features/forums/forumsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Pagination from '../common/Pagination';
import { MessageSquare, Users, Clock } from 'lucide-react';

const CommunityForums = () => {
  const dispatch = useDispatch();
  const [selectedForum, setSelectedForum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { forums, posts, status, error } = useSelector((state) => state.forums);
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchForums());
  }, [dispatch]);
  
  useEffect(() => {
    if (selectedForum) {
      dispatch(fetchPosts(selectedForum));
    }
  }, [dispatch, selectedForum]);
  
  // Pagination logic for posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  
  const handleSelectForum = (forumId) => {
    setSelectedForum(forumId);
    setCurrentPage(1);
  };
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Forums</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {forums.map(forum => (
                <li key={forum.id}>
                  <button
                    onClick={() => handleSelectForum(forum.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                      selectedForum === forum.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="font-medium">{forum.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MessageSquare size={12} />
                      <span>{forum.postsCount} posts</span>
                      <span className="mx-1">•</span>
                      <Users size={12} />
                      <span>{forum.membersCount} members</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-3">
        {selectedForum ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{forums.find(f => f.id === selectedForum)?.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {forums.find(f => f.id === selectedForum)?.description}
                </p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => {/* Handle new post creation */}}
              >
                New Post
              </button>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No posts in this forum yet.</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {/* Handle new post creation */}}
                  >
                    Create the first post
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {currentPosts.map(post => (
                    <div key={post.id} className="py-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{post.title}</h3>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3">{post.content.substring(0, 150)}...</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare size={16} className="text-gray-400" />
                            <span>{post.commentsCount} comments</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} className="text-gray-400" />
                            <span>{post.viewsCount} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={16} />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()} by {post.author.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a forum to view posts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityForums;