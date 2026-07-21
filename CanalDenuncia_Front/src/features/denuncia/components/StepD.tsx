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
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LabelIcon from "@mui/icons-material/Label";
import DescriptionIcon from "@mui/icons-material/Description";
import ShieldIcon from "@mui/icons-material/Shield";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useEffect } from "react";

import {
  stepDSchema,
  type StepDFormData,
} from "@/features/denuncia/schemas/validationSchemas";
import InfoBox from "@/shared/infoBox";
import StepHeader from "@/features/denuncia/components/StepHeader";
import ActionButtons from "@/features/denuncia/components/ActionButtons";

const categoriasOptions = [
  {
    value: " Assédio Moral",
    title: "Assédio Moral",
    desc: "Humilhação, intimidação, perseguição ou constrangimento",
  },
  {
    value: " Assédio Sexual",
    title: "Assédio Sexual",
    desc: "Comportamento sexual indesejado, comentários ou toques inapropriados",
  },
  {
    value: " Discriminação por Gênero",
    title: "Discriminação por Gênero",
    desc: "Tratamento desigual baseado em gênero ou identidade de gênero",
  },
  {
    value: " Discriminação por Raça",
    title: "Discriminação Racial",
    desc: "Racismo, preconceito ou tratamento desigual por etnia/cor",
  },
  {
    value: " Discriminação por Orientação Sexual",
    title: "Discriminação por Orientação Sexual",
    desc: "Homofobia, transfobia ou preconceito relacionado",
  },
  {
    value: " Discriminação por Idade",
    title: "Discriminação por Idade",
    desc: "Etarismo ou tratamento desigual baseado na idade",
  },
  {
    value: " Discriminação Religiosa",
    title: "Discriminação Religiosa",
    desc: "Intolerância ou preconceito baseado em crenças religiosas",
  },
  {
    value: "Outro",
    title: "Outro",
    desc: "Caso sua denúncia se enquadre em outra categoria não listada acima, selecione esta opção e escreva na descrição.",
  },
];

const estadoEmocionalOptions = [
  {
    value: " Incomodo Desconforto",
    title: "Incômodo/Desconforto",
    desc: "Gerou incômodo ou sentimentos de desconforto.",
  },
  {
    value: " Ansiedade Preocupação",
    title: "Ansiedade/Preocupação",
    desc: "Causou episódios de ansiedade ou preocupação constante.",
  },
  {
    value: " Medo Insegurança",
    title: "Medo/Insegurança",
    desc: "Gerou insegurança ou receio no ambiente de trabalho.",
  },
  {
    value: " Depressão Angústia",
    title: "Depressão/Angústia",
    desc: "Desencadeou sentimentos de profunda tristeza ou angústia.",
  },
  {
    value: " Trauma Severo",
    title: "Trauma Severo",
    desc: "Gerou abalo psicológico gravíssimo ou estresse pós-traumático.",
  },
  {
    value: "Nenhum Impacto",
    title: "Nenhum Impacto",
    desc: "O incidente não gerou impacto perceptível até o momento.",
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
  initialData?: any;
  onAvançar: (dados: StepDFormData) => void;
  onVoltar: () => void;
}

export default function StepD({
  initialData,
  onAvançar,
  onVoltar,
}: StepDProps) {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >(initialData?.categorias ? initialData.categorias.split(",") : []);
  const [emocionaisSelecionados, setEmocionaisSelecionados] = useState<
    string[]
  >(
    initialData?.estado_emocional
      ? initialData.estado_emocional.split(",")
      : [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepDFormData>({
    resolver: zodResolver(stepDSchema),
    defaultValues: initialData || {
      categorias: "",
      descricao: "",
      estado_emocional: "",
      aceitoPrivacidade: false,
      autorizoLgpd: false,
      entendoSigilo: false,
    },
  });

  const descricaoValue = watch("descricao", "") || "";
  const charCount = descricaoValue.length;

  useEffect(() => {
    setValue("categorias", categoriasSelecionadas.join(","), {
      shouldValidate: categoriasSelecionadas.length > 0,
    });
  }, [categoriasSelecionadas, setValue]);

  useEffect(() => {
    setValue("estado_emocional", emocionaisSelecionados.join(","), {
      shouldValidate: emocionaisSelecionados.length > 0,
    });
  }, [emocionaisSelecionados, setValue]);

  const handleCategoriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCategoriasSelecionadas((prev) => [...prev, value]);
    } else {
      setCategoriasSelecionadas((prev) => prev.filter((c) => c !== value));
    }
  };

  const handleEmocionalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      if (value === "Nenhum Impacto") {
        setEmocionaisSelecionados(["Nenhum Impacto"]);
      } else {
        setEmocionaisSelecionados((prev) => [...prev, value]);
      }
    } else {
      setEmocionaisSelecionados((prev) => prev.filter((c) => c !== value));
    }
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
                          disabled={
                            emocionaisSelecionados.includes("Nenhum Impacto") &&
                            opt.value !== "Nenhum Impacto"
                          }
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
                        checked={!!watch(field)}
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
              {errors.entendoSigilo && (
                <FormHelperText
                  error
                  sx={{
                    fontSize: "0.875rem",
                    mt: 2,
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  Você precisa aceitar o consentimento para prosseguir.
                </FormHelperText>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <ActionButtons
        onVoltar={onVoltar}
        onProsseguir={handleSubmit((dados) => {
          onAvançar({ ...dados } as any);
        })}
      />
    </Box>
  );
}
