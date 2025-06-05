'use client';
import { useSearchParams } from 'next/navigation';

export default function ResultsPage() {
  const params = useSearchParams();
  const result = params.get('result');
  const data = result ? JSON.parse(result) : null;
  if (!data) return <p>No result</p>;
  return (
    <div>
      <h1>Timeline</h1>
      <pre data-testid="timeline">{JSON.stringify(data.todos, null, 2)}</pre>
      <h1 className="mt-4">Costs</h1>
      <pre data-testid="costs">{JSON.stringify(data.costs, null, 2)}</pre>
    </div>
  );
}
