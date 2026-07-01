"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AlertColor } from "@mui/material";
import {
  stepBSchema,
  type StepBFormData,
} from "@/features/denuncia/schemas/validationSchemas";

interface UseStepBProps {
  onAvançar: (dados: StepBFormData) => void;
}

export function useStepB({ onAvançar }: UseStepBProps) {
  const [openSnack, setOpenSnack] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepBFormData>({
    resolver: zodResolver(stepBSchema),
  });

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const onSubmit = (data: StepBFormData) => {
    setOpenSnack(true);
    setAlertMessage("Dados validados com sucesso.");
    setAlertType("success");
    onAvançar(data);
  };

  return {
    openSnack,
    alertMessage,
    alertType,
    errors,
    register,
    handleSubmit,
    handleCloseSnack,
    onSubmit,
  };
}
