import { Student } from "../types/class";

export default function DisplayStudents(student: Student) {
    return (
        <>
            <tr className="text-center items-center justify-center">
                <td className="border-2 p-2">{student.nombre_Alumnos}</td>
                <td className="border-2 p-2">{student.matricula_Alumnos}</td>
                <td className="bg-yellow-300 p-2">
                    <input className="size-5 " type="checkbox" />
                </td>
            </tr>
        </>
    )
}