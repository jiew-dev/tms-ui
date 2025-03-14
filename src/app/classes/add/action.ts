export async function addClass(formData: FormData) {
    const classFormData = {
        level: formData.get("level"),
        name: formData.get("name"),
        formTeacherEmail: formData.get("formTeacherEmail"),
    }

    const res = await fetch("http://localhost:8000/api/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(classFormData),
    })

    return res.json()
}