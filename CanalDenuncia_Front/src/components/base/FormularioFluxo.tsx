"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepA from "@/components/base/StepA";


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

}

const onFinalSubmit = async (data: formFluxoCompleto) => {
    const dadosFormatados = {
        ...data,
        idadeVitima: data.idadeVitima ? parseInt(data.idadeVitima, 10) : null,
        idadeIdentificador: data.idadeIdentificador ? parseInt(data.idadeIdentificador, 10) : null,
    };
};



export default function FormularioFluxo() {
    const [step, setStep] = useState<number>(1);

    const proximaEtapa = () => setStep((prev) => prev + 1);
    const etapaAnterior = () => setStep((prev) => prev - 1);

    const methods = useForm<formFluxoCompleto>({
    });

    return (
        <FormProvider {...methods}>
            <Box sx={{ p: 4 }}>

                {step === 1 && (
                    <StepA onAvançar={proximaEtapa}  onVoltar={etapaAnterior}/>
                )}

                
            </Box>
        </FormProvider>
    );
}