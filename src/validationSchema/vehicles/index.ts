import * as yup from 'yup';

export const vehicleValidationSchema = yup.object().shape({
  model: yup.string().required(),
  make: yup.string().required(),
  year: yup.number().integer().nullable(),
  battery_capacity: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
