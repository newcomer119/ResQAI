import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertTriangle } from 'lucide-react';
import type { Disaster } from '../types';
import { analyzeTweet, predictDisasterProbability } from '../services/huggingface';
import toast from 'react-hot-toast';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock tweets for demonstration
const MOCK_TWEETS = [
  {
    id: 1,
    text: "Major flooding reported in downtown area, multiple streets closed #disaster",
    location: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 2,
    text: "Seeing smoke from possible wildfire in the hills #emergency",
    location: { lat: 34.0689, lng: -118.4452 }
  }
];

interface DisasterMapProps {
  disasters: Disaster[];
  onDisasterSelect: (disaster: Disaster) => void;
}

interface PredictionResult {
  id: number;
  text: string;
  location: { lat: number; lng: number };
  prediction: {
    label: string;
    score: number;
    isDisaster: boolean;
  } | null;
  sentiment: any;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function DisasterMap({ disasters, onDisasterSelect }: DisasterMapProps) {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeTweets = async () => {
      try {
        const results = await Promise.all(
          MOCK_TWEETS.map(async (tweet) => {
            try {
              const [prediction, sentiment] = await Promise.all([
                predictDisasterProbability(tweet.text),
                analyzeTweet(tweet.text)
              ]);
              return {
                ...tweet,
                prediction,
                sentiment
              };
            } catch (error) {
              console.error(`Error processing tweet ${tweet.id}:`, error);
              return {
                ...tweet,
                prediction: null,
                sentiment: null
              };
            }
          })
        );
        setPredictions(results);
      } catch (error) {
        console.error('Error analyzing tweets:', error);
        toast.error('Failed to analyze some disaster predictions');
      } finally {
        setLoading(false);
      }
    };

    analyzeTweets();
  }, []);

  const customIcon = new L.DivIcon({
    className: 'custom-icon',
    html: `<div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
           </div>`
  });

  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden">
      <MapContainer
        center={[34.0522, -118.2437]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Actual Disasters */}
        {disasters.map(disaster => (
          <Marker
            key={disaster.id}
            position={[disaster.location.lat, disaster.location.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onDisasterSelect(disaster)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{disaster.type}</h3>
                <p className="text-sm">{disaster.description}</p>
                <p className="text-sm text-gray-600">Severity: {disaster.severity}/5</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* AI Predictions from Tweets */}
        {!loading && predictions.map((pred) => pred.prediction && (
          <Marker
            key={pred.id}
            position={[pred.location.lat, pred.location.lng]}
            icon={new L.DivIcon({
              className: 'custom-icon',
              html: `<div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                     </div>`
            })}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold">AI Prediction</h3>
                <p className="text-sm mt-1">{pred.text}</p>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-600">Disaster Probability:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(pred.prediction?.score || 0) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1">
                    {Math.round((pred.prediction?.score || 0) * 100)}% confidence
                  </p>
                </div>
                <p className="text-xs mt-2 text-gray-600">
                  Sentiment: {pred.sentiment?.[0]?.label || 'N/A'}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* AI Analysis Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
        <h4 className="font-semibold mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span className="text-sm">Confirmed Disasters</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <span className="text-sm">AI Predictions</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="text-lg font-semibold">Analyzing disaster data...</div>
        </div>
      )}
    </div>
  );
}