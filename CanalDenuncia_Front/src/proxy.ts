import { NextRequest, NextResponse, ProxyConfig } from "next/server";

const publicRoutes = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/protocolo', whenAuthenticated: 'next' }
];

const adminRoutes = [
  { path: '/admin', whenAuthenticated: 'next' }
];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const data = JSON.parse(decoded);

    if (data.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return data.exp < currentTime;
    }
    return false;
  } catch (err) {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Ignorar arquivos estáticos com extensões (ex: .png, .jpg, .ico, etc.)
  if (path.includes('.')) {
    return NextResponse.next();
  }

  const publicRoute = publicRoutes.find(route => route.path === path);
  const adminRoute = adminRoutes.find(route => route.path === path);
  const authCookie = request.cookies.get('loginToken');
  const token = authCookie?.value;

  const isExpired = token ? isTokenExpired(token) : false;
  const isAuthenticated = !!token && !isExpired;

  // Se o token estiver expirado, limpa o cookie
  if (token && isExpired) {
    if (!publicRoute) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete('loginToken');
      return response;
    } else {
      const response = NextResponse.next();
      response.cookies.delete('loginToken');
      return response;
    }
  }

  // Se não estiver autenticado
  if (!isAuthenticated) {
    if (publicRoute) {
      return NextResponse.next();
    }
    if (adminRoute || (!publicRoute && !adminRoute)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Se estiver autenticado
  if (isAuthenticated) {
    if (publicRoute && publicRoute.whenAuthenticated === 'redirect') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      return NextResponse.redirect(redirectUrl);
    }
    // Rota admin ou qualquer outra rota privada
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    "/((?!api|form|_next/static|_next/image|.*\\..*|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
