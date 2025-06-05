import { useState } from 'react';

export type DiagnosisAnswer = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

export interface StepWizardProps {
  onComplete: (answers: DiagnosisAnswer) => void;
}

export default function StepWizard({ onComplete }: StepWizardProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosisAnswer>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
  });

  const handleNext = () => {
    if (step === 6) {
      onComplete(answers);
    } else {
      setStep(step + 1);
    }
  };

  const handleChange = (key: keyof DiagnosisAnswer) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnswers({ ...answers, [key]: e.target.value });
  };

  const questionKey = `q${step}` as keyof DiagnosisAnswer;
  return (
    <div>
      <h2>Question {step}</h2>
      <input
        data-testid={`input-${questionKey}`}
        type="text"
        value={answers[questionKey]}
        onChange={handleChange(questionKey)}
      />
      <div className="mt-4">
        <button onClick={handleNext} data-testid="next-button">
          {step === 6 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
