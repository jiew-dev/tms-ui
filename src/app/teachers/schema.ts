import { z } from "zod"

export const levels = ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] as const
export const subjects = [
    "English Language",
    "Mother Tongue Language",
    "Mathematics",
    "Science",
    "Art",
    "Physical Education",
] as const

export const teacherInputSchema = z.object({
    name: z.string({ message: "Teacher name is required" }),
    subject: z.enum(subjects, { message: "Please select a subject" }),
    email: z.string({ message: "Email address is required" }).email({ message: "This email address is invalid" }),
    contactNumber: z.string({ message: "Contact number is required" }).regex(/^\d{4} \d{4}$/, { message: "This contact number is invalid (use format 8765 4321)" }),
})

export type TeacherInput = z.infer<typeof teacherInputSchema>

export const teacherSchema = z.object({
    id: z.string({ message: "Teacher ID is required" }),
    name: z.string({ message: "Teacher name is required" }),
    subject: z.enum(subjects, { message: "Please select a subject" }),
    email: z.string({ message: "Email address is required" }).email({ message: "This email address is invalid" }),
    contactNumber: z.string({ message: "Contact number is required" }).regex(/^\d{4} \d{4}$/, { message: "This contact number is invalid (use format 8765 4321)" }),
    formClass: z.object({
        id: z.string({message: "Class ID is required"}),
        level: z.enum(levels, { message: "Please select a class level" }),
        name: z.string({ message: "Class name is required" }),
    }).optional().nullable(),
})

export type Teacher = z.infer<typeof teacherSchema>