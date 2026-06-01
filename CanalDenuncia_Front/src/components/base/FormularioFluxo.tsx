"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepA from "@/components/base/StepA";
import StepB from "@/components/base/StepB";
import StepC from "@/components/base/StepC";
import StepD from "@/components/base/StepD";
export type formFluxoCompleto = {

    nomeVitima?: string;
    idadeVitima?: string;
    cpfVitima?: string;
    emailVitima?: string;
    telefoneVitima?: string;
    local_trabalhoVitima?: string;

    nomeIdentificador?: string;
    idadeIdentificador?: string;
    cpfIdentificador?: string;
    emailIdentificador?: string;
    telefoneIdentificador?: string;
    local_trabalhoIdentificador?: string;

    nomeOfensor?: string;
    emailOfensor?: string;
    setorOfensor?: string;
    cargoOfensor?: string;

    data_ocorrido?: string;
    horario_ocorrido?: string;
    local_ocorrido?: string;

    descricao?: string;
    categoria?: string;
    estadoEmocional?: string;
    evidencias?: boolean;
    tipoEvidencias?: string;

}

const onFinalSubmit = async (data: formFluxoCompleto) => {
    const dadosFormatados = {
        ...data,
        idadeVitima: data.idadeVitima ? parseInt(data.idadeVitima, 10) : null,
        idadeIdentificador: data.idadeIdentificador ? parseInt(data.idadeIdentificador, 10) : null,
    };
    console.log("Dados prontos para o envio final:", dadosFormatados);
};



export default function FormularioFluxo({ StepFormulario }: { StepFormulario: (step: number) => void }) {
    const [step, setStep] = useState<number>(0);
    const [dadosFormulario, setDadosFormulario] = useState({});

    const methods = useForm<formFluxoCompleto>({
    mode: 'onSubmit',
  });

    const proximaEtapa = () => {
        const novoStep = step + 1
        setStep(novoStep);
        StepFormulario(novoStep);
    }
    const etapaAnterior = () => {
        const novoStep = step - 1
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
        }}>
            <FormProvider {...methods}>
                <Box>
                    {step === 0 && (
                        
                        <StepA onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
                    )}
                    {step === 0 && (
                        <StepB onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
                    )}
                    {step === 0 && (
                        <StepC onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
                    )}
                    {step === 0 && (
                        <StepD onAvançar={proximaEtapa} onVoltar={etapaAnterior} />
                    )}
 
                </Box>
            </FormProvider>
        </Box>
    );
}