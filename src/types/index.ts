export interface Vehicle {
  id: string;
  type: 'truck' | 'van';
  capacity: number;
  emissionRate: number; // CO2 emissions per km
}

export interface Route {
  id: string;
  startPoint: Location;
  endPoint: Location;
  distance: number;
  estimatedTime: number;
  trafficLevel: 'low' | 'medium' | 'high';
  weatherCondition: 'clear' | 'rain' | 'snow';
  emissions: number;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface RouteOptimizationResult {
  route: Route;
  vehicle: Vehicle;
  totalEmissions: number;
  fuelEfficiency: number;
  alternativeRoutes: Route[];
}