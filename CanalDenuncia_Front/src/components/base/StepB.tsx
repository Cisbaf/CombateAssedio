"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  Typography,
  Stack,
  TextField,
  Button,
  Snackbar,
  AlertColor,
  InputAdornment,
} from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepBSchema, type StepBFormData as StepFormData } from "./validationSchemas";
import InfoBox from "../toolTips/infoBox";

interface StepBProps {
  onAvançar: (dados: StepFormData) => void;
  onVoltar: () => void;
}

export default function StepB({ onAvançar, onVoltar }: StepBProps) {
  const [openSnack, setOpenSnack] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepFormData>({
    resolver: zodResolver(stepBSchema),
  });

  const onSubmit = (data: StepFormData) => {
    setOpenSnack(true);
    setAlertMessage("Dados validados com sucesso.");
    setAlertType("success");
    onAvançar(data);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

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
        {/* Cabeçalho */}
        <Box
          sx={{
            padding: "1rem",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--primary)",
            borderRadius: "8px 8px 0 0",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center" }}
          >
            <CrisisAlertIcon
              sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }}
            />{" "}
            Etapa B - Informações do Ofensor
          </Typography>
          <Typography variant="body1">
            Identifique quem está sendo denunciado
          </Typography>
        </Box>

        {/* Corpo do Formulário */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: "1.5rem",
          }}
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

          {/* Formulário do Ofensor */}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800 }}
          >
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
                  Nome do Ofensor * <InfoBox texto="Descreva o nome completo ou primeiro nome do ofensor."/>
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
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      transition: "all 0.2s",
                      "&:hover fieldset": { borderColor: "#3b82f6" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                    },
                  }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                  Local / Setor de Trabalho * <InfoBox texto="Descreva o local de trabalho do ofensor."/>
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
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      transition: "all 0.2s",
                      "&:hover fieldset": { borderColor: "#3b82f6" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                    },
                  }}
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

      {/* Botões de Ação */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          maxWidth: 800,
          margin: "0 auto",
          px: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 5,
            mb: 5,
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "darkgray" },
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={onVoltar}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Voltar
          </Typography>
        </Button>

        <Button
          variant="contained"
          sx={{
            mt: 5,
            mb: 5,
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Prosseguir
          </Typography>
        </Button>
      </Box>

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
