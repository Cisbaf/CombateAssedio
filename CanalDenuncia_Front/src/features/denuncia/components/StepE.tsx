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
  LinearProgress,
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { enviarDenuncia, getDenunciaFromProtocolo, postAnexos } from "@/api/denunciaApi";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import StepHeader from "@/features/denuncia/components/StepHeader";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo: boolean = step0.isAnonimo;
  const tipoDenunciante: string = step0.tipoDenunciante;

  const handleEnviar = async () => {
    setLoading(true);
    setErrorMessage("");
    setUploadProgress(0);
    setUploadMessage("Criando denúncia no sistema...");

    const result = await enviarDenuncia(dadosFormulario);

    if (result && result.protocolo) {
      const arquivosToUpload = step3.arquivos || [];
      if (arquivosToUpload.length > 0) {
        setUploadMessage("Aguardando ID da denúncia...");
        const denunciaCriada = await getDenunciaFromProtocolo(result.protocolo);
        
        if (denunciaCriada && denunciaCriada.id) {
          const total = arquivosToUpload.length;

          for (let i = 0; i < total; i++) {
            const arquivo = arquivosToUpload[i];
            setUploadMessage(`Enviando arquivo ${i + 1} de ${total}: ${arquivo.name}`);
            setUploadProgress(Math.round((i / total) * 100));

            const formData = new FormData();
            formData.append("arquivo", arquivo);
            postAnexos(denunciaCriada.id, formData);
          }
          setUploadProgress(100);
          setUploadMessage("Todos os arquivos enviados!");
        }
      }

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
          
          <Divider />

          {/* Anexos */}
          {step3.arquivos && step3.arquivos.length > 0 && (
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
                <AttachmentIcon sx={{ color: "var(--primary)" }} /> 4.
                Anexos
              </Typography>
              <Box sx={{ pl: 4 }}>
                <Stack spacing={1}>
                  {step3.arquivos?.map((arquivo: any, index: any) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 16, color: "#3b82f6" }} />{" "}
                      {arquivo.name}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Botões */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
          margin: "0 auto",
          px: 2,
          mt: 4,
          mb: 4,
        }}
      >
        {loading && uploadMessage && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography variant="body2" sx={{ color: "#475569", mb: 1, textAlign: "center", fontWeight: 500 }}>
              {uploadMessage}
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        )}
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", width: "100%" }}>
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
            {loading && !uploadMessage ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : loading ? (
              <Typography
                variant="subtitle2"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Enviando...
              </Typography>
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
