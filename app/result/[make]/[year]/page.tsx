'use client';

import { Card } from '@/components/ui/card';
import { useHttpClient } from '@/src/hooks/http-hook';
import React, { useEffect, useState } from 'react';

export const Page = ({
  params: paramsPromise,
}: {
  params: Promise<{ make: string; year: string }>;
}) => {
  const { sendRequest } = useHttpClient();
  const [results, setResults] = useState<
    { Model_Name: string; Model_ID: string }[]
  >([]);
  const [params, setParams] = useState<{ make: string; year: string } | null>(
    null
  );

  useEffect(() => {
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  const make = params?.make;
  const year = params?.year;

  const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${make}/modelyear/${year}?format=json`;

  useEffect(() => {
    if (params) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(URL);
          setResults(responseData.Results);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {}
      };
      fetchPlaces();
    }
  }, [sendRequest, params, URL]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <h1 className="self-start text-4xl font-semibold m-4">Results</h1>
      <div className="w-full max-w-md md:max-w-5xl grid grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((result, i) => (
          <Card key={i} className="h-16 grid place-items-center">
            {result.Model_ID}: {result.Model_Name}
          </Card>
        ))}
      </div>
    </div>
  );
};
