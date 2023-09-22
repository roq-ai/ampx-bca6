import { ChargingHistoryInterface } from 'interfaces/charging-history';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ChargeStationInterface {
  id?: string;
  location: string;
  company_id: string;
  status: string;
  capacity?: number;
  charging_speed?: number;
  created_at?: any;
  updated_at?: any;
  charging_history?: ChargingHistoryInterface[];
  company?: CompanyInterface;
  _count?: {
    charging_history?: number;
  };
}

export interface ChargeStationGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  company_id?: string;
  status?: string;
}
