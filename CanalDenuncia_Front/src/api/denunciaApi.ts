import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import type { RequestStatus } from "@/features/admin/schemas/AdminDenunciaSchema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Monta o payload esperado pelo backend a partir dos dados acumulados do formulário */
export function mapFormToBackend(dadosFormulario: DadosFormulario) {
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
    status: "PENDENTE",
    vitima,
    terceiro,
    ofensor,
    relato,
  };
}

/** Envia a denúncia para o backend e retorna o protocolo gerado */
export async function enviarDenuncia(
  dadosFormulario: DadosFormulario,
): Promise<{ protocolo: string } | null> {
  try {
    const payload = mapFormToBackend(dadosFormulario);

    const response = await fetch(`${API_BASE_URL}/form/denuncias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro no servidor: Código ${response.status}`);
    }

    const result = await response.json();

    if (!result?.protocolo) {
      throw new Error("Protocolo não retornado pelo servidor.");
    }

    return result as { protocolo: string };
  } catch (error) {
    console.error("Erro ao enviar denúncia:", error);
    return null;
  }
}

export async function postMsg(denuncia: Denuncia, mensagem: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/form/mensagens/${denuncia.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ conteudo: mensagem }),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no postMsg:", error);
    return null;
  }
}

export async function putStatus(
  denuncia: Denuncia,
  status: RequestStatus,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/form/denuncias/atualizarStatus/${denuncia.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(status),
      },
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Erro no putStatus:", error);
    return false;
  }
}

export async function getDenunciaFromProtocolo(
  protocolo: String,
): Promise<Denuncia | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/form/denuncias/protocolo/${protocolo}`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar denuncia por protocolo:", error);
    return null;
  }
}

export async function Login(username: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    throw new Error("Erro de conexão. Tente novamente mais tarde.");
  }
}
