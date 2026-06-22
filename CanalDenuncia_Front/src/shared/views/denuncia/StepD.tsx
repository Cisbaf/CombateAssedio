"use client";

import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Stack,
  TextField,
  Divider,
  Button,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LabelIcon from "@mui/icons-material/Label";
import DescriptionIcon from "@mui/icons-material/Description";
import ShieldIcon from "@mui/icons-material/Shield";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import { useStepD } from "@/shared/views/denuncia/hooks/useStepD";
import type { StepDFormData } from "@/shared/schemas/validationSchemas";
import InfoBox from "@/shared/components/infoBox";
import StepHeader from "@/shared/StepHeader";
import ActionButtons from "@/shared/ActionButtons";

// ─── Dados de configuração ──────────────────────────────────────────────────

const categoriasOptions = [
  {
    value: "Assedio_Moral",
    title: "Assédio Moral",
    desc: "Humilhação, intimidação, perseguição ou constrangimento",
  },
  {
    value: "Assedio_Sexual",
    title: "Assédio Sexual",
    desc: "Comportamento sexual indesejado, comentários ou toques inapropriados",
  },
  {
    value: "Discriminacao_Genero",
    title: "Discriminação por Gênero",
    desc: "Tratamento desigual baseado em gênero ou identidade de gênero",
  },
  {
    value: "Discriminacao_Racial",
    title: "Discriminação Racial",
    desc: "Racismo, preconceito ou tratamento desigual por etnia/cor",
  },
  {
    value: "Discriminacao_Orientacao_Sexual",
    title: "Discriminação por Orientação Sexual",
    desc: "Homofobia, transfobia ou preconceito relacionado",
  },
  {
    value: "Discriminacao_Idade",
    title: "Discriminação por Idade",
    desc: "Etarismo ou tratamento desigual baseado na idade",
  },
  {
    value: "Discriminaçao_Religiosa",
    title: "Discriminação Religiosa",
    desc: "Intolerância ou preconceito baseado em crenças religiosas",
  },
  {
    value: "Outro",
    title: "Outro",
    desc: "Caso sua denúncia não se enquadre nas categorias acima, descreva abaixo.",
  },
];

const estadoEmocionalOptions = [
  {
    value: "Nenhum_Impacto",
    title: "Nenhum impacto aparente",
    desc: "O incidente não gerou impacto perceptível até o momento.",
  },
  {
    value: "Incomodo_Desconforto",
    title: "Incômodo/Desconforto",
    desc: "Gerou incômodo ou sentimentos de desconforto.",
  },
  {
    value: "Ansiedade_Preocupacao",
    title: "Ansiedade/Preocupação",
    desc: "Causou episódios de ansiedade ou preocupação constante.",
  },
  {
    value: "Medo_Inseguranca",
    title: "Medo/Insegurança",
    desc: "Gerou insegurança ou receio no ambiente de trabalho.",
  },
  {
    value: "Depressao_Angustia",
    title: "Depressão/Angústia",
    desc: "Desencadeou sentimentos de profunda tristeza ou angústia.",
  },
  {
    value: "Trauma_Severo",
    title: "Trauma severo",
    desc: "Gerou abalo psicológico gravíssimo ou estresse pós-traumático.",
  },
];

const checkCardSx = {
  margin: 0,
  padding: "12px 16px",
  border: "2px solid #e5e7eb",
  borderRadius: "12px",
  alignItems: "flex-start",
  height: "100%",
  transition: "all 0.2s ease",
  "&:hover": { borderColor: "#3b82f6" },
  "&:has(input:checked)": {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },
};

const consentCardSx = {
  margin: 0,
  padding: "16px",
  backgroundColor: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  width: "100%",
  "&:hover": { borderColor: "#cbd5e1" },
  "&:has(input:checked)": {
    borderColor: "#10b981",
    backgroundColor: "#f0fdf4",
  },
};

interface StepDProps {
  onAvançar: (dados: StepDFormData) => void;
  onVoltar: () => void;
}

