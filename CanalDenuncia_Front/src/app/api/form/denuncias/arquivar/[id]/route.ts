import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

// Proxy server-side para PUT /form/denuncias/arquivar/{id} (autenticado)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("loginToken");

    const backendResponse = await fetch(
      `${API_URL}/form/denuncias/arquivar/${id}`,
      {
        method: "PUT",
        headers: {
          Cookie: authCookie ? `${authCookie.name}=${authCookie.value}` : "",
        },
      },
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Erro no proxy de arquivar:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor." },
      { status: 502 },
    );
  }
}
