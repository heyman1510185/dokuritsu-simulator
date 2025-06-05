import type { Meta, StoryObj } from '@storybook/react';
import StepWizard from './StepWizard';

const meta: Meta<typeof StepWizard> = {
  title: 'Diagnosis/StepWizard',
  component: StepWizard,
};
export default meta;

type Story = StoryObj<typeof StepWizard>;

export const Default: Story = {
  args: {
    onComplete: (answers) => alert(JSON.stringify(answers)),
  },
};
