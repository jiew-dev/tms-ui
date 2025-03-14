"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Class } from "./schema"

export const columns: ColumnDef<Class>[] = [
    {
        accessorKey: "level",
        header: "Class Level",
    },
    {
        accessorKey: "name",
        header: "Class Name",
    },
    {
        accessorKey: "formTeacher.name",
        header: "Form Teacher",
    },
]
