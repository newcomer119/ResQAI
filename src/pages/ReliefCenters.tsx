import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Package } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ReliefCenter } from '../types';

const MOCK_RELIEF_CENTERS: ReliefCenter[] = [
  {
    id: '1',
    name: 'Central Relief Station',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Los Angeles Convention Center'
    },
    capacity: 1000,
    currentOccupancy: 450,
    supplies: {
      water: 75,
      food: 60,
      medical: 85,
      shelter: 70
    },
    status: 'operational'
  },
  // Add more mock data as needed
];

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ReliefCenters() {
  const [centers] = useState<ReliefCenter[]>(MOCK_RELIEF_CENTERS);
  const [selectedCenter, setSelectedCenter] = useState<ReliefCenter | null>(null);

  const customIcon = (status: string) => new L.DivIcon({
    className: 'custom-icon',
    html: `<div class="w-6 h-6 ${
      status === 'operational' ? 'bg-green-500' :
      status === 'full' ? 'bg-yellow-500' :
      'bg-red-500'
    } rounded-full flex items-center justify-center text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>`
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relief Centers</h1>
        <div className="flex space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <span className="text-green-800 font-semibold">
              Active Centers: {centers.filter(c => c.status === 'operational').length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          {centers.map(center => (
            <div
              key={center.id}
              className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCenter(center)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{center.name}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  center.status === 'operational' ? 'bg-green-100 text-green-800' :
                  center.status === 'full' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {center.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{center.location.address}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-600">Capacity</p>
                  <p className="font-medium">{center.currentOccupancy}/{center.capacity}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-600">Supply Level</p>
                  <div className="flex space-x-1">
                    {Object.entries(center.supplies).map(([key, value]) => (
                      <div
                        key={key}
                        className="w-2 h-6 bg-gray-200 rounded-sm overflow-hidden"
                      >
                        <div
                          className="bg-blue-500 transition-all"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-sm" style={{ height: '600px' }}>
            <MapContainer
              center={[34.0522, -118.2437]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {centers.map(center => (
                <Marker
                  key={center.id}
                  position={[center.location.lat, center.location.lng]}
                  icon={customIcon(center.status)}
                  eventHandlers={{
                    click: () => setSelectedCenter(center)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{center.name}</h3>
                      <p className="text-sm">{center.location.address}</p>
                      <div className="mt-2">
                        <p className="text-sm">Occupancy: {center.currentOccupancy}/{center.capacity}</p>
                        <div className="mt-1">
                          <p className="text-sm font-medium">Supply Levels:</p>
                          <div className="grid grid-cols-4 gap-1 mt-1">
                            {Object.entries(center.supplies).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <p className="text-xs capitalize">{key}</p>
                                <p className="text-sm font-medium">{value}%</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}