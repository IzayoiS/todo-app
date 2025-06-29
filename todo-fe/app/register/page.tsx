"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { RegisterSchema, RegisterSchemaDTO } from "@/utils/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(data: RegisterSchemaDTO) {
    setIsSubmitting(true);
    try {
      await api.post("/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast("Register success!");
      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.error || "Register failed";
        console.error("Axios register error", error);
        return toast(message);
      }

      toast("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-md shadow-md flex flex-col gap-5 border-slate-200 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <Input
              type="text"
              placeholder="Username"
              autoComplete="off"
              {...register("username")}
            />
            {errors.username && (
              <AlertDescription className="text-red-400 m-2">
                {errors.username.message}
              </AlertDescription>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email address"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && (
              <AlertDescription className="text-red-400 m-2">
                {errors.email.message}
              </AlertDescription>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <AlertDescription className="text-red-400 m-2">
                {errors.password.message}
              </AlertDescription>
            )}
          </div>

          <p>
            Already have an account?{" "}
            <Link href="/" className="text-blue-600">
              Login here
            </Link>
          </p>

          <Button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 cursor-pointer transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <TailSpin height={40} width={50} color="#000" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
