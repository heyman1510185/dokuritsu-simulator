'use client';
import { useState } from 'react';

type CheckResult = {
  result: string;
  reason: string;
  reference?: string;
};

const questions = [
  'Is this cost related to your business?',
  'Did you pay with personal funds?',
  'Do you have a receipt?',
];

export default function QuickCheck() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleAnswer = async (ans: boolean) => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const res = await fetch('/api/expense/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'Transportation' }),
      });
      const data: CheckResult = await res.json();
      setResult(data);
    }
  };

  if (result) {
    return (
      <div>
        <p>Result: {result.result}</p>
        <p>{result.reason}</p>
        {result.reference && (
          <a href={result.reference} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>{questions[step]}</h2>
      <button onClick={() => handleAnswer(true)} className="mr-2">
        Yes
      </button>
      <button onClick={() => handleAnswer(false)}>No</button>
    </div>
  );
}
