"use client";

import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  Typography,
  Stack,
  TextField,
  Snackbar,
  InputAdornment,
} from "@mui/material";

import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

import { useStepB } from "@/features/denuncia/hooks/useStepB";
import type { StepBFormData } from "@/features/denuncia/schemas/validationSchemas";
import InfoBox from "@/shared/infoBox";
import StepHeader from "@/features/denuncia/components/StepHeader";
import ActionButtons from "@/features/denuncia/components/ActionButtons";

interface StepBProps {
  initialData?: any;
  onAvançar: (dados: StepBFormData) => void;
  onVoltar: () => void;
}

const textFieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    transition: "all 0.2s",
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
  },
};

export default function StepB({ initialData, onAvançar, onVoltar }: StepBProps) {
  const {
    openSnack,
    alertMessage,
    alertType,
    errors,
    register,
    handleSubmit,
    handleCloseSnack,
    onSubmit,
  } = useStepB({ initialData, onAvançar });

  return (
    <Box sx={{ width: "auto", height: "auto", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepHeader
          Icon={CrisisAlertIcon}
          title="Etapa B - Informações do Ofensor"
          subtitle="Identifique quem está sendo denunciado"
        />

        <Box
          sx={{ width: "100%", backgroundColor: "white", padding: "1.5rem" }}
        >
          <Alert
            variant="outlined"
            severity="warning"
            sx={{
              border: "1px solid var(--warning)",
              borderRadius: "8px",
              backgroundColor: "#FEF3C7",
              color: "var(--primary-dark)",
              mb: 4,
            }}
          >
            <strong>IMPORTANTE</strong>
            <br />
            Forneça informações precisas para garantir que a investigação seja
            conduzida corretamente.
          </Alert>

          <FormControl component="fieldset" fullWidth sx={{ maxWidth: 800 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#374151", fontWeight: 700, mb: 3 }}
            >
              👤 Quem cometeu o incidente?
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "1.5rem",
                width: "100%",
              }}
            >
              <Stack sx={{ flex: 1 }}>
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                  Nome do Ofensor *{" "}
                  <InfoBox texto="Descreva o nome completo ou primeiro nome do ofensor." />
                </FormLabel>
                <TextField
                  placeholder="Nome completo ou primeiro nome"
                  variant="outlined"
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                  Local / Setor de Trabalho *{" "}
                  <InfoBox texto="Descreva o local de trabalho do ofensor." />
                </FormLabel>
                <TextField
                  placeholder="Ex: Base SAMU - Nova Iguaçu / Recursos Humanos, TI, Recepção"
                  variant="outlined"
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                  {...register("local_trabalho")}
                  error={!!errors.local_trabalho}
                  helperText={errors.local_trabalho?.message}
                  required
                />
              </Stack>
            </Box>
          </FormControl>
        </Box>
      </Box>

      <ActionButtons
        onVoltar={onVoltar}
        onProsseguir={handleSubmit(onSubmit)}
      />

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
