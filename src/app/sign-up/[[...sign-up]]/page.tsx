"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { signUpFormSchema } from "@/lib/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ErrorMessage";
import WebsiteLogo from "@/components/WebsiteLogo";
import Image from "next/image";

type FormData = z.infer<typeof signUpFormSchema>;

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        username: data.username,
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onPressVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <WebsiteLogo containerClass="absolute top-10 left-10" />
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6")}>
          {!pendingVerification ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="text-xl font-bold">Welcome to Freelancer</h1>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        href="/sign-in"
                        className="underline underline-offset-4"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="username12"
                        {...register("username")}
                      />
                      {errors.username && (
                        <ErrorMessage message={errors.username.message} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <ErrorMessage message={errors.email.message} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="**********"
                        {...register("password")}
                      />
                      {errors.password && (
                        <ErrorMessage message={errors.password.message} />
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      {isSubmitting ? "submitting..." : "Sign Up"}
                    </Button>
                  </div>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                  <div>
                    <Button variant="outline" className="w-full">
                      <Image
                        src={"./svg/google.svg"}
                        alt="google"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                      />
                      Continue with Google
                    </Button>
                  </div>
                </div>
              </form>
              <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </div>
            </>
          ) : (
            <form onSubmit={onPressVerify}>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg font-semibold">Enter OTP Code</h2>
                <p className="text-sm text-muted-foreground">
                  Check your email for the verification code.
                </p>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button type="submit" className="w-[300px]">
                  Verify
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
