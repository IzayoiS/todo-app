"use client";
import { useParams } from "next/navigation";
import { useTodoById } from "@/hooks/useTodo";
import { Loader2 } from "lucide-react";

export default function TodoDetailPage() {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoById(id?.toString());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!todo) return <p>Todo not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">{todo.title}</h1>
      <p className="mt-2">
        Status: {todo.completed ? "✅ Completed" : "❌ Not completed"}
      </p>
    </div>
  );
}
