"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";

interface StepEProps {
  dadosFormulario: {
    step0?: any;
    step1?: any;
    step2?: any;
    step3?: any;
  };
  onAvançar: (protocolo: string) => void;
  onVoltar: () => void;
}

export default function StepE({ dadosFormulario, onAvançar, onVoltar }: StepEProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo = step0.isAnonimo;
  const tipoDenunciante = step0.tipoDenunciante; // "VITIMA" or "TERCEIRO"

  const formatCPF = (cpf?: string) => {
    if (!cpf) return "-";
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  };

  const formatTelefone = (tel?: string) => {
    if (!tel) return "-";
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return tel;
  };

  const formatEnumLabel = (text?: string) => {
    if (!text) return "-";
    return text.replace(/_/g, " ");
  };

  const mapFormToBackend = () => {
    let vitima = null;
    if (tipoDenunciante === "VITIMA") {
      if (!isAnonimo) {
        vitima = {
          nome: step0.name || "",
          idade: step0.idade ? parseInt(step0.idade, 10) : null,
          cpf: step0.cpf || "",
          email: step0.email || "",
          telefone: step0.telefone || "",
          localTrabalho: null,
        };
      }
    } else {
      vitima = {
        nome: step0.vitima_name || "",
        idade: step0.vitima_idade ? parseInt(step0.vitima_idade, 10) : null,
        cpf: step0.vitima_cpf || "",
        email: null,
        telefone: null,
        localTrabalho: step0.vitima_local_trabalho || "",
      };
    }

    let terceiro = null;
    if (tipoDenunciante === "TERCEIRO" && !isAnonimo) {
      terceiro = {
        nome: step0.name || "",
        idade: step0.idade ? parseInt(step0.idade, 10) : null,
        cpf: step0.cpf || "",
        email: step0.email || "",
        telefone: step0.telefone || "",
      };
    }

    const ofensor = {
      nome: step1.name || "",
      localTrabalho: step1.local_trabalho || "",
    };

    const relato = {
      categoria: step3.categorias || "",
      descricao: step3.descricao || "",
      estadoEmocional: step3.estado_emocional || "",
      dataOcorrido: step2.data_ocorrido || "",
      horarioOcorrido: step2.horario_ocorrido ? `${step2.horario_ocorrido}:00` : "00:00:00",
      localOcorrido: step2.local_ocorrido || "",
    };

    return {
      tipoDenunciante,
      isAnonimo,
      status: "PENDENTE",
      vitima,
      terceiro,
      ofensor,
      relato,
    };
  };

  const handleEnviar = async () => {
    setLoading(true);
    setErrorMessage("");

    const payload = mapFormToBackend();
    console.log("Enviando denúncia para o backend:", payload);

    try {
      const response = await fetch("http://localhost:8080/api/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: Código ${response.status}`);
      }

      const result = await response.json();
      console.log("Denúncia criada com sucesso:", result);

      if (result && result.protocolo) {
        onAvançar(result.protocolo);
      } else {
        throw new Error("Protocolo não retornado pelo servidor.");
      }
    } catch (err: any) {
      console.error("Erro ao enviar denúncia:", err);
      setErrorMessage(err.message || "Não foi possível conectar com o servidor da API.");
      setOpenSnack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "auto", height: "auto", margin: "0 auto" }}>
      {/* Cabeçalho */}
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          backgroundColor: "var(--primary)",
          borderRadius: "8px 8px 0 0",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center" }}
        >
          <RateReviewIcon sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }} />
          Etapa E - Revisão e Confirmação
        </Typography>
        <Typography variant="body1">
          Verifique todas as informações antes de enviar a denúncia
        </Typography>
      </Box>

      {/* Corpo */}
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
          <strong>Revise com atenção!</strong> Após o envio, a denúncia não poderá ser alterada. Certifique-se de que todas as informações estão corretas.
        </Alert>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "8px" }}>
            <strong>Erro ao enviar:</strong> {errorMessage}
          </Alert>
        )}

        <Stack spacing={4} sx={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Seção 1: Identificação */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ color: "var(--primary)" }} /> 1. Identificação Inicial
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Tipo de Denunciante</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {tipoDenunciante === "VITIMA" ? "🎯 Sou a vítima do assédio/discriminação" : "👁️ Sou testemunha/terceiro"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Anonimato</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {isAnonimo ? "🕵️ Sim, prefiro permanecer anônimo" : "✋ Não, quero me identificar"}
                  </Typography>
                </Grid>

                {!isAnonimo && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">Nome do Denunciante</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.name || "-"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">CPF</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCPF(step0.cpf)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">Idade</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.idade ? `${step0.idade} anos` : "-"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">Telefone</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatTelefone(step0.telefone)}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="caption" color="text.secondary">E-mail</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.email || "-"}</Typography>
                    </Grid>
                  </>
                )}

                {tipoDenunciante === "TERCEIRO" && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#475569", mt: 1 }}>Dados da Vítima</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">Nome da Vítima</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.vitima_name || "-"}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">Local de Trabalho da Vítima</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.vitima_local_trabalho || "-"}</Typography>
                    </Grid>
                    {step0.vitima_idade && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">Idade da Vítima</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{step0.vitima_idade} anos</Typography>
                      </Grid>
                    )}
                    {step0.vitima_cpf && (
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="caption" color="text.secondary">CPF da Vítima</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCPF(step0.vitima_cpf)}</Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Seção 2: Ofensor */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <CrisisAlertIcon sx={{ color: "var(--primary)" }} /> 2. Informações do Ofensor
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Nome do Acusado</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#b91c1c" }}>{step1.name || "-"}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Local / Setor de Trabalho</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{step1.local_trabalho || "-"}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Seção 3: Contexto */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ color: "var(--primary)" }} /> 3. Data, Local e Contexto
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Data do Ocorrido</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step2.data_ocorrido ? new Date(step2.data_ocorrido + "T00:00:00").toLocaleDateString("pt-BR") : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Horário Aproximado</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{step2.horario_ocorrido || "-"}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">Local do Incidente</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{step2.local_ocorrido || "-"}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider />

          {/* Seção 4: Descrição */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <DescriptionIcon sx={{ color: "var(--primary)" }} /> 4. Descrição Detalhada
            </Typography>
            <Box sx={{ pl: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">Categorias de Assédio</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step3.categorias ? step3.categorias.split(",").map((c: string) => formatEnumLabel(c)).join(", ") : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">Impacto Emocional</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step3.estado_emocional ? step3.estado_emocional.split(",").map((e: string) => formatEnumLabel(e)).join(", ") : "-"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ p: 2, backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <Typography variant="caption" color="text.secondary">Relato dos Fatos</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 1, color: "#334155" }}>
                      {step3.descricao || "-"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Stack>
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
          mt: 4,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "darkgray" },
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={onVoltar}
        >
          <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600 }}>
            ← Voltar e Editar
          </Typography>
        </Button>

        <Button
          variant="contained"
          color="success"
          disabled={loading}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            backgroundImage: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            "&:hover": {
              backgroundImage: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            },
          }}
          onClick={handleEnviar}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600 }}>
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
        <Alert onClose={() => setOpenSnack(false)} severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
