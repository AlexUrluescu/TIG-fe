"use client";

import { useState } from "react";
import { GenerateCodeForm } from "./GenerateCodeForm";
import { SubmitNewPasswordForm } from "./SubmitNewPasswordForm";

export default function FormContainer() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  return step === 1 ? (
    <GenerateCodeForm
      onNext={() => setStep(2)}
      email={email}
      setEmail={setEmail}
    />
  ) : (
    <SubmitNewPasswordForm email={email} />
  );
}
