"use client";
import Link from "next/link";

interface ISubmitNewPasswordFormProps {
  email: string;
}

export const SubmitNewPasswordForm = ({
  email,
}: ISubmitNewPasswordFormProps) => {
  return (
    <div className="relative z-[12] text-white">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-[20px]">
          <div style={{ maxWidth: 360 }}>
            <span>
              Enter the code sent to your email address and set a new password.
            </span>
          </div>

          <input
            type="email"
            name="email"
            value={email}
            readOnly
            placeholder="Enter the verification code"
            className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <input
            type="password"
            name="password"
            placeholder="Confirm password"
            className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <button
          type="submit"
          className="h-[48px] rounded-[43px] bg-[#004F4E] font-semibold transition-colors hover:bg-[#003837]"
        >
          Reset password
        </button>

        <div className="flex justify-center">
          <Link href={"/login"}>
            <span className="font-bold cursor-pointer hover:underline">
              or return to Sign In
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
