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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

type CreateSchemaType = {
  name?: string;
  idade?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  vitima_name?: string;
  vitima_idade?: string;
  vitima_cpf?: string;
  vitima_local_trabalho?: string;
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

  const dynamicSchema = z.object({
    name:
      opcaoAnonimato === "false"
        ? z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres")
        : z.string().optional(),

    idade:
      opcaoAnonimato === "false"
        ? z.string().min(1, "Idade é obrigatória")
        : z.string().optional(),

    cpf:
      opcaoAnonimato === "false"
        ? z.string().length(11, "CPF deve ter exatamente 11 dígitos")
        : z.string().optional(),

    email:
      opcaoAnonimato === "false"
        ? z.string().email("Insira um e-mail válido")
        : z.string().optional(),

    telefone:
      opcaoAnonimato === "false"
        ? z.string().min(11, "Telefone deve conter no mínimo 11 dígitos")
        : z.string().optional(),

    vitima_name:
      opcaoIdentificacao === "terceiro"
        ? z.string().min(3, "Nome da vítima deve ter pelo menos 3 caracteres")
        : z.string().optional(),

    vitima_idade: z.string().optional(),

    vitima_cpf: z.string().optional(),

    vitima_local_trabalho:
      opcaoIdentificacao === "terceiro"
        ? z.string().min(3, "Local de trabalho da vítima é obrigatório")
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
      setAlertMessage("Por favor, os campos de identificação e anonimato são obrigatórios.");
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
      dataFinal.vitima_name = data.vitima_name;
      dataFinal.vitima_idade = data.vitima_idade;
      dataFinal.vitima_cpf = data.vitima_cpf;
      dataFinal.vitima_local_trabalho = data.vitima_local_trabalho;
    }

    setOpenSnack(true);
    setAlertMessage("Dados validados com sucesso.");
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
            <AssignmentIcon
              sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }}
            />{" "}
            Etapa A - Identificação Inicial
          </Typography>
          <Typography variant="body1">
            Determine como deseja prosseguir com sua denúncia
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
            severity="info"
            sx={{
              border: "1px solid var(--primary)",
              borderRadius: "8px",
              backgroundColor: "#DBEAFE",
              color: "var(--primary-dark)",
              mb: 4,
            }}
          >
            <strong>Sua segurança é nossa prioridade</strong>
            <br />
            Todas as informações são protegidas por criptografia e tratadas conforme a LGPD.
          </Alert>

          {/* Form Tipo Identificação */}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800, mb: 3 }}
          >
            <FormLabel
              sx={{
                color: "black",
                fontWeight: 700,
                mb: 3,
                fontSize: "1.1rem",
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
                    "&:hover": { borderColor: "#3b82f6" },
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
                    "&:hover": { borderColor: "#3b82f6" },
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Form anonimato */}
          <FormControl
            component="fieldset"
            fullWidth
            sx={{ maxWidth: 800, mb: 3 }}
          >
            <FormLabel
              sx={{
                color: "black",
                fontWeight: 700,
                mb: 3,
                fontSize: "1.1rem",
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
                    "&:hover": { borderColor: "#3b82f6" },
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
                        Seus dados serão mantidos em sigilo e serão usados somente para acompanhar o processo.
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
                    "&:hover": { borderColor: "#3b82f6" },
                    "&:has(input:checked)": {
                      borderColor: "#3b82f6",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Dados do denunciante se identificado */}
          <Collapse
            in={opcaoAnonimato === "false"}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                maxWidth: 800,
                p: 3,
                border: "1px solid #3b82f6",
                backgroundColor: "#f0f7ff",
                borderRadius: "12px",
                mt: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#1e3a8a", fontWeight: 700, mb: 3 }}
              >
                Por favor, informe seus dados de identificação:
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: "1.25rem",
                  width: "100%",
                }}
              >
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Nome Completo *</FormLabel>
                  <TextField
                    placeholder="Seu nome completo"
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
                        backgroundColor: "white",
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

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Idade *</FormLabel>
                  <TextField
                    placeholder="Digite sua idade"
                    variant="outlined"
                    size="small"
                    slotProps={{
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
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("idade")}
                    error={!!errors.idade}
                    helperText={errors.idade?.message}
                    required
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>CPF *</FormLabel>
                  <TextField
                    placeholder="Apenas números (11 dígitos)"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("cpf")}
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    required
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Telefone *</FormLabel>
                  <TextField
                    placeholder="DDD + Número (ex: 11999999999)"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("telefone")}
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    required
                  />
                </Stack>

                <Stack sx={{ gridColumn: { md: "span 2" } }}>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>E-mail *</FormLabel>
                  <TextField
                    placeholder="exemplo@email.com"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                </Stack>
              </Box>
            </Box>
          </Collapse>

          <Divider sx={{ my: 3, maxWidth: 800 }} />

          {/* Dados da vítima se whistleblower for testemunha */}
          <Collapse
            in={opcaoIdentificacao === "terceiro"}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                maxWidth: 800,
                p: 3,
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                mt: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#334155", fontWeight: 700, mb: 3 }}
              >
                Por favor, informe os dados da <u>VÍTIMA</u>:
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: "1.25rem",
                  width: "100%",
                }}
              >
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Nome da Vítima *</FormLabel>
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
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("vitima_name")}
                    error={!!errors.vitima_name}
                    helperText={errors.vitima_name?.message}
                    required
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Idade da Vítima (Opcional)</FormLabel>
                  <TextField
                    placeholder="Idade aproximada"
                    variant="outlined"
                    size="small"
                    slotProps={{
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
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("vitima_idade")}
                    error={!!errors.vitima_idade}
                    helperText={errors.vitima_idade?.message}
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>CPF da Vítima (Opcional)</FormLabel>
                  <TextField
                    placeholder="Digite o CPF da vítima"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("vitima_cpf")}
                    error={!!errors.vitima_cpf}
                    helperText={errors.vitima_cpf?.message}
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>Local de Trabalho da Vítima *</FormLabel>
                  <TextField
                    placeholder="Ex: Recursos Humanos, TI, Recepção"
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
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                      },
                    }}
                    {...register("vitima_local_trabalho")}
                    error={!!errors.vitima_local_trabalho}
                    helperText={errors.vitima_local_trabalho?.message}
                    required
                  />
                </Stack>
              </Box>
            </Box>
          </Collapse>
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
