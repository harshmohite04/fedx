import { Vehicle, Location, Route } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    type: 'truck',
    capacity: 2000,
    emissionRate: 2.5,
  },
  {
    id: 'v2',
    type: 'van',
    capacity: 1000,
    emissionRate: 1.8,
  },
];

export const generateRoutes = (start: Location, end: Location, vehicle: Vehicle): Route[] => {
  const baseDistance = Math.random() * 100 + 50;
  const trafficLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const weatherConditions: Array<'clear' | 'rain' | 'snow'> = ['clear', 'rain', 'snow'];

  return Array(3).fill(null).map((_, index) => ({
    id: `route-${index}`,
    startPoint: start,
    endPoint: end,
    distance: baseDistance + (Math.random() * 20 - 10),
    estimatedTime: (baseDistance / 60) * (1 + Math.random() * 0.5),
    trafficLevel: trafficLevels[Math.floor(Math.random() * trafficLevels.length)],
    weatherCondition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
    emissions: baseDistance * vehicle.emissionRate * (1 + Math.random() * 0.3),
  }));
};