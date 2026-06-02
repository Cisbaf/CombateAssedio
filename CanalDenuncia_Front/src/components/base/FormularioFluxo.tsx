"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import StepA from "@/components/base/StepA";
import StepB from "@/components/base/StepB";
import StepC from "@/components/base/StepC";
import StepD from "@/components/base/StepD";
import StepE from "@/components/base/StepE";
import StepF from "@/components/base/StepF";

export default function FormularioFluxo({ StepFormulario }: { StepFormulario: (step: number) => void }) {
    const [step, setStep] = useState<number>(0);
    const [dadosFormulario, setDadosFormulario] = useState<{
        step0?: any;
        step1?: any;
        step2?: any;
        step3?: any;
    }>({});
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
        const novoStep = step + 1; // Ir para Step 5 (Concluído)
        setStep(novoStep);
        StepFormulario(novoStep);
    };

    return (
        <Box sx={{
            background: 'white',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            overflow: 'hidden',
        }}>
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
                    <StepE dadosFormulario={dadosFormulario} onAvançar={concluirDenuncia} onVoltar={etapaAnterior} />
                )}
                {step === 5 && (
                    <StepF protocolo={protocolo} />
                )}
            </Box>
        </Box>
    );
}