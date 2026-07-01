import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from "@mui/icons-material/Info";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({

  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1a1a1a', 
    color: '#ffffff',           
    maxWidth: 260,
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'center',        
    padding: '8px 12px',
    borderRadius: '6px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1a1a1a',
  },
}));

interface InfoBoxProps {
  texto: string;
}


export default function InfoBox({ texto }: InfoBoxProps) {
  return (
      <CustomTooltip 
        title={texto}
        placement="top"
      >
        <InfoIcon style={{ cursor: 'pointer', fontSize: '20px', color: '#555' }} />
      </CustomTooltip>
  );
}