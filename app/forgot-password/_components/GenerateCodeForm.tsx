"use client";

import Link from "next/link";

interface IGenerateCodeFormProps {
  onNext: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const GenerateCodeForm = ({
  onNext,
  email,
  setEmail,
}: IGenerateCodeFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }

    onNext();
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <div className="relative z-[12] text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-[20px]">
          <div style={{ maxWidth: 360 }}>
            <span>Enter the email</span>
          </div>

          <input
            onChange={onChangeEmail}
            type="email"
            name="email"
            placeholder="Enter the verification code"
            className="h-[48px] w-[358px] rounded-[43px] border border-[#004F4E]/50 bg-white/25 px-4 py-[13px] text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <button
          type="submit"
          className="h-[48px] rounded-[43px] bg-[#004F4E] font-semibold transition-colors hover:bg-[#003837]"
        >
          Send code
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
