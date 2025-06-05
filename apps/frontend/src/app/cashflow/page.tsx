'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  date: z.string().min(1),
  amount: z.number().positive(),
  category: z.string().min(1),
  memo: z.string().optional(),
});

export default function CashflowPage() {
  const [form, setForm] = useState({ date: '', amount: 0, category: '', memo: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    const parsed = schema.safeParse({ ...form, amount: Number(form.amount) });
    if (!parsed.success) {
      setError('Invalid input');
      return;
    }
    await fetch('/api/incomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    setForm({ date: '', amount: 0, category: '', memo: '' });
  };

  return (
    <div>
      <h1>Add Income</h1>
      {error && <p>{error}</p>}
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} />
      <input name="category" type="text" value={form.category} onChange={handleChange} />
      <input name="memo" type="text" value={form.memo} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
