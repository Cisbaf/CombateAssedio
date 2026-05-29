"use client";
import FormularioFluxo from "@/components/base/FormularioFluxo";
import ProgressionBar from "@/components/base/ProgressionBar";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";


export default function Home() {
  return (
    <Box>

      <Box sx={{
        background: 'white',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '15px',
        mb: 3,
        p:2,
        pt:3,
      }}>
        <ProgressionBar />
      </Box>

      <Box sx={{
        background: 'white',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '15px',
      }}>
        <FormularioFluxo />
      </Box>
    </Box>

  );
}