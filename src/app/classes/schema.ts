import { z } from "zod"

export const levels = ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] as const

export const classInputSchema = z.object({
    level: z.enum(levels, { message: "Please select a class level" }),
    name: z.string({ message: "Class name is required" }),
    formTeacherEmail: z.string({ message: "Form teacher is required" }),
})

export type ClassInput = z.infer<typeof classInputSchema>

export const classSchema = z.object({
    level: z.enum(levels, { message: "Please select a class level" }),
    name: z.string({ message: "Class name is required" }),
    formTeacher: z.object({
        email: z.string({ message: "Form teacher email is required" }),
        name: z.string({ message: "Form teacher name is required" }),
    }).nullable(),
})

export type Class = z.infer<typeof classSchema>