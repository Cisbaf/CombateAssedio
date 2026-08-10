import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json().catch(() => null);

    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    // Repassa o(s) cookie(s) definidos pelo backend (ex: loginToken) ao navegador
    const setCookie = backendResponse.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Erro no proxy de login:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor. Tente novamente mais tarde." },
      { status: 502 },
    );
  }
}
