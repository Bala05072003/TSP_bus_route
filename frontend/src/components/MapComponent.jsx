import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { School, Home } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import BusMarker from './BusMarker';

const schoolIcon = L.divIcon({
  html: renderToString(<div className="bg-red-500 p-2 rounded-full shadow-glow border-2 border-white"><School size={24} color="white" /></div>),
  className: 'custom-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const houseIcon = L.divIcon({
  html: renderToString(<div className="bg-violet-600 p-2 rounded-lg shadow-lg border-2 border-white"><Home size={18} color="white" /></div>),
  className: 'custom-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const MapComponent = ({ school, houses, optimizedPath, isAnimating, onMapClick, onAnimationComplete }) => {
  const center = [school.lat, school.lng];

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true} className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapEvents onMapClick={onMapClick} />

      <Marker position={[school.lat, school.lng]} icon={schoolIcon}>
        <Popup>Central School Hub</Popup>
      </Marker>

      {houses.map((house, idx) => (
        <Marker key={idx} position={[house.lat, house.lng]} icon={houseIcon}>
          <Popup>{house.name}</Popup>
        </Marker>
      ))}

      {optimizedPath.length > 0 && (
        <Polyline 
          positions={optimizedPath.map(p => [p.lat, p.lng])} 
          color="#3b82f6" 
          weight={5} 
          opacity={0.7}
          dashArray={isAnimating ? "10, 10" : null}
          className="route-glow"
        />
      )}

      {optimizedPath.length > 0 && (
        <BusMarker 
          path={optimizedPath} 
          isAnimating={isAnimating} 
          onComplete={onAnimationComplete} 
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
