import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const riskLevelColors = {
  high: 'red',
  medium: 'orange',
  low: 'green'
};

// Create icons object to cache icons
const icons = {};

const getMarkerIcon = (riskLevel) => {
  const color = riskLevelColors[riskLevel] || 'blue';
  
  // Return cached icon if it exists
  if (icons[color]) {
    return icons[color];
  }

  // Create and cache new icon
  icons[color] = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return icons[color];
};

const isValidCoordinates = (lat, lng) => {
  const numLat = Number(lat);
  const numLng = Number(lng);
  
  return !isNaN(numLat) && 
         !isNaN(numLng) && 
         numLat >= -90 && 
         numLat <= 90 && 
         numLng >= -180 && 
         numLng <= 180;
};

const MapVisualization = ({ areas = [], selectedDisease }) => {
  useEffect(() => {
    console.log("Areas data received:", areas);
  }, [areas]);

  if (!Array.isArray(areas)) {
    console.warn("Invalid areas data received:", areas);
    return (
      <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading map data...</p>
      </div>
    );
  }

  // Filter and validate areas
  const validAreas = areas.filter(area => {
    const isValid = area && 
                   isValidCoordinates(area.latitude, area.longitude);
    if (!isValid) {
      console.warn("Invalid area data:", area);
    }
    return isValid;
  });

  console.log("Valid areas for mapping:", validAreas);

  // Calculate map center based on valid areas
  const defaultCenter = [1.2921, 36.8219]; // Kenya coordinates
  const mapCenter = validAreas.length > 0 
    ? [
        validAreas.reduce((sum, area) => sum + Number(area.latitude), 0) / validAreas.length,
        validAreas.reduce((sum, area) => sum + Number(area.longitude), 0) / validAreas.length
      ]
    : defaultCenter;

  return (
    <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
      <MapContainer 
        center={mapCenter}
        zoom={6}
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
                  <p className="text-sm text-gray-600">
                    Risk Level: <span className={`font-semibold ${
                      area.riskLevel === 'high' ? 'text-red-600' :
                      area.riskLevel === 'medium' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>{area.riskLevel}</span>
                  </p>
                  {area.diseases && area.diseases.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Diseases: {area.diseases.map(d => d.name).join(', ')}
                    </p>
                  )}
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