"use client";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState<boolean | null>(null);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthChecked(null);
      const token = localStorage.getItem("token");

      if (!token) {
        handleUnauthorized();
        return;
      }

      try {
        const res = await api.get("/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setAuthChecked(true);
      } catch (error) {
        console.error("Auth error:", error);
        handleUnauthorized();
      }
    };

    const handleUnauthorized = () => {
      localStorage.removeItem("token");
      window.location.replace("/");
    };

    checkAuth();
  }, [router, setUser]);

  if (!authChecked)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height={50} width={50} color="#fff" />
      </div>
    );

  if (!authChecked) {
    return null;
  }

  return <>{children}</>;
}
