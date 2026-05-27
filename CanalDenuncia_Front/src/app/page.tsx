"use client";
import StepA from "@/components/base/StepA";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{
      background: 'white',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    }}>
      <StepA />
    </Box>
  );
}
