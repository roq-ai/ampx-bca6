import { ChargingHistoryInterface } from 'interfaces/charging-history';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  user_id: string;
  model: string;
  make: string;
  year?: number;
  battery_capacity?: number;
  created_at?: any;
  updated_at?: any;
  charging_history?: ChargingHistoryInterface[];
  user?: UserInterface;
  _count?: {
    charging_history?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  model?: string;
  make?: string;
}
