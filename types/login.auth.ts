import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid",
  }),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;]).{8,}$/, {
    message: "Password minimal 8 karakter, mengandung huruf kapital, simbol, dan angka",
  }),
});

export default LoginSchema;
