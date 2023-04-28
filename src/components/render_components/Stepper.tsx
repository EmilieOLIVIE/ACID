import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

type StepperProps = {
    steps: string[];
    activeStep: number;
    completed: { [key: number]: boolean };
    handleStep: (step: number) => void;
}
export default ({ steps, activeStep, completed, handleStep }: StepperProps) => {

    return (
        <Stepper id="stepper" className="mb-5 mt-5" nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    );
};