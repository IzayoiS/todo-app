"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo, useDeleteTodo, useTodos, useToggleTodo } from "@/hooks/useTodo";
import { useTodo } from "@/store/user";
import { Check, Loader2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import AddTodoPage from "./components/addTodo";

export default function TodosPage() {
  const { data: todos, isLoading } = useTodos();
  const toggle = useToggleTodo();
  const remove = useDeleteTodo();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const completedTodos = todos?.filter((todo) => todo.completed) || [];
  const incompleteTodos = todos?.filter((todo) => !todo.completed) || [];
  const { logout } = useTodo();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1 cursor-pointer">
                <Plus className="h-4 w-4" />
                Add Todo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Add Todo</DialogTitle>
              <AddTodoPage onSuccess={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {incompleteTodos?.map((todo: Todo) => (
          <Card key={todo.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  onClick={() => toggle.mutate(todo.id)}
                  className={`p-2 rounded-full cursor-pointer ${
                    todo.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {todo.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  className={`text-left text-lg bg-white hover:bg-white ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </Button>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove.mutate(todo.id)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {completedTodos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">DONE</h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <Card key={todo.id} className="p-4 bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => toggle.mutate(todo.id)}
                      className="p-2 rounded-full bg-green-100 text-green-600 cursor-pointer"
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                    <span className="text-lg text-gray-400 line-through">
                      {todo.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove.mutate(todo.id)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
