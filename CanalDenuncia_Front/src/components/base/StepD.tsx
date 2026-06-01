"use client";

import { useState, type ChangeEvent, useEffect } from "react";
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
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";

import InfoBox from "../toolTips/infoBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AssignmentIcon from "@mui/icons-material/Assignment";

const categoriasOptions = [
  {
    value: "Assédio Moral",
    title: "Assédio Moral",
    desc: "Humilhação, intimidação, perseguição ou constrangimento",
  },
  {
    value: "Assédio Sexual",
    title: "Assédio Sexual",
    desc: "Comportamento sexual indesejado, comentários ou toques inapropriados",
  },
  {
    value: "Discriminação por Gênero",
    title: "Discriminação por Gênero",
    desc: "Tratamento desigual baseado em gênero ou identidade de gênero",
  },
  {
    value: "Discriminação Racial",
    title: "Discriminação Racial",
    desc: "Racismo, preconceito ou tratamento desigual por etnia/cor",
  },
  {
    value: "Discriminação por Orientação Sexual",
    title: "Discriminação por Orientação Sexual",
    desc: "Homofobia, transfobia ou preconceito relacionado",
  },
  {
    value: "Discriminação por Idade",
    title: "Discriminação por Idade",
    desc: "Etarismo ou tratamento desigual baseado na idade",
  },
  {
    value: "Discriminação Religiosa",
    title: "Discriminação Religiosa",
    desc: "Intolerância ou preconceito baseado em crenças religiosas",
  },
];

const stepDSchema = z.object({
  categorias: z.string().min(1, "Selecione pelo menos uma categoria"),
  descricao: z
    .string()
    .min(2, "Descreva detalhadamente a denúncia")
    .max(500, "Descrição máxima de 500 caracteres"),
});

type StepFormData = z.infer<typeof stepDSchema>;

interface StepDProps {
  onAvançar: (dados: StepFormData) => void;
  onVoltar: () => void;
}

export default function StepD({ onAvançar, onVoltar }: StepDProps) {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >([]);

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
    },
  });

  const descricaoValue = watch("descricao", "") || "";
  const charCount = descricaoValue.length;

  useEffect(() => {
    // Atualiza o valor do formulário como uma string separada por vírgula
    setValue("categorias", categoriasSelecionadas.join(", "), {
      shouldValidate: categoriasSelecionadas.length > 0,
    });
  }, [categoriasSelecionadas, setValue]);

  const handleCategoriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCategoriasSelecionadas((prev) => [...prev, value]);
    } else {
      setCategoriasSelecionadas((prev) => prev.filter((c) => c !== value));
    }
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
              sx={{ fontWeight: 600, marginBottom: "8px", color: "#374151" }}
            >
              Categoria da Denúncia
            </Typography>

            <FormControl
              component="fieldset"
              fullWidth
              error={!!errors.categorias}
            >
              <FormGroup>
                <Stack spacing={2} sx={{ width: "100%", maxWidth: 800 }}>
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
                        transition: "all 0.2s ease",
                        "&:has(input:checked)": {
                          borderColor: "#3b82f6",
                          backgroundColor: "#eff6ff",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </FormGroup>
              {errors.categorias && (
                <FormHelperText sx={{ fontSize: "0.875rem", mt: 1 }}>
                  {errors.categorias.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ pt: "2rem" }}>
            <Divider sx={{ color: "var(--primary)", fontWeight: 600, mb: 2 }} />
            <Stack spacing={2} sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
              <FormControl fullWidth error={!!errors.descricao}>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: "#4B5563",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Descrição Detalhada da Denúncia *
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
