"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import StepA from "@/shared/views/denuncia/StepA";
import StepB from "@/shared/views/denuncia/StepB";
import StepC from "@/shared/views/denuncia/StepC";
import StepD from "@/shared/views/denuncia/StepD";
import StepE from "@/shared/views/denuncia/StepE";
import StepF from "@/shared/views/denuncia/StepF";
import type { DadosFormulario } from "@/shared/types/denuncia";

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
      console.log(`Dados acumulados após Etapa ${step}:`, novosDados);
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
          <StepA onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 1 && (
          <StepB onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 2 && (
          <StepC onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
        )}
        {step === 3 && (
          <StepD onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
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
