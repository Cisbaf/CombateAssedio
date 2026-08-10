import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

// Proxy server-side para POST /form/denuncias/{id}/anexos (autenticado, multipart/form-data)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("loginToken");

    const backendResponse = await fetch(
      `${API_URL}/form/denuncias/${id}/anexos`,
      {
        method: "POST",
        headers: {
          Cookie: authCookie ? `${authCookie.name}=${authCookie.value}` : "",
        },
        body: formData,
      },
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Erro no proxy de anexos:", error);
    return NextResponse.json(
      { error: "Erro de conexão com o servidor." },
      { status: 502 },
    );
  }
}
