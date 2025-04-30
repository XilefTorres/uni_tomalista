import { Student } from "../types/class";

type DisplayStudentsProps = {
    student: Student
    change: (matricula: string, checked: boolean) => void
}

export default function DisplayStudents({student, change}: DisplayStudentsProps) {
    return (
        <>
            <tr className="text-center items-center justify-center">
                <td className="border-2 p-2">{student.nombre_Alumnos}</td>
                <td className="border-2 p-2">{student.matricula_Alumnos}</td>
                <td className="bg-yellow-300 p-2">
                    <input className="size-5 " type="checkbox" 
                            checked={student.asistencia} 
                            onChange={(e) => change(student.matricula_Alumnos.toString(), e.target.checked)}/>
                </td>
            </tr>
        </>
    )
}