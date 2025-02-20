import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedDiseases } from '../../features/diseases/diseasesSlice';
import { fetchHighRiskAreas } from '../../features/areas/areasSlice';
import { fetchRecentDonations } from '../../features/donations/donationsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
 
  const { featuredDiseases = [], loading: diseasesLoading, error: diseasesError } = useSelector(state => state.diseases || {});
  const { highRiskAreas = [], loading: areasLoading, error: areasError } = useSelector(state => state.areas || {});
  const { recentDonations = [], loading: donationsLoading, error: donationsError } = useSelector(state => state.donations || {});

  useEffect(() => {
    dispatch(fetchFeaturedDiseases());
    dispatch(fetchHighRiskAreas());
    dispatch(fetchRecentDonations());
  }, [dispatch]);

  // Add error handling in your JSX
  if (diseasesError || areasError || donationsError) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  if (diseasesLoading || areasLoading || donationsLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Fighting Communicable Diseases Together</h1>
        <p className="text-lg mb-6">Join our mission to prevent, control, and eradicate communicable diseases worldwide.</p>
        <div className="space-x-4">
          <Link to="/donate" className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold shadow-md">Donate Now</Link>
          <Link to="/disease-list" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-md">Learn More</Link>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Diseases Tracked", value: "50+" },
          { label: "Affected Areas", value: "100+" },
          { label: "Donations Received", value: "$2M+" },
          { label: "Lives Improved", value: "500k+" }
        ].map(stat => (
          <div key={stat.label} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-3xl font-bold text-teal-600">{stat.value}</h3>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Diseases */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Priority Communicable Diseases</h2>
          <Link to="/disease-list" className="text-teal-600 hover:underline">View All</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredDiseases?.map(disease => (
            <div key={disease.id} className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold">{disease.name}</h3>
              <p className="text-gray-500">Severity: {disease.severity}</p>
              <p className="mt-2 text-gray-700">{disease.shortDescription}</p>
              <Link to={`/disease/${disease.id}`} className="text-teal-600 mt-4 block hover:underline">Learn More</Link>
            </div>
          ))}
        </div>
      </section>

      {/* High-Risk Areas */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">High-Risk Areas</h2>
          <Link to="/area-list" className="text-teal-600 hover:underline">View All Areas</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {highRiskAreas?.map(area => (
            <div key={area.id} className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold">{area.name}</h3>
              <p className="text-gray-500">Population Affected: {area.populationAffected?.toLocaleString()}</p>
              <div className="mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">
                {area.riskLevel} Risk
              </div>
              <Link to={`/area/${area.id}`} className="text-teal-600 mt-4 block hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Map */}
      <section className="text-center bg-gray-100 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Interactive Disease Map</h2>
        <p className="text-gray-700">Explore our interactive map to see the global impact of communicable diseases.</p>
        <Link to="/map-view" className="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold mt-4 inline-block shadow-md">Open Interactive Map</Link>
      </section>

      {/* Recent Donations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Contributions</h2>
        <div className="space-y-4">
          {recentDonations.slice(0, 5).map((donation, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 font-medium">{donation.isAnonymous ? 'Anonymous Donor' : donation.donor}</span>
              <span className="text-teal-600 font-bold">${donation.amount}</span>
              <span className="text-gray-500">to {donation.areaName}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-700">Your contribution can make a difference</p>
          <Link to="/donate" className="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-md mt-4 inline-block">Donate Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;