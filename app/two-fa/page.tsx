import Image from "next/image";
import Link from "next/link";

export default function TwoFaPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-[60px] overflow-hidden bg-[#007A78] font-sans">
      <Image
        src="/line.svg"
        alt="Background"
        fill
        priority
        className="object-cover object-center z-[9]"
      />

      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="relative z-[10] flex flex-col gap-[15px] text-white">
        <div className="flex flex-col items-center gap-[10px]">
          <span className="text-[60px] font-extrabold">Ti-Gateway</span>
          <span className="text-[40px] font-light -mt-[20px]">
            Self Service
          </span>
        </div>

        <div className="flex items-end justify-center gap-[10px]">
          <Image
            src="/hepta-sphere-logo.svg"
            height={100}
            width={120}
            alt="logo"
          />
          <Image src="/mtd-logo.svg" height={100} width={100} alt="logo" />
          <Image src="/worldline-logo.svg" height={50} width={70} alt="logo" />
        </div>
      </div>

      <div className="relative z-[12] text-white">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-[20px]">
            <div style={{ maxWidth: 360 }}>
              <span>
                A verification code has been sent to your email. Please enter
                the code below to continue:
              </span>
            </div>

            <input
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
            Verify
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
    </div>
  );
}
