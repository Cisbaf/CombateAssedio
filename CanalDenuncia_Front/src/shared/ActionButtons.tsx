"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

interface ActionButtonsProps {
  onVoltar?: () => void;
  onProsseguir?: () => void;
  loading?: boolean;
  labelVoltar?: string;
  labelProsseguir?: string;
  /** Quando true, o botão Voltar não é exibido */
  hideVoltar?: boolean;
  /** Cor e estilo do botão Prosseguir */
  prosseguirVariant?: "primary" | "success";
}

/**
 * Par de botões "Voltar / Prosseguir" padronizado para todos os Steps.
 * Elimina a duplicação dos botões de ação em StepA–E.
 */
export default function ActionButtons({
  onVoltar,
  onProsseguir,
  loading = false,
  labelVoltar = "Voltar",
  labelProsseguir = "Prosseguir",
  hideVoltar = false,
  prosseguirVariant = "primary",
}: ActionButtonsProps) {
  const prosseguirSx =
    prosseguirVariant === "success"
      ? {
          borderRadius: "8px",
          textTransform: "none" as const,
          px: 4,
          backgroundImage: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          "&:hover": {
            backgroundImage: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          },
        }
      : {
          borderRadius: "8px",
          textTransform: "none" as const,
        };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 800,
        margin: "0 auto",
        px: 2,
        mt: 4,
        mb: 4,
      }}
    >
      {!hideVoltar && (
        <Button
          variant="contained"
          disabled={loading}
          onClick={onVoltar}
          sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "darkgray" },
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600 }}>
            {labelVoltar}
          </Typography>
        </Button>
      )}

      <Button
        variant="contained"
        disabled={loading}
        onClick={onProsseguir}
        color={prosseguirVariant === "success" ? "success" : "primary"}
        sx={prosseguirSx}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600 }}>
            {labelProsseguir}
          </Typography>
        )}
      </Button>
    </Box>
  );
}
