import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["todo"],
    queryFn: async () => {
      const res = await api.get("/todo", getAuthHeaders());
      return res.data;
    },
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; completed?: boolean }) => {
      const res = await api.post("/todo", data, getAuthHeaders());
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.patch(`/todo/${id}`, {}, getAuthHeaders());
    },
    onSuccess: async (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/todo/${id}`, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
}

export function useTodoById(id: string | number | undefined) {
  return useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const res = await api.get(`/todo/${id}`, getAuthHeaders());
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Todo> }) => {
      const res = await api.put(`/todo/${id}`, data, getAuthHeaders());
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
    },
  });
}
