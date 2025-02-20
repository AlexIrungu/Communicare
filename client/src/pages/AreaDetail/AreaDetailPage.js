// pages/AreaDetail/AreaDetailPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreaById } from '../../features/areas/areasSlice';
import { fetchReviewsByArea } from '../../features/reviews/reviewsSlice';

const AreaDetailPage = () => {
  const { areaId } = useParams();
  const dispatch = useDispatch();
  const { currentArea, loading } = useSelector(state => state.areas);
  const { reviews } = useSelector(state => state.reviews);

  useEffect(() => {
    if (areaId) {
      dispatch(fetchAreaById(areaId));
      dispatch(fetchReviewsByArea(areaId));
    }
  }, [areaId, dispatch]);

  if (loading) return <div>Loading area details...</div>;
  if (!currentArea) return <div>Area not found</div>;

  return (
    <div className="area-detail-container">
      <h1>{currentArea.name}</h1>
      <div className="area-stats">
        <div className="stat-card">
          <h3>Population Affected</h3>
          <p>{currentArea.populationAffected?.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Risk Level</h3>
          <p>{currentArea.riskLevel}</p>
        </div>
        <div className="stat-card">
          <h3>Current Cases</h3>
          <p>{currentArea.currentCases?.toLocaleString()}</p>
        </div>
      </div>

      <div className="area-description">
        <h2>About this Area</h2>
        <p>{currentArea.description}</p>
      </div>
      
      <div className="prevalent-diseases">
        <h2>Prevalent Diseases</h2>
        <ul>
          {currentArea.diseases?.map(disease => (
            <li key={disease.id}>
              <h3>{disease.name}</h3>
              <p>Severity: {disease.severity}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="community-reviews">
        <h2>Community Reviews & Help Offers</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <h3>{review.user.name}</h3>
              <p>{review.content}</p>
              <span>Posted on: {new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to offer help!</p>
        )}
      </div>
    </div>
  );
};

export default AreaDetailPage;