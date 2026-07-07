"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepDSchema,
  type StepDFormData,
} from "@/features/denuncia/schemas/validationSchemas";

interface UseStepDProps {
  onAvançar: (dados: StepDFormData) => void;
}

export function useStepD({ onAvançar }: UseStepDProps) {
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >([]);
  const [emocionaisSelecionados, setEmocionaisSelecionados] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepDFormData>({
    resolver: zodResolver(stepDSchema),
    defaultValues: {
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
      setEmocionaisSelecionados((prev) => [...prev, value]);
    } else {
      setEmocionaisSelecionados((prev) => prev.filter((c) => c !== value));
    }
  };

  return {
    categoriasSelecionadas,
    emocionaisSelecionados,
    charCount,
    errors,
    register,
    handleSubmit,
    handleCategoriaChange,
    handleEmocionalChange,
  };
}
