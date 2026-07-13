import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import type { RequestStatus } from "@/features/admin/schemas/AdminDenunciaSchema";
import mapFormToBackend from "@/features/denuncia/schemas/mapFormToBackend";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";



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

/* Envia mensagem */
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

// Atualiza o status da denúncia
export async function putStatus(
  denuncia: Denuncia,
  status: RequestStatus,
): Promise<Denuncia | null> {
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
    return await response.json();
  } catch (error) {
    console.error("Erro no putStatus:", error);
    return null;
  }
}

// Busca a denúncia pelo protocolo
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

// faz login
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

// faz upload de anexos
export async function postAnexos(denunciaId: string, formData: FormData) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/form/denuncias/${denunciaId}/anexos`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro no postAnexos:", error);
    return null;
  }
}
