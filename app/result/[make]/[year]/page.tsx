import { Suspense } from 'react';
import Loading from './loading';
import ResultsList from '@/src/features/ResultsList/ResultsList';

interface ResultProps {
  params: Promise<{
    make: string;
    year: string;
  }>;
}

async function ResultPage({ params }: ResultProps) {
  const { make, year } = await params;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <h1 className="self-start text-4xl font-semibold my-4">Results</h1>
      <Suspense fallback={<Loading />}>
        <ResultsList make={make} year={year} />
      </Suspense>
    </div>
  );
}
export default ResultPage;
