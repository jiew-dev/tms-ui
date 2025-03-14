import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table";
import { Plus } from 'lucide-react';
import Link from "next/link";
import { columns } from "./columns";
import { getClasses } from "./api";



function NoClasses() {
    return (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-bold tracking-tight lg:text-2xl mb-5">
                There are no existing classes yet.
            </h1>
            <Button asChild>
                <Link href="/classes/add"><Plus /> Add Class</Link>
            </Button>
        </div>
    )
}

async function ClassesTable() {
    const classes = await getClasses()

    return (
        <>
            {classes.length > 0 && <DataTable columns={columns} data={classes} />}
            {classes.length === 0 && <NoClasses />}
        </>
    )
}

export default async function Classes() {
    return (
        <>
            <header className="flex justify-between">
                <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl mb-5">
                    Classes
                </h1>

                <div>
                    <Button asChild>
                        <Link href="/classes/add">
                            <Plus /> Add Class
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="container p-10 bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950 min-h-180">
                <ClassesTable />
            </main>
        </>
    );
}
