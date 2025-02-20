// pages/Home/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedDiseases } from '../../features/diseases/diseasesSlice';
import { fetchHighRiskAreas } from '../../features/areas/areasSlice';
import { fetchRecentDonations } from '../../features/donations/donationsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredDiseases } = useSelector(state => state.diseases);
  const { highRiskAreas } = useSelector(state => state.areas);
  const { recentDonations } = useSelector(state => state.donations);

  useEffect(() => {
    dispatch(fetchFeaturedDiseases());
    dispatch(fetchHighRiskAreas());
    dispatch(fetchRecentDonations());
  }, [dispatch]);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Fighting Communicable Diseases Together</h1>
          <p>Join our mission to prevent, control, and eradicate communicable diseases worldwide.</p>
          <div className="hero-cta">
            <Link to="/donate" className="donate-btn">Donate Now</Link>
            <Link to="/disease-list" className="learn-btn">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="impact-stats">
        <div className="stat">
          <h3>50+</h3>
          <p>Diseases Tracked</p>
        </div>
        <div className="stat">
          <h3>100+</h3>
          <p>Affected Areas</p>
        </div>
        <div className="stat">
          <h3>$2M+</h3>
          <p>Donations Received</p>
        </div>
        <div className="stat">
          <h3>500k+</h3>
          <p>Lives Improved</p>
        </div>
      </section>

      <section className="featured-diseases">
        <div className="section-header">
          <h2>Priority Communicable Diseases</h2>
          <Link to="/disease-list">View All</Link>
        </div>
        <div className="disease-grid">
          {featuredDiseases.map(disease => (
            <div key={disease.id} className="disease-card">
              <h3>{disease.name}</h3>
              <p className="severity">Severity: {disease.severity}</p>
              <p className="description">{disease.shortDescription}</p>
              <Link to={`/disease/${disease.id}`} className="learn-more">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="high-risk-areas">
        <div className="section-header">
          <h2>High-Risk Areas</h2>
          <Link to="/area-list">View All Areas</Link>
        </div>
        <div className="area-grid">
          {highRiskAreas.map(area => (
            <div key={area.id} className="area-card">
              <h3>{area.name}</h3>
              <p className="population">Population Affected: {area.populationAffected?.toLocaleString()}</p>
              <div className="risk-indicator high">{area.riskLevel} Risk</div>
              <Link to={`/area/${area.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="map-preview">
        <div className="map-content">
          <h2>Interactive Disease Map</h2>
          <p>Explore our interactive map to see the global impact of communicable diseases.</p>
          <Link to="/map-view" className="view-map-btn">
            Open Interactive Map
          </Link>
        </div>
        <div className="map-thumbnail">
          {/* Map thumbnail placeholder */}
        </div>
      </section>

      <section className="recent-donations">
        <h2>Recent Contributions</h2>
        <div className="donation-list">
          {recentDonations.slice(0, 5).map((donation, index) => (
            <div key={index} className="donation-item">
              <span className="donor">
                {donation.isAnonymous ? 'Anonymous Donor' : donation.donor}
              </span>
              <span className="amount">${donation.amount}</span>
              <span className="area">to {donation.areaName}</span>
            </div>
          ))}
        </div>
        <div className="donation-cta">
          <p>Your contribution can make a difference</p>
          <Link to="/donate" className="donate-now-btn">
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;