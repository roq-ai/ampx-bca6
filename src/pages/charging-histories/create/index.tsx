import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createChargingHistory } from 'apiSdk/charging-histories';
import { chargingHistoryValidationSchema } from 'validationSchema/charging-histories';
import { VehicleInterface } from 'interfaces/vehicle';
import { ChargeStationInterface } from 'interfaces/charge-station';
import { getVehicles } from 'apiSdk/vehicles';
import { getChargeStations } from 'apiSdk/charge-stations';
import { ChargingHistoryInterface } from 'interfaces/charging-history';

function ChargingHistoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ChargingHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createChargingHistory(values);
      resetForm();
      router.push('/charging-histories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ChargingHistoryInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      energy_used: 0,
      cost: 0,
      vehicle_id: (router.query.vehicle_id as string) ?? null,
      charge_station_id: (router.query.charge_station_id as string) ?? null,
    },
    validationSchema: chargingHistoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Charging Histories',
              link: '/charging-histories',
            },
            {
              label: 'Create Charging History',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Charging History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>

          <NumberInput
            label="Energy Used"
            formControlProps={{
              id: 'energy_used',
              isInvalid: !!formik.errors?.energy_used,
            }}
            name="energy_used"
            error={formik.errors?.energy_used}
            value={formik.values?.energy_used}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('energy_used', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Cost"
            formControlProps={{
              id: 'cost',
              isInvalid: !!formik.errors?.cost,
            }}
            name="cost"
            error={formik.errors?.cost}
            value={formik.values?.cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<VehicleInterface>
            formik={formik}
            name={'vehicle_id'}
            label={'Select Vehicle'}
            placeholder={'Select Vehicle'}
            fetcher={getVehicles}
            labelField={'model'}
          />
          <AsyncSelect<ChargeStationInterface>
            formik={formik}
            name={'charge_station_id'}
            label={'Select Charge Station'}
            placeholder={'Select Charge Station'}
            fetcher={getChargeStations}
            labelField={'location'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/charging-histories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'charging_history',
    operation: AccessOperationEnum.CREATE,
  }),
)(ChargingHistoryCreatePage);
