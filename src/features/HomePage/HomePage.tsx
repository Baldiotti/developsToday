'use client';

import { cn } from '@/src/shared/utils';
import { DevelopsTodayIcon } from '@/src/assets/DevelopsTodayIcon';
import { Combobox } from '@/src/features/Combobox/Combobox';
import { useHttpClient } from '@/src/hooks/http-hook';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Card } from '@/src/shared/components/ui/card';

const MODEL_YEAR = [
  { label: '2015', value: '2015' },
  { label: '2016', value: '2016' },
  { label: '2017', value: '2017' },
  { label: '2018', value: '2018' },
  { label: '2019', value: '2019' },
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
];

export function HomePage({ className, ...props }: React.ComponentProps<'div'>) {
  const { toast } = useToast();
  const { sendRequest } = useHttpClient();
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const [vehicleMakes, setVehicleMakes] = useState<
    { MakeId: number; MakeName: string }[]
  >([]);
  const fetchURL = process.env.NEXT_PUBLIC_GET_MAKES_FOR_VEHICLE_TYPE_URL;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!fetchURL) throw new Error('No URL provided');
        const responseData = await sendRequest(fetchURL);
        setVehicleMakes(responseData.Results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error fetching vehicle makes',
          description: 'Something went wrong, please try again!',
        });
      }
    };
    fetchPlaces();
  }, [fetchURL, sendRequest, toast]);

  const parsedVehicleData =
    vehicleMakes &&
    vehicleMakes.map((item) => ({
      value: `${item.MakeId}`,
      label: item.MakeName,
    }));

  const handleChangeMake = (value: string) => {
    setMake(value);
  };
  const handleChangeYear = (value: string) => {
    setYear(value);
  };

  const isFormValid = make !== '' && year !== '';

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden grid md:grid-cols-2">
        <div className="flex flex-col gap-12 p-12 md:p-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Is good to have you with us!
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <Combobox
                setValue={handleChangeMake}
                fieldLabel="Vehicle Make"
                data={parsedVehicleData}
              />
            </div>
            <div className="flex flex-col">
              <Combobox
                setValue={handleChangeYear}
                fieldLabel="Model Year"
                data={MODEL_YEAR}
              />
            </div>
          </div>
          <Link
            onClick={(e) => {
              if (!isFormValid) e.preventDefault();
            }}
            className={`w-full p-2 rounded-md text-center ${
              isFormValid
                ? 'bg-[#ff5d00] text-white'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            href={`result/${make}/${year}`}
          >
            Login
          </Link>
        </div>
        <div className="relative bg-muted flex flex-col items-center justify-center px-20 p-6 md:p-8 md:px-8">
          <h2 className="font-bold text-xl md:text-2xl">Powered by</h2>
          <DevelopsTodayIcon />
        </div>
      </Card>
    </div>
  );
}
