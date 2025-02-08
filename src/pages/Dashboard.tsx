import { useState } from 'react';
import { AlertCircle, Shield, Users, ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Disaster } from '../types';
import { Link } from 'react-router-dom';
import DisasterMap from '../components/DisasterMap';

const HERO_SLIDES = [
  {
    title: "AI-Powered Disaster Response",
    description: "Real-time disaster prediction and response using advanced machine learning algorithms.",
    gradient: "from-blue-600 to-blue-800",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "24/7 Emergency Response Network",
    description: "Coordinated relief efforts with real-time tracking and instant emergency alerts.",
    gradient: "from-purple-600 to-purple-800",
    image: "https://images.unsplash.com/photo-1498354178607-a79df2916198?auto=format&fit=crop&w=2000&q=80"
  },
  {
    title: "Empowering Communities in Crisis",
    description: "Advanced technology meeting humanitarian needs with precision and speed.",
    gradient: "from-red-600 to-red-800",
    image: "https://images.unsplash.com/photo-1542883339-c3d90402d6ae?auto=format&fit=crop&w=2000&q=80"
  }
];

const MOCK_DISASTERS: Disaster[] = [
  {
    id: '1',
    type: 'earthquake',
    severity: 4,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Los Angeles, CA'
    },
    timestamp: new Date().toISOString(),
    status: 'active',
    description: 'Magnitude 6.2 earthquake',
    affectedArea: 100
  },
];

export default function Dashboard() {
  const [disasters] = useState<Disaster[]>(MOCK_DISASTERS);
  const [selectedDisaster, setSelectedDisaster] = useState<Disaster | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative -mt-8 h-[600px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-75`}></div>
            </div>
            <div className="relative h-full flex items-center">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6 text-white opacity-0 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 max-w-2xl text-white opacity-0 animate-fadeIn animation-delay-200">
                  {slide.description}
                </p>
                <div className="flex space-x-4 opacity-0 animate-fadeIn animation-delay-400">
                  <Link to="/emergency" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center">
                    Report Emergency <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link to="/relief-centers" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold">
                    Find Relief Centers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-gray-600">AI Monitoring</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">50,000+</p>
                <p className="text-gray-600">People Assisted</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-gray-600">Prediction Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Monitoring Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Disaster Monitoring</h2>
            <p className="text-gray-600">Real-time prediction and tracking using machine learning</p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <span className="text-red-800 font-semibold">Active Disasters: {disasters.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Current Alerts</h3>
            <div className="space-y-3">
              {disasters.map(disaster => (
                <div 
                  key={disaster.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedDisaster(disaster)}
                >
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}</p>
                    <p className="text-sm text-gray-600">{disaster.location.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <DisasterMap
              disasters={disasters}
              onDisasterSelect={setSelectedDisaster}
            />
          </div>
        </div>
      </div>
    </div>
  );
}