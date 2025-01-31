import { Card } from '@/components/ui/card';
import { ToastHandler } from '../ToastHandler/ToastHandler';

interface ApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: {
    Model_Name: string;
    Model_ID: string;
  }[];
}

async function ResultsList({ make, year }: { make: string; year: string }) {
  let error: string | undefined;
  let results: ApiResponse['Results'] = [];

  try {
    const URL =
      process.env.GET_MODELS_FOR_MAKEID_YEAR_URL +
      `${make}/modelyear/${year}?format=json`;

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response: ApiResponse = await fetch(URL).then((res) => res.json());
    results = response.Results;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error = 'Failed to fetch results';
  }
  if (results.length === 0)
    return (
      <>
        <ToastHandler error={error} />
        <div className="w-full">
          <p className="self-start my-2 text-balance text-muted-foreground">
            Sorry we could not find any vehicle
          </p>
        </div>
      </>
    );

  return (
    <>
      <ToastHandler error={error} />
      <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((result, i) => (
          <Card key={i} className="h-16 grid place-items-center">
            {result.Model_ID}: {result.Model_Name}
          </Card>
        ))}
      </div>
    </>
  );
}
export default ResultsList;
