import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post("/register", {
    code,
  });

  const { token } = registerResponse.data;

  const redirectedUrl = redirectTo ?? new URL("/", request.url);

  const cookieExpiredInSeconds = 60 * 60 + 24 + 30 // 1 month

  return NextResponse.redirect(redirectedUrl, {
    headers: {
      "set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiredInSeconds};`,
    },
  });
}
