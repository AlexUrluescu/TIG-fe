import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const redirectTo = searchParams.get("state") || "/dashboard"; // Where to go after login

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // 1. Exchange Code for Tokens
  const KEYCLOAK_URL = "http://localhost:8080";
  const REALM = "master";
  const CLIENT_ID = "my-frontend";
  const REDIRECT_URI = "http://localhost:3000/api/auth/callback"; // Note: This URL must be registered in Keycloak!

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);
  // params.append("client_secret", "YOUR_SECRET"); // Recommended for production

  try {
    const res = await fetch(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error_description || "Failed to exchange token");
    }

    // 2. Create the Response (Redirect to Dashboard)
    const response = NextResponse.redirect(new URL(redirectTo, request.url));

    // 3. Set HTTP-Only Cookie (Secure storage)
    response.cookies.set("access_token", data.access_token, {
      httpOnly: true, // JavaScript cannot read this
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      maxAge: data.expires_in,
      path: "/",
    });

    // Optional: Set Refresh Token cookie here too

    return response;
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.redirect(new URL("/", request.url)); // Send back to login on error
  }
}
