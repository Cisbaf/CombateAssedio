"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepDSchema,
  type StepDFormData,
} from "@/shared/schemas/validationSchemas";

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
  const [arquivos, setArquivos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validFiles = selectedFiles.filter(
        (file) => file.size <= 10 * 1024 * 1024,
      );
      if (validFiles.length !== selectedFiles.length) {
        alert(
          "Alguns arquivos excedem o limite de 10MB e não foram adicionados.",
        );
      }
      setArquivos((prev) => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const selectedFiles = Array.from(e.dataTransfer.files);
      const validFiles = selectedFiles.filter(
        (file) => file.size <= 10 * 1024 * 1024,
      );
      if (validFiles.length !== selectedFiles.length) {
        alert(
          "Alguns arquivos excedem o limite de 10MB e não foram adicionados.",
        );
      }
      setArquivos((prev) => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removerArquivo = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: StepDFormData) => {
    onAvançar(data);
  };

  return {
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
  };
}
