'use client';
import StepWizard, { DiagnosisAnswer } from '../../components/StepWizard';
import { useRouter } from 'next/navigation';

export default function DiagnosisPage() {
  const router = useRouter();

  const handleComplete = async (answers: DiagnosisAnswer) => {
    const res = await fetch('/api/diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    router.push('/diagnosis/results?result=' + encodeURIComponent(JSON.stringify(data)));
  };

  return <StepWizard onComplete={handleComplete} />;
}
