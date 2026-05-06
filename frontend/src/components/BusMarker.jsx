import React, { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Bus } from 'lucide-react';
import { renderToString } from 'react-dom/server';

const busIcon = L.divIcon({
  html: renderToString(<div className="bg-yellow-400 p-2 rounded-full shadow-lg border-2 border-black transform -rotate-90"><Bus size={20} color="black" fill="black" /></div>),
  className: 'bus-marker',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const BusMarker = ({ path, isAnimating, onComplete }) => {
  const [position, setPosition] = useState(null);
  const [index, setIndex] = useState(0);
  const map = useMap();

  useEffect(() => {
    if (path && path.length > 0) {
      setPosition([path[0].lat, path[0].lng]);
      setIndex(0);
    }
  }, [path]);

  useEffect(() => {
    if (isAnimating && path && index < path.length - 1) {
      const timer = setTimeout(() => {
        const nextIndex = index + 1;
        const nextPoint = path[nextIndex];
        setPosition([nextPoint.lat, nextPoint.lng]);
        setIndex(nextIndex);
        
        if (nextIndex === path.length - 1) {
          onComplete && onComplete();
        }
      }, 1000); // 1 second per hop for demo
      return () => clearTimeout(timer);
    }
  }, [isAnimating, index, path]);

  if (!position) return null;

  return (
    <Marker position={position} icon={busIcon} zIndexOffset={1000} />
  );
};

export default BusMarker;
