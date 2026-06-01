"use client";

import { useState, type ChangeEvent } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Stack,
  TextField,
  Collapse,
  Divider,
  Button,
  Snackbar,
  AlertColor,
  InputAdornment,
} from "@mui/material";

import InfoBox from "../toolTips/infoBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { stepCSchema, type StepCFormData as StepFormData } from "./validationSchemas";

interface StepCProps {
  onAvançar: (dados: StepFormData) => void;
  onVoltar: () => void;
}

export default function StepC({ onAvançar, onVoltar }: StepCProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepFormData>({
    resolver: zodResolver(stepCSchema),
  });

  const onSubmit = (data: StepFormData) => {
    onAvançar(data);
    console.log("Dados da Etapa C:", data);
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
           📍 Etapa C - Data e Local
          </Typography>
          <Typography variant="body1">
            Contextualize quando e onde o incidente ocorreu
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
          {/* Seção: Quando Aconteceu */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "16px", color: "#374151", display: 'flex', alignItems: 'center', gap: '8px' }}
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
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1, display: "flex", alignItems: "center" }}>
                  Data do Ocorrido *
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
                          <CalendarTodayIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
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
                  {...register("data_ocorrido")}
                  error={!!errors.data_ocorrido}
                  helperText={errors.data_ocorrido?.message}
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1, display: "flex", alignItems: "center" }}>
                  Horário Aproximado *
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
                          <AccessTimeIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
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
                  {...register("horario_ocorrido")}
                  error={!!errors.horario_ocorrido}
                  helperText={errors.horario_ocorrido?.message}
                />
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Seção: Onde Aconteceu */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "16px", color: "#374151", display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              📍 Onde aconteceu?
            </Typography>

            <Box sx={{ maxWidth: 800 }}>
              <Stack sx={{ width: "100%" }}>
                <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1, display: "flex", alignItems: "center" }}>
                  Local do Incidente *
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
                          <LocationOnIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
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
                  {...register("local_ocorrido")}
                  error={!!errors.local_ocorrido}
                  helperText={errors.local_ocorrido?.message}
                />
              </Stack>
            </Box>
          </Box>
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
    </Box>
  );
}
