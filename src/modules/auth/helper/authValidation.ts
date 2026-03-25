import { z } from "zod";

// === Schemas ===

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email tidak valid"
    ),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong")
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
    .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka")
    .regex(
      /[^A-Za-z0-9]/,
      "Password harus mengandung minimal 1 karakter spesial (!@#$%^&*)"
    ),
});

// === Types ===

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type FieldErrors = {
  [key: string]: string | undefined;
};

// === Validation helper ===

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: FieldErrors } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0]?.toString();
    if (field && !errors[field]) {
      // Ambil error pertama per field saja
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}
