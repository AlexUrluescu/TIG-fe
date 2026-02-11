// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { decodeJwt } from "jose";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const publicPaths = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/reset-password",
//   ];
//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   if (!accessToken && !refreshToken) {
//     // const loginUrl = new URL("/login", request.url);
//     // // Optional: Add ?from=/dashboard to the URL
//     // loginUrl.searchParams.set("from", pathname);
//     // return NextResponse.redirect(loginUrl);
//   }

//   // 3. Check if Access Token is expired
//   let isExpired = false;
//   if (accessToken) {
//     try {
//       const { exp } = decodeJwt(accessToken);
//       if (exp && Date.now() >= exp * 1000) {
//         isExpired = true;
//       }
//     } catch (e) {
//       isExpired = true;
//     }
//   } else {
//     isExpired = true;
//   }

//   // 4. If expired, try to refresh
//   if (isExpired && refreshToken) {
//     try {
//       console.log("intra in expirat");

//       // NOTE: Ensure this URL is an absolute URL to your backend (e.g. http://localhost:8080/...)
//       // Middleware runs on the server, relative URLs like '/api' might fail depending on setup.
//       const refreshResponse = await fetch(
//         "http://localhost:8080/auth/refresh",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ refresh_token: refreshToken }),
//         },
//       );

//       console.log("refreshResponse.ok", refreshResponse);

//       if (refreshResponse.ok) {
//         const { newAccessToken, newRefreshToken } =
//           await refreshResponse.json();

//         const response = NextResponse.next();

//         // Update cookies
//         response.cookies.set("accessToken", newAccessToken, {
//           httpOnly: true,
//           maxAge: 900, // 15 min
//         });
//         response.cookies.set("refreshToken", newRefreshToken, {
//           httpOnly: true,
//           maxAge: 2592000, // 30 days
//         });

//         return response;
//       }
//     } catch (error) {
//       console.error("Refresh failed", error);
//     }

//     // Refresh failed -> Force Logout
//     // We must manually delete cookies here so the next request doesn't loop
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("accessToken");
//     response.cookies.delete("refreshToken");
//     return response;
//   }

//   return NextResponse.next();
// }

// // Optimization: Use the matcher to filter out static assets entirely
// // Note: We REMOVED the token check logic from the matcher and put it inside the function
// // to give us more control over specific paths like '/login'.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

const KEYCLOAK_URL = "http://localhost:8081";
const REALM = "master";
const CLIENT_ID = "my-frontend";
const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/", "/api/auth/callback", "/_next", "/favicon.ico"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 3. Get Tokens from Cookies
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const redirectToLogin = () => {
    const loginUrl = new URL(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/auth`,
    );
    loginUrl.searchParams.set("client_id", CLIENT_ID);
    loginUrl.searchParams.set("response_type", "code");
    loginUrl.searchParams.set("scope", "openid");
    loginUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    return NextResponse.redirect(loginUrl);
  };

  if (!accessToken && !refreshToken) {
    return redirectToLogin();
  }

  let isExpired = false;
  if (accessToken) {
    try {
      const { exp } = decodeJwt(accessToken);
      if (exp && Date.now() >= exp * 1000) {
        isExpired = true;
      }
    } catch (e) {
      isExpired = true;
    }
  } else {
    isExpired = true;
  }

  if (isExpired && refreshToken) {
    try {
      console.log("Token expired. Attempting refresh...");

      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("client_id", CLIENT_ID);
      params.append("refresh_token", refreshToken);
      // params.append("client_secret", "YOUR_SECRET"); // If using Confidential Client

      const refreshResponse = await fetch(
        `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        const response = NextResponse.next();

        response.cookies.set("access_token", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: data.expires_in,
          path: "/",
        });

        if (data.refresh_token) {
          response.cookies.set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: data.refresh_expires_in,
            path: "/",
          });
        }

        return response;
      } else {
        console.error("Refresh failed:", await refreshResponse.text());
      }
    } catch (error) {
      console.error("Refresh request error", error);
    }

    const response = redirectToLogin();
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (allow auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets like images/svgs
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
