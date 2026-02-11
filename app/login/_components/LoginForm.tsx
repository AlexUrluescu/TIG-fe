"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { loginAction } from "@/app/actions/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const result = await loginAction(data);

    if (result.success) {
      router.push("/dashboard");
    } else if (result.status === "OTP_REQUIRED") {
      router.push("/two-fa");
    } else {
      setError("root", { message: result.message });
      setServerError(result.message || "Something went wrong");
    }
  };

  return (
    <div className="relative z-[12] text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[9px]">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email"
              className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {errors.email && (
              <span className="text-sm text-red-300 ml-2">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[9px]">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Password"
              className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {errors.password && (
              <span className="text-sm text-red-300 ml-2">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="flex items-center justify-end"
          >
            <span className="font-bold cursor-pointer hover:underline">
              Forgot your password?
            </span>
          </Link>
        </div>

        <button
          type="submit"
          className="h-[48px] w-full rounded-[43px] bg-[#004F4E] font-semibold transition-colors hover:bg-[#003837] flex items-center justify-center"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
