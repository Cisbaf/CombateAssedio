"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

interface StyledFormCardProps {
  children: ReactNode;
  /** Variante visual do card */
  variant?: "blue" | "neutral";
  sx?: SxProps<Theme>;
}

const variantStyles = {
  blue: {
    border: "1px solid #3b82f6",
    backgroundColor: "#f0f7ff",
  },
  neutral: {
    border: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
};

/**
 * Card estilizado reutilizado nos blocos de "Dados do Denunciante" e "Dados da Vítima" do StepA,
 * e em outros blocos de agrupamento de campos no formulário.
 */
export default function StyledFormCard({ children, variant = "neutral", sx }: StyledFormCardProps) {
  return (
    <Box
      sx={{
        maxWidth: 800,
        p: 3,
        borderRadius: "12px",
        mt: 3,
        mb: 4,
        ...variantStyles[variant],
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
