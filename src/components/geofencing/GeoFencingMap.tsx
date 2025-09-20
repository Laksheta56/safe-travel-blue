import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoZone } from '@/pages/GeoFencing';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom user location icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

interface MapUpdaterProps {
  userLocation: [number, number];
}

// Component to update map view when user location changes
const MapUpdater: React.FC<MapUpdaterProps> = ({ userLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(userLocation, map.getZoom());
  }, [userLocation, map]);
  
  return null;
};

interface GeoFencingMapProps {
  userLocation: [number, number];
  geoZones: GeoZone[];
  enabled: boolean;
}

const GeoFencingMap: React.FC<GeoFencingMapProps> = ({ 
  userLocation, 
  geoZones, 
  enabled 
}) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater userLocation={userLocation} />
        
        {/* User location marker */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <strong>Your Location</strong>
              <br />
              <small>
                {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
              </small>
            </div>
          </Popup>
        </Marker>
        
        {/* Geofenced zones */}
        {enabled && geoZones.map((zone) => (
          <Circle
            key={zone.id}
            center={zone.center}
            radius={zone.radius}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: 0.2,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-sm mb-2">{zone.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{zone.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Risk Level:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    zone.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                    zone.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {zone.riskLevel}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Radius: {zone.radius}m
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      
      {/* Status overlay */}
      <div className="absolute top-2 right-2 z-[1000]">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          enabled 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {enabled ? 'Monitoring Active' : 'Monitoring Disabled'}
        </div>
      </div>
    </div>
  );
};

export default GeoFencingMap;