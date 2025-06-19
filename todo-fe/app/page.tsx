"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { LoginSchema, LoginSchemaDTO } from "@/utils/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginSchemaDTO) {
    setIsSubmitting(true);
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;
      login(
        {
          id: user.ID,
          username: user.Name,
          email: user.Email,
        },
        token
      );

      toast("Login success!");
      router.push("/todos");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.error || "Login failed";
        console.error("Axios login error", error);
        return toast(message);
      }

      toast("Something went wrong");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="npx shadcn@latest add sonner p-8 w-full max-w-md shadow-md flex flex-col gap-5 border-slate-200 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Login to Todo App</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <Input
              type="text"
              placeholder="Email address"
              className="outline-none focus:outline-none shadow-none focus:shadow-none"
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
              className="border-2 outline-none p-3 rounded w-full"
              {...register("password")}
            />
            {errors.password && (
              <AlertDescription className="text-red-400 m-2">
                {errors.password.message}
              </AlertDescription>
            )}
          </div>

          <p>
            Don&apos;t have an account yet?{" "}
            <Link href={"/register"} className="text-green-600">
              Create account
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
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
