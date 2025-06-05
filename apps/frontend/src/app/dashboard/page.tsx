'use client';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardPage() {
  const { data } = useSWR<{ income: number; expense: number }>(
    '/api/summary?period=month',
    fetcher,
  );
  const chartData = [
    { name: 'Income', value: data?.income ?? 0 },
    { name: 'Expense', value: data?.expense ?? 0 },
  ];
  const progress = data ? data.income - data.expense : 0;
  return (
    <div>
      <h1>Dashboard</h1>
      <BarChart width={300} height={200} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <div>
        <p>Progress this month: {progress}</p>
      </div>
    </div>
  );
}
