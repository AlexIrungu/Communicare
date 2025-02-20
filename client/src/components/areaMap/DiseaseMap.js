// components/areaMap/DiseaseMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAffectedAreas } from '../../features/areas/areasSlice';
import 'leaflet/dist/leaflet.css';
import LoadingSpinner from '../common/LoadingSpinner';

// Fix for Leaflet icon issue in React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DiseaseMap = ({ diseaseId }) => {
  const dispatch = useDispatch();
  const { affectedAreas, loading } = useSelector((state) => state.areas);
  const [mapCenter, setMapCenter] = useState([20, 0]); // Default center
  const [mapZoom, setMapZoom] = useState(2); // Default zoom

  useEffect(() => {
    if (diseaseId) {
      dispatch(fetchAffectedAreas(diseaseId));
    } else {
      dispatch(fetchAffectedAreas());
    }
  }, [dispatch, diseaseId]);

  // Adjust map view based on loaded areas
  useEffect(() => {
    if (affectedAreas.length > 0) {
      // Calculate the average lat/long to center the map
      const avgLat = affectedAreas.reduce((sum, area) => sum + area.latitude, 0) / affectedAreas.length;
      const avgLng = affectedAreas.reduce((sum, area) => sum + area.longitude, 0) / affectedAreas.length;
      setMapCenter([avgLat, avgLng]);
      
      // Adjust zoom based on number of areas
      if (affectedAreas.length === 1) {
        setMapZoom(6);
      } else if (affectedAreas.length <= 5) {
        setMapZoom(4);
      } else {
        setMapZoom(2);
      }
    }
  }, [affectedAreas]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {affectedAreas.map((area) => (
          <React.Fragment key={area.id}>
            {/* Area marker */}
            <Marker position={[area.latitude, area.longitude]}>
              <Popup>
                <div>
                  <h3 className="font-bold">{area.name}</h3>
                  <p className="text-sm">
                    Cases: {area.cases_count.toLocaleString()}
                  </p>
                  <a 
                    href={`/areas/${area.id}`} 
                    className="text-blue-600 hover:underline text-sm block mt-2"
                  >
                    View details
                  </a>
                </div>
              </Popup>
            </Marker>
            
            {/* Heatmap-like visualization using circles */}
            <CircleMarker
              center={[area.latitude, area.longitude]}
              radius={Math.log(area.cases_count) * 5} // Scale circle by case count
              fillColor="#ff0000"
              color="#ff0000"
              weight={1}
              opacity={0.5}
              fillOpacity={0.2}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default DiseaseMap;