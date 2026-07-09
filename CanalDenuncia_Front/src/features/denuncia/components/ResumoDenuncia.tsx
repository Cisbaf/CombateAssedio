import { Box, Typography, Stack, Divider, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import { FormatCPF, FormatPhone } from "@/shared/formatters";

function formatEnumLabel(text?: string) {
  if (!text) return "-";
  return text.replace(/_/g, " ");
}

interface ResumoDenunciaProps {
  dadosFormulario: DadosFormulario;
}

export default function ResumoDenuncia({ dadosFormulario }: ResumoDenunciaProps) {
  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo: boolean = step0.isAnonimo;
  const tipoDenunciante: string = step0.tipoDenunciante;

  return (
    <Stack spacing={4} sx={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "left" }}>
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
          <PersonIcon sx={{ color: "var(--primary)" }} /> 1. Identificação Inicial
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
                    {FormatCPF(step0.cpf)}
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
                    {FormatPhone(step0.telefone)}
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
                      {FormatCPF(step0.vitima_cpf)}
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
          <CrisisAlertIcon sx={{ color: "var(--primary)" }} /> 2. Informações do Ofensor
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
          <LocationOnIcon sx={{ color: "var(--primary)" }} /> 3. Data, Local e Contexto
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
          <DescriptionIcon sx={{ color: "var(--primary)" }} /> 4. Descrição Detalhada
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
                  sx={{ whiteSpace: "pre-line", mt: 1, color: "#334155", wordBreak: "break-word" }}
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
            <AttachmentIcon sx={{ color: "var(--primary)" }} /> 4. Anexos
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
  );
}
