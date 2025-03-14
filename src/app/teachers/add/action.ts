export async function addTeacher(formData: FormData) {
    const teacher = {
        name: formData.get("name"),
        subject: formData.get("subject"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
    }

    const res = await fetch("http://localhost:8000/api/teachers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
    })

    return res.json()
}