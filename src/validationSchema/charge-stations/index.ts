import * as yup from 'yup';

export const chargeStationValidationSchema = yup.object().shape({
  location: yup.string().required(),
  status: yup.string().required(),
  capacity: yup.number().integer().nullable(),
  charging_speed: yup.number().integer().nullable(),
  company_id: yup.string().nullable().required(),
});
