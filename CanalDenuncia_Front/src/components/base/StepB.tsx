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
} from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formFluxoCompleto } from "./FormularioFluxo";

type CreateSchemaType = {
  name?: string;
  local_trabalho?: string;
};

interface StepAProps {
  onAvançar: () => void;
  onVoltar: () => void;
}

export default function StepB({ onAvançar, onVoltar }: StepAProps) {
  const [openSnack, setOpenSnack] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  //const { control } = useFormContext<formFluxoCompleto>();

  const Schema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),

    local_trabalho: z.string().min(3, "Local de trabalho é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSchemaType>({
    resolver: zodResolver(Schema as any),
  });

  const onSubmit = (data: CreateSchemaType) => {
    const dataFinal: CreateSchemaType = {};
    dataFinal.name = data.name;
    dataFinal.local_trabalho = data.local_trabalho;
    setOpenSnack(true);
    setAlertMessage("Dados validados e enviados com sucesso.");
    setAlertType("success");

    onAvançar();
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
            sx={{ fontWeight: 600, marginBottom: "8px" }}
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

        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            padding: "1rem",
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
            }}
          >
            <strong>IMPORTANTE</strong>
            <br></br>
            Forneça informações precisas para garantir que a investigação seja
            conduzida corretamente.
          </Alert>

          {/*Formulário do Ofensor*/}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800, p: 2, paddingTop: "2rem" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "#1e40af", fontWeight: 600 }}
            >
              Por favor, informe os dados de identificação:
            </Typography>
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid #dbeafe",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <TextField
                label="Nome"
                variant="outlined"
                size="small"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message || "Digite o nome completo ou primeiro nome"}
                required
              />
              <TextField
                label="Local de Trabalho"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ maxWidth: 300 }}
                {...register("local_trabalho")}
                error={!!errors.local_trabalho}
                helperText={errors.local_trabalho?.message || "Digite o local de trabalho"}
                required
              />

            </Box>
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 5,
            mb: 5,
            backgroundColor: "gray",
            "&hover": { color: "white" },
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
          sx={{ mt: 5, mb: 5 }}
          onClick={handleSubmit(onSubmit)}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Prosseguir
          </Typography>
        </Button>
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
    </Box>
  );
}
