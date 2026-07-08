"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import StepA from "@/features/denuncia/components/StepA";
import StepB from "@/features/denuncia/components/StepB";
import StepC from "@/features/denuncia/components/StepC";
import StepD from "@/features/denuncia/components/StepD";
import StepE from "@/features/denuncia/components/StepE";
import StepF from "@/features/denuncia/components/StepF";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";

export default function FormularioFluxo({
  StepFormulario,
}: {
  StepFormulario: (step: number) => void;
}) {
  const [step, setStep] = useState<number>(0);
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({});
  const [protocolo, setProtocolo] = useState<string>("");

  const proximaEtapa = (dadosEtapa: any) => {
    const novoStep = step + 1;
    setDadosFormulario((prev) => {
      const novosDados = { ...prev, [`step${step}`]: dadosEtapa };
      return novosDados;
    });
    setStep(novoStep);
    StepFormulario(novoStep);
  };

  const etapaAnterior = () => {
    const novoStep = step - 1;
    setStep(novoStep);
    StepFormulario(novoStep);
  };

  const concluirDenuncia = (protocoloGerado: string) => {
    setProtocolo(protocoloGerado);
    const novoStep = step + 1;
    setStep(novoStep);
    StepFormulario(novoStep);
  };

  return (
    <Box
      sx={{
        background: "white",
        maxWidth: "900px",
        margin: "0 auto",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <Box>
        {step === 0 && (
          <StepA initialData={dadosFormulario.step0} onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 1 && (
          <StepB initialData={dadosFormulario.step1} onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 2 && (
          <StepC initialData={dadosFormulario.step2} onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 3 && (
          <StepD initialData={dadosFormulario.step3} onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 4 && (
          <StepE
            dadosFormulario={dadosFormulario}
            onAvançar={concluirDenuncia}
            onVoltar={etapaAnterior}
          />
        )}
        {step === 5 && <StepF protocolo={protocolo} />}
      </Box>
    </Box>
  );
}
