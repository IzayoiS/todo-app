"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/todos");
    }
  }, [router]);

  return <>{children}</>;
}
