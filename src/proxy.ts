import { NextRequest, NextResponse } from "next/server";

const REALM = 'Basic realm="Secure Area", charset="UTF-8"';

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}

export function proxy(req: NextRequest) {
  const validUser = process.env.BASIC_AUTH_USER;
  const validPass = process.env.BASIC_AUTH_PASSWORD;

  // If credentials are not configured, don't lock everyone out silently –
  // let the request through so a misconfigured deploy is obvious.
  if (!validUser || !validPass) {
    return NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [user, pwd] = atob(header.slice(6)).split(":");
      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    } catch {
      // malformed header – fall through to 401
    }
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|img/|videos/|sitemap.xml|robots.txt).*)",
  ],
};
