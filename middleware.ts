import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { parseCookies, destroyCookie } from "nookies";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;
  // console.log(`Pathname: ${pathname}`);

  // Jika ada access token dan request ke halaman auth
  if (accessToken) {
    const token = "Bearer " + accessToken;
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const verifyTokenURL =
        "https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/auth/verify-token";
      const res = await fetch(verifyTokenURL, requestOption);
      const resData = await res.json();

      // Jika token tidak valid atau tidak ada
      if (!resData.success) {
        // Menghapus cookie dengan mengatur ulang
        const response = NextResponse.redirect(new URL("/auth/login", request.url));
        response.headers.append(
          "Set-Cookie",
          serialize("access_token", "", {
            path: "/",
            expires: new Date(0), // tanggal di masa lalu untuk menghapus cookie
          })
        );
        return response;
      }

      // Jika sudah login, tidak boleh mengakses halaman sign-in dan sign-up
      if (pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      console.error(error);
      // Menghapus cookie jika terjadi error saat verifikasi
      destroyCookie(null, "access_token");
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      localStorage.removeItem("access_token");
      response.headers.append(
        "Set-Cookie",
        serialize("access_token", "", {
          path: "/",
          expires: new Date(0), // tanggal di masa lalu untuk menghapus cookie
        })
      );
      return response;
    }
  }

  // Jika tidak ada token dan mencoba mengakses halaman dashboard atau root ("/")
  if (!accessToken && (pathname.startsWith("/dashboard") || pathname === "/")) {
    // Redirect ke halaman login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Untuk semua request lain, lanjutkan tanpa perubahan
  return NextResponse.next();
}
