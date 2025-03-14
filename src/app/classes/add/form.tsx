"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { Teacher } from "@/app/teachers/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Info } from "lucide-react"
import { ClassInput, classInputSchema, levels } from "../schema"
import { addClass } from "./action"
import { useRouter } from 'next/navigation'


export function AddClassForm({ teachers }: { teachers: Teacher[] }) {
    const router = useRouter()
    const form = useForm<ClassInput>({
        resolver: zodResolver(classInputSchema),
    })

    async function onSubmit(values: ClassInput) {
        
        const formData = new FormData()
        
        formData.append("level", values.level)
        formData.append("name", values.name)
        formData.append("formTeacherEmail", values.formTeacherEmail)

        await addClass(formData)
        router.push("/classes")
    }

    const nonFormTeachers: Teacher[] = []
    const formTeachers: Teacher[] = []
    teachers.forEach(teacher => {
        if (teacher.formClass !== null) {
            formTeachers.push(teacher)
        } else {
            nonFormTeachers.push(teacher)
        }
    })

    function NoAssignableTeachers({ hasFormTeachers }: {hasFormTeachers: boolean}) {
        const message = hasFormTeachers ? "All teachers are assigned to a class" : "No existing teachers" 
        return (
            <div className="flex gap-2 items-center text-sm text-gray-500">
                <Info />
                <span>{message}. </span>
                <Link href="/teachers/add" className="underline text-primary">Add a teacher</Link>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <main className="container p-10 bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950 mb-5">
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel>Class Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[460px]">
                                        <SelectValue placeholder="Select a level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {levels.map((level) => (
                                            <SelectItem key={`classes-add-level-${level}`} value={level}>{level}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.level && (
                                    <FormMessage>{form.formState.errors.level.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel>Class Name</FormLabel>
                                <FormControl>
                                    <Input className="w-[460px]" placeholder="Class name" {...field} />
                                </FormControl>
                                {form.formState.errors.name && (
                                    <FormMessage>{form.formState.errors.name.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="formTeacherEmail"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel>Form Teacher</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[460px]">
                                            <SelectValue placeholder="Select a form teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nonFormTeachers.map((teacher) => (
                                                <SelectItem key={`classes-add-form-teacher-${teacher.id}`} value={teacher.email}>{teacher.name}</SelectItem>
                                            ))}
                                            {formTeachers.map((teacher) => (
                                                <SelectItem key={`classes-add-form-teacher-${teacher.id}`} value={teacher.email} disabled>{teacher.name} (assigned to {teacher.formClass?.name})</SelectItem>
                                            ))}
                                        </SelectContent>
                                        {
                                            nonFormTeachers.length === 0 && <NoAssignableTeachers hasFormTeachers={formTeachers.length > 0} />
                                        }
                                    </Select>
                                </FormControl>
                                {form.formState.errors.formTeacherEmail && (
                                    <FormMessage>{form.formState.errors.formTeacherEmail.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />
                </main>

                <div className="flex justify-end space-x-3">
                    <Button variant="outline" asChild>
                        <Link href="/classes">
                            <ArrowLeft />Back
                        </Link>
                    </Button>
                    <Button type="submit">Add Class</Button>
                </div>
            </form>
        </Form>
    )
}