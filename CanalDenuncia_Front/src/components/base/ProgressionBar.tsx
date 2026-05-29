'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import DescriptionIcon from '@mui/icons-material/Description';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(33,228,242) 0%, rgb(67,64,233) 50%, rgb(7,20,75) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(33,228,242) 0%, rgb(67,64,233) 50%, rgb(7,20,75) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }: { ownerState: { active?: boolean; completed?: boolean } }) =>
                ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgba(33, 228, 242, 1) 0%, rgba(67, 64, 233, 1) 50%, rgba(7, 20, 75, 1) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }: { ownerState: { active?: boolean; completed?: boolean } }) =>
                ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(33,228,242) 0%, rgb(67,64,233) 50%, rgb(7,20,75) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <AssignmentIndIcon />,
        2: <PersonOffIcon />,
        3: <WorkspacesIcon />,
        4: <DescriptionIcon />,
        5: <RateReviewIcon />,
        6: <CheckCircleIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = [
    'Identificação',
    'Ofensor',
    'Contexto',
    'Descrição',
    'Revisão',
    'Concluído',
];

export default function ProgressionBar({ activeStep = 0 }: { activeStep?: number }) {
    return (
        <Box sx={{
            background: 'white',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            mb: 3,
            p: 2,
            pt: 3,
        }}>
            <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}