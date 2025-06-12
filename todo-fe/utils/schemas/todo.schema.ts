"use client";

import { z } from "zod";

export const formTodoSchema = z.object({
  title: z.string().min(1),
});

export type FormTodoSchemaDTO = z.infer<typeof formTodoSchema>;
