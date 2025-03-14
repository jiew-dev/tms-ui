"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import { subjects, TeacherInput, teacherInputSchema } from "../schema"
import { addTeacher } from "./action"




export default function AddTeacherPage() {
    const router = useRouter()

    const form = useForm<TeacherInput>({
        resolver: zodResolver(teacherInputSchema),
    })

    async function onSubmit(values: TeacherInput) {
        const formData = new FormData()

        formData.append("name", values.name)
        formData.append("subject", values.subject)
        formData.append("email", values.email)
        formData.append("contactNumber", values.contactNumber)

        await addTeacher(formData)
        router.push("/teachers")
    }

    return (
        <>
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl mb-5">
                Add Teacher
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <main className="container p-10 bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950 mb-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Name</FormLabel>
                                    <Input className="w-[460px]" placeholder="Gao Ah Xing" {...field} />
                                    {form.formState.errors.name && (
                                        <FormMessage>{form.formState.errors.name.message}</FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Subject</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[460px]">
                                            <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem key={`teachers-add-subject-${subject}`} value={subject}>{subject}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.subject && (
                                        <FormMessage>{form.formState.errors.subject.message}</FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input className="w-[460px]" placeholder="teacher@gov.sg" {...field} />
                                    </FormControl>
                                    {form.formState.errors.email && (
                                        <FormMessage>{form.formState.errors.email.message}</FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="contactNumber" render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel>Work Contact Number</FormLabel>
                                <FormControl>
                                    <Input className="w-[460px]" placeholder="9231 8999" {...field} />
                                </FormControl>
                                {form.formState.errors.contactNumber && (
                                    <FormMessage>{form.formState.errors.contactNumber.message}</FormMessage>
                                )}
                            </FormItem>
                            
                        )} />
                    </main>

                    <div className="flex justify-end space-x-3">
                        <Button variant="outline" className="hover:cursor-pointer" onClick={() => router.back()}><ArrowLeft />Back</Button>
                        <Button type="submit">Add Teacher</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
