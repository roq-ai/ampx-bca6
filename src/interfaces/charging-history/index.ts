import { VehicleInterface } from 'interfaces/vehicle';
import { ChargeStationInterface } from 'interfaces/charge-station';
import { GetQueryInterface } from 'interfaces';

export interface ChargingHistoryInterface {
  id?: string;
  vehicle_id: string;
  charge_station_id: string;
  start_time: any;
  end_time: any;
  energy_used?: number;
  cost?: number;
  created_at?: any;
  updated_at?: any;

  vehicle?: VehicleInterface;
  charge_station?: ChargeStationInterface;
  _count?: {};
}

export interface ChargingHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_id?: string;
  charge_station_id?: string;
}
