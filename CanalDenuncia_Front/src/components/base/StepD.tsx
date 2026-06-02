"use client";

import { useState, type ChangeEvent, useEffect, useRef } from "react";
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

import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoBox from "../toolTips/infoBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepDSchema, type StepDFormData as StepFormData } from "./validationSchemas";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import LabelIcon from "@mui/icons-material/Label";
import DescriptionIcon from "@mui/icons-material/Description";
import ShieldIcon from "@mui/icons-material/Shield";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
    value:"Outro",
    title: "Outro",
    desc: "Caso sua denúncia não se enquadre nas categorias acima, descreva abaixo.",
  }
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

interface StepDProps {
  onAvançar: (dados: StepFormData) => void;
  onVoltar: () => void;
}

export default function StepD({ onAvançar, onVoltar }: StepDProps) {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [emocionaisSelecionados, setEmocionaisSelecionados] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon sx={{ color: "#3b82f6", fontSize: 20 }} />;
    if (fileType === "application/pdf") return <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 20 }} />;
    return <InsertDriveFileIcon sx={{ color: "#6b7280", fontSize: 20 }} />;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepFormData>({
    resolver: zodResolver(stepDSchema),
    defaultValues: {
      categorias: "",
      descricao: "",
      estado_emocional: "",
      aceitoPrivacidade: false,
      aceitoTermos: false,
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
      setEmocionaisSelecionados((prev) => [...prev, value]);
    } else {
      setEmocionaisSelecionados((prev) => prev.filter((c) => c !== value));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);
      if (validFiles.length !== selectedFiles.length) {
        alert("Alguns arquivos excedem o limite de 10MB e não foram adicionados.");
      }
      setArquivos(prev => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const selectedFiles = Array.from(e.dataTransfer.files);
      const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);
      if (validFiles.length !== selectedFiles.length) {
        alert("Alguns arquivos excedem o limite de 10MB e não foram adicionados.");
      }
      setArquivos(prev => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removerArquivo = (index: number) => {
    setArquivos(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: StepFormData) => {
    onAvançar(data);
    console.log("Dados da Etapa D:", data);
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
            Etapa D - Descrição Detalhada
          </Typography>
          <Typography variant="body1">
            Forneça todos os detalhes do incidente
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
          <Box sx={{ pt: "2rem" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "16px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <LabelIcon sx={{ color: "var(--primary)" }} /> Categoria da Denúncia *
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
                      sx={{
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
                      }}
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

          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Stack spacing={2} sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
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
                  <DescriptionIcon sx={{ color: "var(--primary)" }} /> Descrição Detalhada da Denúncia *
                  <InfoBox texto="Descreva detalhadamente a denúncia." />
                </FormLabel>
                <TextField
                  {...register("descricao")}
                  multiline
                  rows={8}
                  fullWidth
                  variant="outlined"
                  placeholder={`Descreva os fatos de forma clara e detalhada. Inclua:
- O que exatamente aconteceu 
- Palavras ou ações específicas 
- Contexto da situação 
- Frequência (se aconteceu mais de uma vez)`}
                  sx={{
                    width: "100%",
                    maxWidth: 800,
                    margin: "0 auto",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      "&:hover fieldset": {
                        borderColor: "#3b82f6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3b82f6",
                      },
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
          
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "8px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <VisibilityIcon sx={{ color: "var(--primary)" }} /> Estado Emocional da Vítima *
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#4B5563", marginBottom: "16px", fontWeight: 500, ml: 4 }}
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
                      sx={{
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
                      }}
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

          {/* Evidências / Anexos */}
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "8px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}
            >
              Evidências/Anexos (opcional)
            </Typography>

            <Box
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              sx={{
                width: "100%",
                maxWidth: 800,
                border: "2px dashed #cbd5e1",
                borderRadius: "15px",
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f8fafc",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "#3b82f6",
                  backgroundColor: "#f0f7ff",
                },
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*,application/pdf,audio/*,video/*"
              />
              <FolderOpenIcon sx={{ fontSize: 48, color: "#fbbf24", mb: 1.5 }} />
              <Typography sx={{ fontWeight: 700, color: "#374151" }}>
                Clique para enviar <span style={{ fontWeight: 400, color: "#6b7280" }}>ou arraste arquivos</span>
              </Typography>
              <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
                Até 5 arquivos • Máx. 10MB cada • Imagens, PDFs, áudios, vídeos
              </Typography>
            </Box>

            {/* Lista de Arquivos Selecionados */}
            {arquivos.length > 0 && (
              <Stack spacing={1} sx={{ mt: 2, maxWidth: 800 }}>
                {arquivos.map((file, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      backgroundColor: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {getFileIcon(file.type)}
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                        {file.name} <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: "8px" }}>({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        removerArquivo(idx);
                      }}
                      sx={{ minWidth: "auto", p: 0.5 }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {/* Consentimento */}
          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 3 }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, marginBottom: "16px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}
            >
              ✅ Consentimento *
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
                {/* 1. Política de Privacidade */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("aceitoPrivacidade")}
                      sx={{ "&.Mui-checked": { color: "#10b981" } }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
                      Li e concordo com a <span style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>Política de Privacidade</span>
                    </Typography>
                  }
                  sx={{
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
                  }}
                />

                {/* 2. Termos de Uso */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("aceitoTermos")}
                      sx={{ "&.Mui-checked": { color: "#10b981" } }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
                      Li e concordo com os <span style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>Termos de Uso</span>
                    </Typography>
                  }
                  sx={{
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
                  }}
                />

                {/* 3. LGPD */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("autorizoLgpd")}
                      sx={{ "&.Mui-checked": { color: "#10b981" } }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
                      Autorizo o tratamento de meus dados conforme a LGPD
                    </Typography>
                  }
                  sx={{
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
                  }}
                />

                {/* 4. Sigilo */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("entendoSigilo")}
                      sx={{ "&.Mui-checked": { color: "#10b981" } }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
                      Entendo que minha denúncia será investigada de forma sigilosa
                    </Typography>
                  }
                  sx={{
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
                  }}
                />
              </Stack>

              {/* Mensagens de erro de consentimento */}
              {(errors.aceitoPrivacidade || errors.aceitoTermos || errors.autorizoLgpd || errors.entendoSigilo) && (
                <FormHelperText error sx={{ fontSize: "0.875rem", mt: 2, textAlign: "center", fontWeight: 600 }}>
                  Você precisa aceitar todos os termos e consentimentos para prosseguir.
                </FormHelperText>
              )}
            </Box>
          </Box>
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
            "&:hover": { backgroundColor: "darkgray" },
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

      </Box>
    </Box>
  );
}
