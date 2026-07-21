"use client";
import FormularioFluxo from "@/features/denuncia/components/FormularioFluxo";
import ProgressionBar from "@/features/denuncia/components/ProgressionBar";
import { useState } from "react";

export default function Home() {
  const [stepActive, setStepActive] = useState<number>(0);

  const handleNextStep = (Step: number) => {
    setStepActive(Step);
    console.log(Step);
  };

  return (
    <>
      <ProgressionBar activeStep={stepActive} />

      <FormularioFluxo StepFormulario={handleNextStep} />
    </>
  );
}
