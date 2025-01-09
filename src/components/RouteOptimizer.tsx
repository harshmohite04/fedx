import React, { useState } from 'react';
import { Vehicle, Location, Route } from '../types';
import { vehicles, generateRoutes } from '../data/mockData';
import { Truck, Wind, Cloud, Clock } from 'lucide-react';

export default function RouteOptimizer() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [startLocation, setStartLocation] = useState<Location>({
    id: 'custom-start',
    name: '',
    lat: 0,
    lng: 0
  });
  const [endLocation, setEndLocation] = useState<Location>({
    id: 'custom-end',
    name: '',
    lat: 0,
    lng: 0
  });
  const [optimizedRoutes, setOptimizedRoutes] = useState<Route[]>([]);

  const handleOptimize = () => {
    if (selectedVehicle && startLocation.name && endLocation.name) {
      const routes = generateRoutes(startLocation, endLocation, selectedVehicle);
      setOptimizedRoutes(routes);
    }
  };

  const getEmissionColor = (emissions: number) => {
    if (emissions < 100) return 'text-green-600';
    if (emissions < 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleLocationChange = (type: 'start' | 'end', field: keyof Location, value: string) => {
    const updateLocation = type === 'start' ? setStartLocation : setEndLocation;
    const currentLocation = type === 'start' ? startLocation : endLocation;
    
    if (field === 'lat' || field === 'lng') {
      const numValue = parseFloat(value) || 0;
      updateLocation({ ...currentLocation, [field]: numValue });
    } else {
      updateLocation({ ...currentLocation, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Route Optimization System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Vehicle</h2>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`w-full p-4 rounded-lg border ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Truck className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">{vehicle.type.toUpperCase()}</p>
                      <p className="text-sm text-gray-500">
                        Capacity: {vehicle.capacity}kg | Emissions: {vehicle.emissionRate} CO2/km
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Start Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  value={startLocation.name}
                  onChange={(e) => handleLocationChange('start', 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={startLocation.lat || ''}
                    onChange={(e) => handleLocationChange('start', 'lat', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter latitude"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={startLocation.lng || ''}
                    onChange={(e) => handleLocationChange('start', 'lng', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">End Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  value={endLocation.name}
                  onChange={(e) => handleLocationChange('end', 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={endLocation.lat || ''}
                    onChange={(e) => handleLocationChange('end', 'lat', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter latitude"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={endLocation.lng || ''}
                    onChange={(e) => handleLocationChange('end', 'lng', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleOptimize}
            disabled={!selectedVehicle || !startLocation.name || !endLocation.name}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Optimize Route
          </button>
        </div>

        {optimizedRoutes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Optimized Routes</h2>
            <div className="grid grid-cols-1 gap-6">
              {optimizedRoutes.map((route) => (
                <div key={route.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Route Details</h3>
                      <p className="text-gray-600">Distance: {route.distance.toFixed(2)} km</p>
                      <p className="text-gray-600">
                        Time: {route.estimatedTime.toFixed(1)} hours
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Traffic</h3>
                      <div className="flex items-center">
                        <Wind className="w-5 h-5 mr-2" />
                        <span className={`capitalize ${
                          route.trafficLevel === 'low' ? 'text-green-600' :
                          route.trafficLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {route.trafficLevel}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Weather</h3>
                      <div className="flex items-center">
                        <Cloud className="w-5 h-5 mr-2" />
                        <span className="capitalize">{route.weatherCondition}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Emissions</h3>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className={getEmissionColor(route.emissions)}>
                          {route.emissions.toFixed(2)} CO2 kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}