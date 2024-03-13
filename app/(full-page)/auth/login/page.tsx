"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { AuthError } from "firebase/auth";
import PasswordInput from "../../../../components/PasswordInput";
import LoginSchema from "../../../../types/login.auth";
import { login } from "../../../../lib/firebase/services";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    const dataLogin = {
      email,
      password,
    };
    const validData = LoginSchema.safeParse(dataLogin);
    if (!validData.success) {
      const error = validData.error.format();
      setEmailError("");
      setPasswordError("");

      if (error.email) {
        setEmailError(error.email._errors[0]);
      }

      if (error.password) {
        setPasswordError(error.password._errors[0]);
      }
      setIsLoading(false);
      return;
    }

    setEmailError("");
    setPasswordError("");

    try {
      const token = await login(dataLogin.email, dataLogin.password);
      localStorage.setItem("access_token", `Bearer ${token}`);
      setCookie(null, "access_token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        path: "/",
      });

      setIsLoading(false);
      router.push("/dashboard");
      toast.success("Berhasil masuk.");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        let errorMessage = "Terjadi kesalahan saat login.";

        // Menyesuaikan pesan error berdasarkan kode error
        switch ((error as AuthError).code) {
          case "auth/invalid-credential":
            errorMessage = "Kredensial tidak valid.";
            break;
          case "auth/invalid-email":
            errorMessage = "Email yang dimasukkan tidak valid.";
            break;
          case "auth/user-disabled":
            errorMessage = "Akun pengguna telah dinonaktifkan.";
            break;
          case "auth/user-not-found":
            errorMessage = "Pengguna tidak ditemukan.";
            break;
          case "auth/wrong-password":
            errorMessage = "Password salah.";
            break;
          default:
            errorMessage = error.message; // Pesan default dari Firebase
        }

        // Menampilkan toast dengan pesan error yang telah disesuaikan
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <section className="flex flex-wrap w-full min-h-screen items-center justify-center">
        <div
          className="hidden lg:flex w-2/3 lg:ml-[-16px] h-screen bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/img/bg-login.jpg')" }}
        ></div>

        <Card
          placeholder={undefined}
          color="white"
          shadow={false}
          className="flex p-8 md:p-16 lg:w-1/3 lg:pl-14 lg:pr-0 lg:ml-[-16px] w-full min-h-screen justify-center"
          // border-2 border-dashed border-danger-400
        >
          <div className="flex flex-col lg:pr-10">
            <Typography color="black" variant="h2" placeholder={undefined}>
              Selamat datang
            </Typography>
            <Typography color="black" variant="small" placeholder={undefined}>
              Masuk untuk melanjutkan ke halaman admin
            </Typography>
          </div>
          <form className="flex flex-col w-full lg:pr-10 mt-8">
            <div className="flex flex-col">
              <Typography className="pb-2" placeholder={undefined} color="black" variant="h6">
                Email
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                placeholder="example@gmail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-overline text-danger-500 px-2 mt-1">{emailError}</p>
              )}
              <Typography className="py-2" placeholder={undefined} color="black" variant="h6">
                Password
              </Typography>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              <div className="w-full">
                <Button
                  size="lg"
                  disabled={isLoading ? true : false}
                  className=" bg-primary-500 hover:bg-primary-600"
                  fullWidth={true}
                  placeholder={undefined}
                  onClick={(e) => handleLogin(e)}
                >
                  Masuk
                </Button>
              </div>

              <Typography className="py-4" placeholder={undefined} color="gray" variant="small">
                Atau masuk dengan
              </Typography>

              <div className="w-full">
                <Button
                  size="lg"
                  color="blue"
                  disabled={isLoading ? true : false}
                  fullWidth={true}
                  placeholder={undefined}
                >
                  Google
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
};

export default LoginPage;
