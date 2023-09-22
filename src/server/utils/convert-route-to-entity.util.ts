const mapping: Record<string, string> = {
  appointments: 'appointment',
  'charge-stations': 'charge_station',
  'charging-histories': 'charging_history',
  companies: 'company',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
