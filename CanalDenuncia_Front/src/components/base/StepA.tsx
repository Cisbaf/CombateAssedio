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

import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formFluxoCompleto } from "./FormularioFluxo";
import AssignmentIcon from "@mui/icons-material/Assignment";
type CreateSchemaType = {
  name?: string;
  idade?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  local_trabalho?: string;
};

interface StepAProps {
  onAvançar: (dados: CreateSchemaType) => void;
  onVoltar: () => void;
}

export default function StepA({ onAvançar, onVoltar }: StepAProps) {
  const [opcaoIdentificacao, setOpcaoIdentificacao] = useState("");
  const [opcaoAnonimato, setOpcaoAnonimato] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  //const { control } = useFormContext<formFluxoCompleto>();

  const dynamicSchema = z.object({
    name:
      opcaoAnonimato === "false"
        ? z.string().min(3, "Nome é obrigatório")
        : opcaoIdentificacao === "terceiro"
          ? z.string().min(3, "Nome é obrigatório")
          : z.string().optional(),

    idade:
      opcaoAnonimato === "false"
        ? z.string().min(1, "Idade é obrigatória")
        : z.string().optional(),

    cpf:
      opcaoAnonimato === "false"
        ? z.string().length(11, "CPF deve ter 11 dígitos")
        : z.string().optional(),

    email:
      opcaoAnonimato === "false"
        ? z.string().email("Email inválido")
        : z.string().optional(),

    telefone:
      opcaoAnonimato === "false"
        ? z.string().min(11, "Telefone deve conter 11 dígitos")
        : z.string().optional(),

    local_trabalho:
      opcaoIdentificacao === "terceiro"
        ? z.string().min(3, "Local de trabalho é obrigatório")
        : z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSchemaType>({
    resolver: zodResolver(dynamicSchema as any),
  });

  const handleIdentificacaoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpcaoIdentificacao(event.target.value);
  };

  const handleAnonimatoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpcaoAnonimato(event.target.value);
  };

  const onSubmit = (data: CreateSchemaType) => {
    if (opcaoIdentificacao === "" || opcaoAnonimato === "") {
      setOpenSnack(true);
      setAlertMessage(
        "Por favor, os campos de identificação e anonimato são obrigatórios.",
      );
      setAlertType("error");

      return;
    }

    
    const dataFinal: CreateSchemaType = {};

    if (opcaoAnonimato === "false") {
      dataFinal.name = data.name;
      dataFinal.idade = data.idade;
      dataFinal.cpf = data.cpf;
      dataFinal.email = data.email;
      dataFinal.telefone = data.telefone;
    }
    if (opcaoIdentificacao === "terceiro") {
      dataFinal.local_trabalho = data.local_trabalho;
      dataFinal.name = data.name;
      dataFinal.idade = data.idade;
      dataFinal.cpf = data.cpf;
    }
    setOpenSnack(true);
    setAlertMessage("Dados validados e enviados com sucesso.");
    setAlertType("success");

    onAvançar(dataFinal);
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
            <AssignmentIcon
              sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }}
            />{" "}
            Etapa A - Identificação Inicial
          </Typography>
          <Typography variant="body1">
            Determine como deseja prosseguir com sua denúncia
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
            severity="info"
            sx={{
              border: "1px solid var(--primary)",
              borderRadius: "8px",
              backgroundColor: "#DBEAFE",
              color: "var(--primary-dark)",
            }}
          >
            <strong>Sua segurança é nossa prioridade</strong>
            <br></br>
            Todas as informações são protegidas por criptografia e tratadas
            conforme a LGPD.
          </Alert>

          {/*Form Tipo Identificação*/}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800, p: 2, paddingTop: "2rem" }}
          >
            <FormLabel
              sx={{
                color: "black",
                fontWeight: 700,
                mb: 3,
                "&.Mui-focused": { color: "black" },
              }}
            >
              👤 Como você se identifica?
            </FormLabel>

            <RadioGroup
              name="identificacao-grupo"
              onChange={handleIdentificacaoChange}
            >
              <Stack spacing={2}>
                <FormControlLabel
                  value="vitima"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#3b82f6" } }} />
                  }
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#374151" }}>
                        Sou a vítima do assédio/discriminação
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        O incidente aconteceu diretamente comigo
                      </Typography>
                    </Stack>
                  }
                  sx={{
                    margin: 0,
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />

                <FormControlLabel
                  value="terceiro"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#3b82f6" } }} />
                  }
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#374151" }}>
                        Sou testemunha/terceiro
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        Presenciei ou tomei conhecimento do incidente
                      </Typography>
                    </Stack>
                  }
                  sx={{
                    margin: 0,
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          {/*Form anonimato*/}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800, p: 2, paddingTop: "2rem" }}
          >
            <FormLabel
              sx={{
                color: "black",
                fontWeight: 700,
                mb: 3,
                "&.Mui-focused": { color: "black" },
              }}
            >
              🔐 Deseja manter anonimato?
            </FormLabel>

            <RadioGroup name="anonimato-grupo" onChange={handleAnonimatoChange}>
              <Stack spacing={2}>
                <FormControlLabel
                  value="true"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#3b82f6" } }} />
                  }
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#374151" }}>
                        Me manter em anonimato
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        Sua identidade não será revelada em nenhum momento
                      </Typography>
                    </Stack>
                  }
                  sx={{
                    margin: 0,
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />

                <FormControlLabel
                  value="false"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#3b82f6" } }} />
                  }
                  label={
                    <Stack sx={{ ml: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#374151" }}>
                        Desejo me identificar
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        Seus dados serão mantidos em sigilo e serão usados
                        somente para acompanhar o processo.
                      </Typography>
                    </Stack>
                  }
                  sx={{
                    margin: 0,
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Collapse
          in={opcaoAnonimato === "false"}
          timeout="auto"
          unmountOnExit
          sx={{
            maxWidth: 800,
            p: 2,
            paddingTop: "2rem",
            border: "1px solid #1d4ed8",
            backgroundColor: "#e2eaf3ff",
            borderRadius: "8px",
            padding: "16px",
            mt: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1e40af", fontWeight: 600 }}
          >
            Por favor, informe seus dados de identificação:
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
              label="Nome Completo"
              variant="outlined"
              size="small"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message || "Digite seu nome completo"}
              required
            />
            <TextField
              
              label="Idade"
              variant="outlined"
              size="small"
              sx={{ maxWidth: 150 }}
              {...register("idade")}
              error={!!errors.idade}
              helperText={errors.idade?.message || "Digite sua idade"}
              required
            />

            <TextField
              label="CPF"
              variant="outlined"
              size="small"
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message || "Digite seu CPF"}
              required
            />

            <TextField
              label="Telefone"
              variant="outlined"
              size="small"
              {...register("telefone")}
              error={!!errors.telefone}
              helperText={errors.telefone?.message || "Digite seu telefone"}
              required
            />

            <TextField
              label="E-mail"
              variant="outlined"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message || "Digite seu e-mail"}
              required
            />
          </Box>
        </Collapse>

        <Divider
          variant="middle"
          sx={{ margin: "0 auto", width: "75%", mb: 2, mt: 2 }}
        />

        <Collapse
          in={opcaoIdentificacao === "terceiro"}
          timeout="auto"
          unmountOnExit
          sx={{
            maxWidth: 800,
            p: 2,
            paddingTop: "2rem",
            border: "1px solid #1d4ed8",
            backgroundColor: "#e2eaf3ff",
            borderRadius: "8px",
            padding: "16px",
            mt: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1e40af", fontWeight: 600 }}
          >
            Por favor, informe os dados da <u>VÍTIMA</u>:
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
              helperText={
                errors.name?.message ||
                "Digite o nome completo ou primeiro nome"
              }
              required
            />
            <TextField
              label="Idade"
              variant="outlined"
              size="small"
              sx={{ maxWidth: 200 }}
              {...register("idade")}
              error={!!errors.idade}
              helperText={errors.idade?.message || "Digite a idade aproximada"}
            />

            <TextField
              label="CPF"
              variant="outlined"
              size="small"
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message || "Digite o CPF"}
            />

            <TextField
              label="Local de Trabalho"
              variant="outlined"
              size="small"
              {...register("local_trabalho")}
              error={!!errors.local_trabalho}
              helperText={
                errors.local_trabalho?.message ||
                "Digite o local de trabalho da vítima"
              }
              required
            />
          </Box>
        </Collapse>
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
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Preencher Novamente
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
