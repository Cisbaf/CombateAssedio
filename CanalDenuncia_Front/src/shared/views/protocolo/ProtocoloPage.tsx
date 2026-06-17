"use client";

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StepHeader from "@/shared/StepHeader";

const textFieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "white",
    transition: "all 0.2s",
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
  },
};

export default function ProtocoloPage() {
  return (
    <Box
      sx={{
        background: "white",
        maxWidth: "900px",
        margin: "0 auto",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      {/* Cabeçalho padrão do sistema */}
      <StepHeader
        Icon={SearchIcon}
        title="Consultar Protocolo"
        subtitle="Acompanhe o andamento da sua denúncia"
      />

      {/* Conteúdo do formulário */}
      <Box sx={{ width: "100%", backgroundColor: "white", padding: "2rem" }}>
        <Stack spacing={4} sx={{ maxWidth: 650, margin: "0 auto" }}>
          <Alert
            variant="outlined"
            severity="info"
            sx={{
              border: "1px solid var(--primary)",
              borderRadius: "8px",
              backgroundColor: "#DBEAFE",
              color: "var(--primary-dark)",
            }}
          >
            <strong>Acompanhamento Seguro</strong>
            <br />
            Para consultar o status de sua manifestação, informe abaixo o número
            do protocolo recebido após a realização da denúncia.
          </Alert>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#374151", mb: 1.5 }}
            >
              Digite o número do seu protocolo *
            </Typography>

            <TextField
              placeholder="ex: PROT-XXXXXX"
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReceiptIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={textFieldSx}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pt: 2,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.2,
                backgroundImage:
                  "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                },
              }}
            >
              Consultar Status
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
