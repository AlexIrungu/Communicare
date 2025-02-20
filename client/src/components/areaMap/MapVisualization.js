import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom marker icons based on risk level
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

const MapVisualization = ({ areas, selectedDisease }) => {
  return (
    <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
      <MapContainer center={[0, 0]} zoom={2} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {areas.map((area) => (
          <Marker 
            key={area.id} 
            position={[area.latitude, area.longitude]} 
            icon={getMarkerIcon(area.riskLevel)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="text-lg font-bold">{area.name}</h3>
                <p className="text-sm text-gray-600">Risk Level: {area.riskLevel}</p>
                <p className="text-sm text-gray-600">
                  Diseases: {area.diseases.map((d) => d.name).join(', ')}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapVisualization;
