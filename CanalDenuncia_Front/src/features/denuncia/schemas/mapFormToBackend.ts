/** Monta o payload esperado pelo backend a partir dos dados acumulados do formulário */

import { DadosFormulario } from "./denunciaType";



export default function mapFormToBackend(dadosFormulario: DadosFormulario) {
  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo: boolean = step0.isAnonimo;
  const tipoDenunciante: string = step0.tipoDenunciante; // "VITIMA" | "TERCEIRO"

  let vitima = null;
  if (tipoDenunciante === "VITIMA") {
    if (!isAnonimo) {
      vitima = {
        nome: step0.name || "",
        idade: step0.idade ? parseInt(step0.idade, 10) : null,
        cpf: step0.cpf || "",
        email: step0.email || "",
        telefone: step0.telefone || "",
        localTrabalho: null,
      };
    }
  } else {
    vitima = {
      nome: step0.vitima_name || "",
      idade: step0.vitima_idade ? parseInt(step0.vitima_idade, 10) : null,
      cpf: step0.vitima_cpf || "",
      email: null,
      telefone: null,
      localTrabalho: step0.vitima_local_trabalho || "",
    };
  }

  let terceiro = null;
  if (tipoDenunciante === "TERCEIRO" && !isAnonimo) {
    terceiro = {
      nome: step0.name || "",
      idade: step0.idade ? parseInt(step0.idade, 10) : null,
      cpf: step0.cpf || "",
      email: step0.email || "",
      telefone: step0.telefone || "",
    };
  }

  const ofensor = {
    nome: step1.name || "",
    localTrabalho: step1.local_trabalho || "",
  };

  const relato = {
    categoria: step3.categorias || "",
    descricao: step3.descricao || "",
    estadoEmocional: step3.estado_emocional || "",
    dataOcorrido: step2.data_ocorrido || "",
    horarioOcorrido: step2.horario_ocorrido
      ? `${step2.horario_ocorrido}:00`
      : "00:00:00",
    localOcorrido: step2.local_ocorrido || "",
  };

  return {
    tipoDenunciante,
    isAnonimo,
    //status: "PENDENTE",
    vitima,
    terceiro,
    ofensor,
    relato,
  };
}