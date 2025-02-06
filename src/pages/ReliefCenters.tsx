import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin, Package } from 'lucide-react';
import type { ReliefCenter } from '../types';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

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

export default function ReliefCenters() {
  const [centers] = useState<ReliefCenter[]>(MOCK_RELIEF_CENTERS);
  const [selectedCenter, setSelectedCenter] = useState<ReliefCenter | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    zoom: 10
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
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/light-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              {centers.map(center => (
                <Marker
                  key={center.id}
                  latitude={center.location.lat}
                  longitude={center.location.lng}
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setSelectedCenter(center);
                  }}
                >
                  <MapPin className={`h-6 w-6 ${
                    center.status === 'operational' ? 'text-green-500' :
                    center.status === 'full' ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                </Marker>
              ))}

              {selectedCenter && (
                <Popup
                  latitude={selectedCenter.location.lat}
                  longitude={selectedCenter.location.lng}
                  onClose={() => setSelectedCenter(null)}
                  closeButton={true}
                >
                  <div className="p-2">
                    <h3 className="font-semibold">{selectedCenter.name}</h3>
                    <p className="text-sm">{selectedCenter.location.address}</p>
                    <div className="mt-2">
                      <p className="text-sm">Occupancy: {selectedCenter.currentOccupancy}/{selectedCenter.capacity}</p>
                      <div className="mt-1">
                        <p className="text-sm font-medium">Supply Levels:</p>
                        <div className="grid grid-cols-4 gap-1 mt-1">
                          {Object.entries(selectedCenter.supplies).map(([key, value]) => (
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
              )}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}