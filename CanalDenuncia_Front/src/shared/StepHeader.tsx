"use client";

import { Box, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface StepHeaderProps {
  /** Ícone MUI (ex: AssignmentIcon) */
  Icon: SvgIconComponent;
  title: string;
  subtitle: string;
  /** Cor de fundo (padrão: var(--primary)) */
  bgColor?: string;
}

/**
 * Cabeçalho padrão de cada etapa do formulário.
 * Elimina a repetição do bloco de cabeçalho em StepA–F.
 */
export default function StepHeader({ Icon, title, subtitle, bgColor = "var(--primary)" }: StepHeaderProps) {
  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        backgroundColor: bgColor,
        borderRadius: "8px 8px 0 0",
        color: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center" }}
      >
        <Icon sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }} />
        {title}
      </Typography>
      <Typography variant="body1">{subtitle}</Typography>
    </Box>
  );
}
