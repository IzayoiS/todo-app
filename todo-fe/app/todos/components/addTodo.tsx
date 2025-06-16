"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddTodo } from "@/hooks/useTodo";
import { formTodoSchema, FormTodoSchemaDTO } from "@/utils/schemas/todo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";

export default function AddTodoPage({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<FormTodoSchemaDTO>({
    resolver: zodResolver(formTodoSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isPending } = useAddTodo();

  const onSubmit = (data: FormTodoSchemaDTO) => {
    mutate(
      { title: data.title },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 cursor-pointer w-full"
          disabled={isPending}
        >
          {isPending ? (
            <TailSpin visible={true} height={25} width={25} color="#fff" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
