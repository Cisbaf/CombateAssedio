import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

// Proxy server-side para GET /form/denuncias/protocolo/{protocolo} (público)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ protocolo: string }> },
) {
  try {
    const { protocolo } = await params;

    const backendResponse = await fetch(
      `${API_URL}/form/denuncias/protocolo/${protocolo}`,
      { cache: "no-store" },
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Erro no proxy de protocolo:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor." },
      { status: 502 },
    );
  }
}
