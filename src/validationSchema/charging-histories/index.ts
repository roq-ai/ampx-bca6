import * as yup from 'yup';

export const chargingHistoryValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  energy_used: yup.number().integer().nullable(),
  cost: yup.number().integer().nullable(),
  vehicle_id: yup.string().nullable().required(),
  charge_station_id: yup.string().nullable().required(),
});
