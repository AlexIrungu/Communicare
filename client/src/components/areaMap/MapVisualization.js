import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const getMarkerIcon = (riskLevel) => {
  const colors = {
    high: 'red',
    medium: 'orange',
    low: 'green',
  };
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${colors[riskLevel] || 'blue'}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// Helper function to validate coordinates
const isValidCoordinates = (lat, lng) => {
  return typeof lat === 'number' && 
         typeof lng === 'number' && 
         !isNaN(lat) && 
         !isNaN(lng) && 
         lat >= -90 && 
         lat <= 90 && 
         lng >= -180 && 
         lng <= 180;
};

const MapVisualization = ({ areas = [], selectedDisease }) => {
  if (!Array.isArray(areas)) {
    return (
      <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading map data...</p>
      </div>
    );
  }

  // Filter out areas with invalid coordinates
  const validAreas = areas.filter(area => 
    isValidCoordinates(Number(area.latitude), Number(area.longitude))
  );
  console.log("Areas passed to MapVisualization:", areas);
  console.log("Map markers data:", areas.map(area => ({ name: area.name, lat: area.lat, lng: area.lng })));



  return (
    <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validAreas.map((area) => {
          const lat = Number(area.latitude);
          const lng = Number(area.longitude);
          
          return (
            <Marker 
              key={area.id || `${lat}-${lng}`}
              position={[lat, lng]}
              icon={getMarkerIcon(area.riskLevel)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="text-lg font-bold">{area.name}</h3>
                  <p className="text-sm text-gray-600">Risk Level: {area.riskLevel}</p>
                  <p className="text-sm text-gray-600">
                    Diseases: {Array.isArray(area.diseases) ? area.diseases.map(d => d.name).join(', ') : 'None reported'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {lat.toFixed(4)}, {lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapVisualization;