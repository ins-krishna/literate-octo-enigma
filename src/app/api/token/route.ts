// app/api/token/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");
  const encodedToken = cookie
    ?.split("; ")
    .find((row) => row.startsWith("kinde_token="))
    ?.split("=")[1];

  if (encodedToken) {
    // Decode and parse the JSON
    const decodedToken = decodeURIComponent(encodedToken);
    const tokenData = JSON.parse(decodedToken);

    return NextResponse.json({ accessToken: tokenData.access_token });
  } else {
    return NextResponse.json({ accessToken: null });
  }
}
