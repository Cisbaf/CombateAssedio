"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Alert,
  Snackbar,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";

import { enviarDenuncia } from "@/api/denunciaApi";
import type { DadosFormulario } from "@/shared/types/denuncia";
import StepHeader from "@/shared/StepHeader";

function formatCPF(cpf?: string) {
  if (!cpf) return "-";
  if (cpf.length === 11)
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return cpf;
}

function formatTelefone(tel?: string) {
  if (!tel) return "-";
  if (tel.length === 11)
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return tel;
}

function formatEnumLabel(text?: string) {
  if (!text) return "-";
  return text.replace(/_/g, " ");
}

interface StepEProps {
  dadosFormulario: DadosFormulario;
  onAvançar: (protocolo: string) => void;
  onVoltar: () => void;
}

export default function StepE({
  dadosFormulario,
  onAvançar,
  onVoltar,
}: StepEProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo: boolean = step0.isAnonimo;
  const tipoDenunciante: string = step0.tipoDenunciante;

  const handleEnviar = async () => {
    setLoading(true);
    setErrorMessage("");

    const result = await enviarDenuncia(dadosFormulario);

    if (result && result.protocolo) {
      onAvançar(result.protocolo);
    } else {
      setErrorMessage("Não foi possível conectar com o servidor da API.");
      setOpenSnack(true);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ width: "auto", height: "auto", margin: "0 auto" }}>
      <StepHeader
        Icon={RateReviewIcon}
        title="Etapa E - Revisão e Confirmação"
        subtitle="Verifique todas as informações antes de enviar a denúncia"
      />

      <Box sx={{ backgroundColor: "white", padding: "2rem" }}>
        <Alert
          severity="warning"
          sx={{
            borderRadius: "8px",
            border: "1px solid var(--warning)",
            backgroundColor: "#FEF3C7",
            mb: 4,
          }}
        >
          <strong>Revise com atenção!</strong> Após o envio, a denúncia não
          poderá ser alterada.
        </Alert>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "8px" }}>
            <strong>Erro ao enviar:</strong> {errorMessage}
          </Alert>
        )}

        <Stack spacing={4} sx={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Identificação */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#1e3a8a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PersonIcon sx={{ color: "var(--primary)" }} /> 1. Identificação
              Inicial
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Tipo de Denunciante
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {tipoDenunciante === "VITIMA"
                      ? "Sou a vítima"
                      : "Sou testemunha/terceiro"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Anonimato
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {isAnonimo
                      ? "Prefiro permanecer anônimo"
                      : "Quero me identificar"}
                  </Typography>
                </Grid>
                {!isAnonimo && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Nome do Denunciante
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {step0.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        CPF
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCPF(step0.cpf)}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Idade
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {step0.idade ? `${step0.idade} anos` : "-"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Telefone
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatTelefone(step0.telefone)}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="caption" color="text.secondary">
                        E-mail
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {step0.email || "-"}
                      </Typography>
                    </Grid>
                  </>
                )}
                {tipoDenunciante === "TERCEIRO" && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      <Divider sx={{ my: 1 }} />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#475569", mt: 1 }}
                      >
                        Dados da Vítima
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Nome da Vítima
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {step0.vitima_name || "-"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Local de Trabalho da Vítima
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {step0.vitima_local_trabalho || "-"}
                      </Typography>
                    </Grid>
                    {step0.vitima_idade && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          Idade da Vítima
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {step0.vitima_idade} anos
                        </Typography>
                      </Grid>
                    )}
                    {step0.vitima_cpf && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">
                          CPF da Vítima
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatCPF(step0.vitima_cpf)}
                        </Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Ofensor */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#1e3a8a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CrisisAlertIcon sx={{ color: "var(--primary)" }} /> 2.
              Informações do Ofensor
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Nome do Acusado
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#b91c1c" }}
                  >
                    {step1.name || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Local / Setor de Trabalho
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step1.local_trabalho || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Contexto */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#1e3a8a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOnIcon sx={{ color: "var(--primary)" }} /> 3. Data, Local
              e Contexto
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Data do Ocorrido
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step2.data_ocorrido
                      ? new Date(
                          step2.data_ocorrido + "T00:00:00",
                        ).toLocaleDateString("pt-BR")
                      : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Horário Aproximado
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step2.horario_ocorrido || "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">
                    Local do Incidente
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step2.local_ocorrido || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Descrição */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#1e3a8a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DescriptionIcon sx={{ color: "var(--primary)" }} /> 4. Descrição
              Detalhada
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">
                    Categorias de Assédio
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step3.categorias
                      ? step3.categorias
                          .split(",")
                          .map((c: string) => formatEnumLabel(c))
                          .join(", ")
                      : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">
                    Impacto Emocional
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step3.estado_emocional
                      ? step3.estado_emocional
                          .split(",")
                          .map((e: string) => formatEnumLabel(e))
                          .join(", ")
                      : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Relato dos Fatos
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-line", mt: 1, color: "#334155" }}
                    >
                      {step3.descricao || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Botões */}
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
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            ← Voltar e Editar
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleEnviar}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            backgroundImage:
              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            "&:hover": {
              backgroundImage:
                "linear-gradient(135deg, #059669 0%, #047857 100%)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <Typography
              variant="subtitle2"
              sx={{ color: "white", fontWeight: 600 }}
            >
              ✅ Enviar Denúncia
            </Typography>
          )}
        </Button>
      </Box>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
