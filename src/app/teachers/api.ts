import { Teacher } from "./schema";

export async function getTeachers(): Promise<Teacher[]> {
  const response = await fetch("http://localhost:8000/api/teachers");
  return (await response.json()).data;
}