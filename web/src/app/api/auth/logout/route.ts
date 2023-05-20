import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const redirectedUrl = new URL("/", request.url);

  return NextResponse.redirect(redirectedUrl, {
    headers: {
      "set-Cookie": `token=; Path=/; max-age=0;`,
    },
  });
}
