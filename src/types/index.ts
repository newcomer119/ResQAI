export interface Disaster {
  id: string;
  type: 'earthquake' | 'flood' | 'hurricane' | 'wildfire' | 'tornado';
  severity: 1 | 2 | 3 | 4 | 5;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  status: 'active' | 'contained' | 'resolved';
  description: string;
  affectedArea: number; // in square kilometers
}

export interface EmergencyRequest {
  id: string;
  userId: string;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'acknowledged' | 'inProgress' | 'resolved';
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ReliefCenter {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  capacity: number;
  currentOccupancy: number;
  supplies: {
    water: number;
    food: number;
    medical: number;
    shelter: number;
  };
  status: 'operational' | 'full' | 'closed';
}