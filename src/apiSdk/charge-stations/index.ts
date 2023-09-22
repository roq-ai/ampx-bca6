import axios from 'axios';
import queryString from 'query-string';
import { ChargeStationInterface, ChargeStationGetQueryInterface } from 'interfaces/charge-station';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChargeStations = async (
  query?: ChargeStationGetQueryInterface,
): Promise<PaginatedInterface<ChargeStationInterface>> => {
  const response = await axios.get('/api/charge-stations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createChargeStation = async (chargeStation: ChargeStationInterface) => {
  const response = await axios.post('/api/charge-stations', chargeStation);
  return response.data;
};

export const updateChargeStationById = async (id: string, chargeStation: ChargeStationInterface) => {
  const response = await axios.put(`/api/charge-stations/${id}`, chargeStation);
  return response.data;
};

export const getChargeStationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/charge-stations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChargeStationById = async (id: string) => {
  const response = await axios.delete(`/api/charge-stations/${id}`);
  return response.data;
};
