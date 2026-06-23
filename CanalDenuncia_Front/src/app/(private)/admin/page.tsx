import AdminDashBoard from "@/features/admin/components/AdminDashBoard";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import { cookies } from "next/headers";

const API_URL = "http://canal-denuncias-backend:8080";

async function getDenuncias(): Promise<Denuncia[]> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("loginToken");

  const response = await fetch(`${API_URL}/form/denuncias`, {
    cache: "no-store",
    headers: {
      Cookie: authCookie ? `${authCookie.name}=${authCookie.value}` : "",
    },
  });

  if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
  return await response.json();
}

export default async function AdminPage() {
  try {
    const initialDenuncias = await getDenuncias();
    return <AdminDashBoard initialData={initialDenuncias} />;
  } catch (error) {
    console.log(error);
    return (
      <div className="flex justify-center p-8 text-red-500">
        <h1>Não foi possível conectar ao servidor. Contate o suporte. </h1>
      </div>
    );
  }
}

//Esse é um Server Component inteligente que busca as denúncias e
//passa para o client component que será responsável por renderizá-las.
