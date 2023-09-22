import axios from 'axios';
import queryString from 'query-string';
import { ChargingHistoryInterface, ChargingHistoryGetQueryInterface } from 'interfaces/charging-history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChargingHistories = async (
  query?: ChargingHistoryGetQueryInterface,
): Promise<PaginatedInterface<ChargingHistoryInterface>> => {
  const response = await axios.get('/api/charging-histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createChargingHistory = async (chargingHistory: ChargingHistoryInterface) => {
  const response = await axios.post('/api/charging-histories', chargingHistory);
  return response.data;
};

export const updateChargingHistoryById = async (id: string, chargingHistory: ChargingHistoryInterface) => {
  const response = await axios.put(`/api/charging-histories/${id}`, chargingHistory);
  return response.data;
};

export const getChargingHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/charging-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChargingHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/charging-histories/${id}`);
  return response.data;
};