export default function StepD({ onAvançar, onVoltar }: StepDProps) {
  const {
    categoriasSelecionadas,
    emocionaisSelecionados,
    arquivos,
    fileInputRef,
    charCount,
    errors,
    register,
    handleSubmit,
    handleCategoriaChange,
    handleEmocionalChange,
    handleFileChange,
    handleDragOver,
    handleDrop,
    removerArquivo,
    triggerFileInput,
    onSubmit,
  } = useStepD({ onAvançar });

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <ImageIcon sx={{ color: "#3b82f6", fontSize: 20 }} />;
    if (fileType === "application/pdf")
      return <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 20 }} />;
    return <InsertDriveFileIcon sx={{ color: "#6b7280", fontSize: 20 }} />;
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
          Icon={AssignmentIcon}
          title="Etapa D - Descrição Detalhada"
          subtitle="Forneça todos os detalhes do incidente"
        />

        <Box sx={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
          {/* Categorias */}
          <Box sx={{ pt: "2rem" }}>
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
              <LabelIcon sx={{ color: "var(--primary)" }} /> Categoria da
              Denúncia *
            </Typography>
            <FormControl
              component="fieldset"
              fullWidth
              error={!!errors.categorias}
            >
              <FormGroup>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: "1rem",
                    width: "100%",
                    maxWidth: 800,
                  }}
                >
                  {categoriasOptions.map((cat) => (
                    <FormControlLabel
                      key={cat.value}
                      control={
                        <Checkbox
                          checked={categoriasSelecionadas.includes(cat.value)}
                          onChange={handleCategoriaChange}
                          value={cat.value}
                          sx={{ "&.Mui-checked": { color: "#3b82f6" } }}
                        />
                      }
                      label={
                        <Stack sx={{ ml: 1 }}>
                          <Typography
                            sx={{ fontWeight: 700, color: "#374151" }}
                          >
                            {cat.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#6b7280" }}>
                            {cat.desc}
                          </Typography>
                        </Stack>
                      }
                      sx={checkCardSx}
                    />
                  ))}
                </Box>
              </FormGroup>
              {errors.categorias && (
                <FormHelperText sx={{ fontSize: "0.875rem", mt: 1 }}>
                  {errors.categorias.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Descrição */}
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Stack
              spacing={2}
              sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}
            >
              <FormControl fullWidth error={!!errors.descricao}>
                <FormLabel
                  sx={{
                    fontWeight: 700,
                    color: "#374151",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "1rem",
                  }}
                >
                  <DescriptionIcon sx={{ color: "var(--primary)" }} /> Descrição
                  Detalhada da Denúncia *
                  <InfoBox texto="Descreva detalhadamente a denúncia." />
                </FormLabel>
                <TextField
                  {...register("descricao")}
                  multiline
                  rows={8}
                  fullWidth
                  variant="outlined"
                  placeholder={`Descreva os fatos de forma clara e detalhada. Inclua:\n- O que exatamente aconteceu \n- Palavras ou ações específicas \n- Contexto da situação \n- Frequência (se aconteceu mais de uma vez)`}
                  sx={{
                    width: "100%",
                    maxWidth: 800,
                    margin: "0 auto",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      "&:hover fieldset": { borderColor: "#3b82f6" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mt: 1.5,
                    px: 1,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    {errors.descricao && (
                      <FormHelperText error sx={{ fontSize: "0.875rem", m: 0 }}>
                        {errors.descricao.message}
                      </FormHelperText>
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: charCount > 500 ? "#ef4444" : "#10b981",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      ml: 2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {charCount}/500 caracteres
                  </Typography>
                </Box>
              </FormControl>
            </Stack>
          </Box>

          {/* Estado Emocional */}
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                marginBottom: "8px",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <VisibilityIcon sx={{ color: "var(--primary)" }} /> Estado
              Emocional da Vítima *
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#4B5563",
                marginBottom: "16px",
                fontWeight: 500,
                ml: 4,
              }}
            >
              Como o incidente afetou emocionalmente? *
            </Typography>
            <FormControl
              component="fieldset"
              fullWidth
              error={!!errors.estado_emocional}
            >
              <FormGroup>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: "1rem",
                    width: "100%",
                    maxWidth: 800,
                  }}
                >
                  {estadoEmocionalOptions.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      control={
                        <Checkbox
                          checked={emocionaisSelecionados.includes(opt.value)}
                          onChange={handleEmocionalChange}
                          value={opt.value}
                          sx={{ "&.Mui-checked": { color: "#3b82f6" } }}
                        />
                      }
                      label={
                        <Stack sx={{ ml: 1 }}>
                          <Typography
                            sx={{ fontWeight: 700, color: "#374151" }}
                          >
                            {opt.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#6b7280" }}>
                            {opt.desc}
                          </Typography>
                        </Stack>
                      }
                      sx={checkCardSx}
                    />
                  ))}
                </Box>
              </FormGroup>
              {errors.estado_emocional && (
                <FormHelperText sx={{ fontSize: "0.875rem", mt: 1 }}>
                  {errors.estado_emocional.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Consentimento */}
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
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
              <ShieldIcon sx={{ color: "var(--primary)" }} /> Consentimento *
            </Typography>
            <Box
              sx={{
                maxWidth: 800,
                backgroundColor: "#fffbeb",
                border: "1px solid #fcd34d",
                borderRadius: "15px",
                p: 3,
              }}
            >
              <Stack spacing={2}>
                {[
                  {
                    field: "aceitoPrivacidade" as const,
                    label: (
                      <>
                        Li e concordo com a{" "}
                        <span
                          style={{
                            color: "#3b82f6",
                            fontWeight: 600,
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Política de Privacidade
                        </span>{" "}
                        e os{" "}
                        <span
                          style={{
                            color: "#3b82f6",
                            fontWeight: 600,
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Termos de Uso
                        </span>
                      </>
                    ),
                  },
                  {
                    field: "autorizoLgpd" as const,
                    label:
                      "Autorizo o tratamento de meus dados conforme a LGPD",
                  },
                  {
                    field: "entendoSigilo" as const,
                    label:
                      "Entendo que minha denúncia será investigada de forma sigilosa",
                  },
                ].map(({ field, label }) => (
                  <FormControlLabel
                    key={field}
                    control={
                      <Checkbox
                        {...register(field)}
                        sx={{ "&.Mui-checked": { color: "#10b981" } }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#374151" }}
                      >
                        {label}
                      </Typography>
                    }
                    sx={consentCardSx}
                  />
                ))}
              </Stack>
              {(errors.aceitoPrivacidade ||
                errors.autorizoLgpd ||
                errors.entendoSigilo) && (
                <FormHelperText
                  error
                  sx={{
                    fontSize: "0.875rem",
                    mt: 2,
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  Você precisa aceitar todos os termos e consentimentos para
                  prosseguir.
                </FormHelperText>
              )}
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
