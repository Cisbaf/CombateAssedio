import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

// Proxy server-side para POST /form/denuncias (envio de denúncia, público)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendResponse = await fetch(`${API_URL}/form/denuncias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Erro no proxy de denuncias:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor." },
      { status: 502 },
    );
  }
}
