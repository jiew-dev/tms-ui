"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TeacherInput } from "./schema"

export const columns: ColumnDef<TeacherInput>[] = [
    {
        accessorKey: "name",
        header: "Teacher Name",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "contactNumber",
        header: "Work Contact",
    }
]
