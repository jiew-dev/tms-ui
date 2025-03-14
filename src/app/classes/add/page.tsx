import { getTeachers } from "@/app/teachers/api"
import { AddClassForm } from "./form";
import { Teacher } from "@/app/teachers/schema";


export default async function AddClassPage() {
    const teachers = await getTeachers()

    return (
        <>
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl mb-5">
                Add Class
            </h1>
            <AddClassForm teachers={teachers} />
        </>
    );
}
