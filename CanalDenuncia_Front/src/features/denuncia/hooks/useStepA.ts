"use client";

import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AlertColor } from "@mui/material";
import {
  getStepASchema,
  type StepAFormData,
} from "@/features/denuncia/schemas/validationSchemas";

interface UseStepAProps {
  onAvançar: (dados: StepAFormData) => void;
}

export function useStepA({ onAvançar }: UseStepAProps) {
  const [opcaoIdentificacao, setOpcaoIdentificacao] = useState("");
  const [opcaoAnonimato, setOpcaoAnonimato] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const dynamicSchema = getStepASchema(opcaoAnonimato, opcaoIdentificacao);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepAFormData>({
    resolver: zodResolver(dynamicSchema as any),
  });

  const handleIdentificacaoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpcaoIdentificacao(event.target.value);
  };

  const handleAnonimatoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpcaoAnonimato(event.target.value);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const onSubmit = (data: StepAFormData) => {
    if (opcaoIdentificacao === "" || opcaoAnonimato === "") {
      setOpenSnack(true);
      setAlertMessage(
        "Por favor, os campos de identificação e anonimato são obrigatórios.",
      );
      setAlertType("error");
      return;
    }

    const dataFinal: StepAFormData = {
      isAnonimo: opcaoAnonimato === "true",
      tipoDenunciante: opcaoIdentificacao === "vitima" ? "VITIMA" : "TERCEIRO",
    };

    if (opcaoAnonimato === "false") {
      dataFinal.name = data.name;
      dataFinal.idade = data.idade;
      dataFinal.cpf = data.cpf;
      dataFinal.email = data.email;
      dataFinal.telefone = data.telefone;
    }
    if (opcaoIdentificacao === "terceiro") {
      dataFinal.vitima_name = data.vitima_name;
      dataFinal.vitima_idade = data.vitima_idade;
      dataFinal.vitima_cpf = data.vitima_cpf;
      dataFinal.vitima_local_trabalho = data.vitima_local_trabalho;
    }

    setOpenSnack(true);
    setAlertMessage("Dados validados com sucesso.");
    setAlertType("success");

    onAvançar(dataFinal);
  };

  return {
    opcaoIdentificacao,
    opcaoAnonimato,
    openSnack,
    alertMessage,
    alertType,
    errors,
    register,
    handleSubmit,
    handleIdentificacaoChange,
    handleAnonimatoChange,
    handleCloseSnack,
    onSubmit,
  };
}
