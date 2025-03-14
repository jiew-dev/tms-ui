export async function getClasses() {
    const res = await fetch("http://localhost:8000/api/classes").then(res => res.json())
    const classes = res.data

    return classes
}