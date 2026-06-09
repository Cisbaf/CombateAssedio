import { NextRequest, NextResponse, ProxyConfig } from "next/server";

const publicRoutes = [
  {path: '/', whenAuthenticated: 'next'}, 
  {path: '/login', whenAuthenticated: 'redirect'},
  {path: '/admin', whenAuthenticated: 'redirect',}
 
];


const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/login";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const authToken = request.cookies.get('token');

    if(!authToken && publicRoute) {
      return NextResponse.next();
    }
    if(!authToken && !publicRoute){
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    if(authToken && !publicRoute){
      //checar se o token esta expirado
      //se sim, remover o cookie e redirecionar o usuario para o login
     return NextResponse.next();
    }
  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
