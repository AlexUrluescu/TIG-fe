"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IResetPasswordAction {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export async function loginAction(formData: any) {
  const payload = {
    username: formData.email,
    password: formData.password,
    otp: formData.otp || "12345",
  };

  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 428) {
      return {
        success: false,
        status: "OTP_REQUIRED",
        message: "OTP code required",
      };
    }

    if (res.status === 401) {
      return {
        success: false,
        status: "UNATHORIZED",
        message: "Invalid Credentials",
      };
    }

    if (res.status === 403) {
      redirect("/reset-password");
    }

    if (!res.ok) {
      return {
        success: false,
        status: "ERROR",
        message: "Invalid credentials",
      };
    }

    const data = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: data.expiresIn,
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Network error occurred" };
  }
}

export async function ResetPasswordAction(formData: IResetPasswordAction) {
  const payload = {
    email: formData.email,
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
  };

  try {
    const res = await fetch(
      "http://localhost:8080/auth/complete-password-reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (res.status === 428) {
      return {
        success: false,
        status: "OTP_REQUIRED",
        message: "OTP code required",
      };
    }

    if (res.status === 401) {
      return {
        success: false,
        status: "UNATHORIZED",
        message: "Invalid Credentials",
      };
    }

    if (res.status === 403) {
      redirect("/reset-password");
    }

    if (!res.ok) {
      return {
        success: false,
        status: "ERROR",
        message: "Invalid credentials",
      };
    }

    const data = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: data.expiresIn,
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Network error occurred" };
  }
}
