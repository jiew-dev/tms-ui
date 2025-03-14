import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { getTeachers } from "./api";



function NoTeachers() {
    return (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-bold tracking-tight lg:text-2xl mb-5">
                There are no existing teachers yet.
            </h1>
            <Button asChild>
                <Link href="/teachers/add">
                    <Plus /> Add Teacher
                </Link>
            </Button>
        </div>
    )
}

async function TeachersTable() {
    const teachers = await getTeachers()

    return (
        <>
            {teachers.length > 0 && <DataTable columns={columns} data={teachers} />}
            {teachers.length === 0 && <NoTeachers />}
        </>
    )
}

export default function Teachers() {
    return (
        <>
            <header className="flex justify-between">
                <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl mb-5">
                    Teachers
                </h1>

                <div>
                    <Button asChild>
                        <Link href="/teachers/add">
                            <Plus /> Add Teacher
                        </Link>
                    </Button>
                </div>
            </header>
            
            <main className="p-10 bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950 min-h-180">
                <TeachersTable />
            </main>
        </>
    );
}
