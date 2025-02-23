// src/pages/Admin/CommunityReviews.js
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import reviewService from '../../services/reviewService';

const CommunityReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getCommunityReviews(page);
        setReviews(data.reviews);
      } catch (err) {
        setError('Failed to load reviews');
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
      setError('Failed to approve review');
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await reviewService.rejectReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (err) {
      setError('Failed to reject review');
    }
  };

  if (loading) return <div className="p-4">Loading reviews...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Community Reviews</h1>
      
      <div className="grid gap-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{review.userName}</h3>
                  <p className="text-gray-600 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2">{review.content}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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