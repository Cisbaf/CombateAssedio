import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

// Proxy server-side para POST /form/mensagens/{id} (autenticado)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("loginToken");

    const backendResponse = await fetch(`${API_URL}/form/mensagens/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie ? `${authCookie.name}=${authCookie.value}` : "",
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Erro no proxy de mensagens:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor." },
      { status: 502 },
    );
  }
}
