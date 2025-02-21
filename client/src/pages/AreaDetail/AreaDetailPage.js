import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaById } from "../../features/areas/areasSlice";
import { fetchReviews } from "../../features/reviews/reviewsSlice";


const StatCard = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="border p-4 rounded-lg shadow-sm my-2">
    <h3 className="font-bold">{review.user.name}</h3>
    <p>{review.content}</p>
    <span className="text-gray-500 text-sm">
      Posted on: {new Date(review.createdAt).toLocaleDateString()}
    </span>
  </div>
);

const AreaDetailPage = () => {
  const { areaId } = useParams();
  const dispatch = useDispatch();
  const { currentArea, loading, error } = useSelector((state) => state.areas);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (areaId) {
      dispatch(fetchAreaById(areaId));
      dispatch(fetchReviews()); // Fetch all reviews
    }
  }, [areaId, dispatch]);
  

  if (loading) return <div className="text-center">Loading area details...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!currentArea) return <div className="text-center">Area not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{currentArea.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Population Affected" value={currentArea.populationAffected?.toLocaleString()} />
        <StatCard title="Risk Level" value={currentArea.riskLevel} />
        <StatCard title="Current Cases" value={currentArea.currentCases?.toLocaleString()} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About this Area</h2>
        <p>{currentArea.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Prevalent Diseases</h2>
        <ul className="list-disc pl-5">
          {currentArea.diseases?.map((disease) => (
            <li key={disease.id}>
              <h3 className="font-bold">{disease.name}</h3>
              <p>Severity: {disease.severity}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Community Reviews & Help Offers</h2>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p className="text-red-500">{reviewsError}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p>No reviews yet. Be the first to offer help!</p>
        )}
      </div>
    </div>
  );
};

export default AreaDetailPage;
