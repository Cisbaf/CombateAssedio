"use client";

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
  Snackbar,
  InputAdornment,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

import { useStepA } from "@/shared/views/denuncia/hooks/useStepA";
import type { StepAFormData } from "@/shared/schemas/validationSchemas";
import InfoBox from "@/shared/components/toolTips/infoBox";
import StepHeader from "@/shared/StepHeader";
import ActionButtons from "@/shared/ActionButtons";
import StyledFormCard from "@/shared/StyledFormCard";

interface StepAProps {
  onAvançar: (dados: StepAFormData) => void;
  onVoltar: () => void;
}

const radioCardSx = {
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
};

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

export default function StepA({ onAvançar, onVoltar }: StepAProps) {
  const {
    opcaoIdentificacao,
    opcaoAnonimato,
    openSnack,
    alertMessage,
    alertType,
    errors,
    register,
    handleSubmit,
    handleIdentificacaoChange,
    handleAnonimatoChange,
    handleCloseSnack,
    onSubmit,
  } = useStepA({ onAvançar });

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
          Icon={AssignmentIcon}
          title="Etapa A - Identificação Inicial"
          subtitle="Determine como deseja prosseguir com sua denúncia"
        />

        <Box
          sx={{ width: "100%", backgroundColor: "white", padding: "1.5rem" }}
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
            Todas as informações são protegidas por criptografia e tratadas
            conforme a LGPD.
          </Alert>

          {/* Tipo de Identificação */}
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
              Como você se identifica?{" "}
              <InfoBox texto="Marque uma das opções abaixo para identificar-se." />
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
                  sx={radioCardSx}
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
                  sx={radioCardSx}
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Anonimato */}
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
              Deseja manter anonimato?{" "}
              <InfoBox texto="Ao opta por permanecer anonimo, seus dados não serão informados na denuncia." />
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
                  sx={radioCardSx}
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
                  sx={radioCardSx}
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Dados do denunciante */}
          <Collapse
            in={opcaoAnonimato === "false"}
            timeout="auto"
            unmountOnExit
          >
            <StyledFormCard variant="blue">
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
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Nome Completo *
                  </FormLabel>
                  <TextField
                    placeholder="Seu nome completo"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
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
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Idade *
                  </FormLabel>
                  <TextField
                    placeholder="Digite sua idade"
                    variant="outlined"
                    size="small"
                    slotProps={{
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
                    {...register("idade")}
                    error={!!errors.idade}
                    helperText={errors.idade?.message}
                    required
                  />
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    CPF *
                  </FormLabel>
                  <TextField
                    placeholder="Apenas números (11 dígitos)"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={textFieldSx}
                    {...register("cpf")}
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    required
                  />
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Telefone *
                  </FormLabel>
                  <TextField
                    placeholder="DDD + Número (ex: 11999999999)"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={textFieldSx}
                    {...register("telefone")}
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    required
                  />
                </Stack>
                <Stack sx={{ gridColumn: { md: "span 2" } }}>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    E-mail *
                  </FormLabel>
                  <TextField
                    placeholder="exemplo@email.com"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={textFieldSx}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                </Stack>
              </Box>
            </StyledFormCard>
          </Collapse>

          <Divider sx={{ my: 3, maxWidth: 800 }} />

          {/* Dados da vítima */}
          <Collapse
            in={opcaoIdentificacao === "terceiro"}
            timeout="auto"
            unmountOnExit
          >
            <StyledFormCard variant="blue">
              <Typography
                variant="subtitle1"
                sx={{ color: "#1e3a8a", fontWeight: 700, mb: 3 }}
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
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Nome da Vítima *
                  </FormLabel>
                  <TextField
                    placeholder="Nome completo ou primeiro nome"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={textFieldSx}
                    {...register("vitima_name")}
                    error={!!errors.vitima_name}
                    helperText={errors.vitima_name?.message}
                    required
                  />
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Local de Trabalho da Vítima *
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
                    {...register("vitima_local_trabalho")}
                    error={!!errors.vitima_local_trabalho}
                    helperText={errors.vitima_local_trabalho?.message}
                    required
                  />
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    CPF da Vítima (Opcional)
                  </FormLabel>
                  <TextField
                    placeholder="Digite o CPF da vítima"
                    variant="outlined"
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon
                              sx={{ color: "#9CA3AF", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={textFieldSx}
                    {...register("vitima_cpf")}
                    error={!!errors.vitima_cpf}
                    helperText={errors.vitima_cpf?.message}
                  />
                </Stack>
                <Stack>
                  <FormLabel sx={{ fontWeight: 600, color: "#4B5563", mb: 1 }}>
                    Idade da Vítima (Opcional)
                  </FormLabel>
                  <TextField
                    placeholder="Idade aproximada"
                    variant="outlined"
                    size="small"
                    slotProps={{
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
                    {...register("vitima_idade")}
                    error={!!errors.vitima_idade}
                    helperText={errors.vitima_idade?.message}
                  />
                </Stack>
              </Box>
            </StyledFormCard>
          </Collapse>
        </Box>
      </Box>

      <ActionButtons
        onVoltar={() => (window.location.href = "/")}
        onProsseguir={handleSubmit(onSubmit)}
        labelVoltar="Preencher Novamente"
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
