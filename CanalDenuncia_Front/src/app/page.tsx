"use client";
import FormularioFluxo from "@/components/base/FormularioFluxo";
import ProgressionBar from "@/components/base/ProgressionBar";
import { useState } from "react";


export default function Home() {

  const [stepActive, setStepActive] = useState<number>(0);

  const handleNextStep = (Step: number) => {
    setStepActive(Step);
    console.log(Step);
  }

  return (
    <>
      <ProgressionBar activeStep={stepActive} />

      <FormularioFluxo StepFormulario={handleNextStep} />
    </>
  );
}