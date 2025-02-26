// Updated CommunityReviews.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import reviewService from '../../services/reviewService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const CommunityReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Attempting to fetch reviews for page:', page);
        setLoading(true);
        
        const data = await reviewService.getCommunityReviews(page);
        console.log('Reviews data received:', data);
        
        // Check if data has the expected structure
        if (data && data.reviews) {
          setReviews(data.reviews);
        } else {
          console.warn('Unexpected data structure:', data);
          setReviews(data || []); // Fallback
        }
        
        setError(null);
      } catch (err) {
        console.error('Error in fetchReviews:', err);
        setError(err.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  const handleApprove = async (reviewId) => {
    try {
      await reviewService.approveReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (err) {
      console.error('Error approving review:', err);
      setError('Failed to approve review: ' + err.message);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await reviewService.rejectReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (err) {
      console.error('Error rejecting review:', err);
      setError('Failed to reject review: ' + err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (reviews.length === 0) return <div className="p-4 text-center">No reviews available for moderation.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Community Reviews</h1>
      
      <div className="grid gap-4">
      {reviews.map((review, index) => (
  <Card key={review.id || index} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{review.userName || 'Anonymous'}</h3>
                  <p className="text-gray-600 text-sm">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Date unavailable'}
                  </p>
                  <p className="mt-2">{review.content}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityReviews;