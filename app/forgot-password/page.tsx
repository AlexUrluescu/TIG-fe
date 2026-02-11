import Image from "next/image";
import FormContainer from "./_components/FormContainer";

export default function ForgotPasswordGenerateCodePage() {
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

      <FormContainer />
    </div>
  );
}
