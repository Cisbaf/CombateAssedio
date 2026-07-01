"use client";

import {
  Box,
  FormLabel,
  Typography,
  Stack,
  TextField,
  Divider,
  InputAdornment,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  stepCSchema,
  type StepCFormData,
} from "@/features/denuncia/schemas/validationSchemas";
import InfoBox from "@/shared/infoBox";
import StepHeader from "@/features/denuncia/components/StepHeader";
import ActionButtons from "@/features/denuncia/components/ActionButtons";

interface StepCProps {
  onAvançar: (dados: StepCFormData) => void;
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

export default function StepC({ onAvançar, onVoltar }: StepCProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepCFormData>({ resolver: zodResolver(stepCSchema) });

  const onSubmit = (data: StepCFormData) => {
    onAvançar(data);
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
        <StepHeader
          Icon={LocationOnOutlinedIcon}
          title="Etapa C - Data e Local"
          subtitle="Contextualize quando e onde o incidente ocorreu"
        />

        <Box
          sx={{ width: "100%", backgroundColor: "white", padding: "1.5rem" }}
        >
          {/* Quando */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                marginBottom: "16px",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📅 Quando aconteceu?
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "1.5rem",
                maxWidth: 800,
              }}
            >
              <Stack sx={{ flex: 1 }}>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: "#4B5563",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Data do Ocorrido *{" "}
                  <InfoBox texto="Digite a data em que o incidente ocorreu." />
                </FormLabel>
                <TextField
                  required
                  size="small"
                  type="date"
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon
                            sx={{ color: "#9CA3AF", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                  {...register("data_ocorrido")}
                  error={!!errors.data_ocorrido}
                  helperText={errors.data_ocorrido?.message}
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: "#4B5563",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Horário Aproximado *{" "}
                  <InfoBox texto="Digite o horário aproximado em que o incidente ocorreu." />
                </FormLabel>
                <TextField
                  required
                  size="small"
                  type="time"
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon
                            sx={{ color: "#9CA3AF", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                  {...register("horario_ocorrido")}
                  error={!!errors.horario_ocorrido}
                  helperText={errors.horario_ocorrido?.message}
                />
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Onde */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                marginBottom: "16px",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📍 Onde aconteceu?
            </Typography>
            <Box sx={{ maxWidth: 800 }}>
              <Stack sx={{ width: "100%" }}>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: "#4B5563",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Local do Incidente *{" "}
                  <InfoBox texto="Digite o local ou setor em que o incidente ocorreu." />
                </FormLabel>
                <TextField
                  required
                  placeholder="Ex: Escritório 101, Sala de Reunião 5, Almoxarifado, etc."
                  size="small"
                  type="text"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon
                            sx={{ color: "#9CA3AF", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                  {...register("local_ocorrido")}
                  error={!!errors.local_ocorrido}
                  helperText={errors.local_ocorrido?.message}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>

      <ActionButtons
        onVoltar={onVoltar}
        onProsseguir={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
