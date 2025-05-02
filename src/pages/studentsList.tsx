import { useState } from "react"
import DisplayStudents from "../components/displayStudents"
import { ClassesDB, GroupsDB, StudentsDB } from "../db/classDB"
import ReactModal from "react-modal"
import Groups from "./groups"

type StudentsListprops = {
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StudentsList({setOpenList}: StudentsListprops) {

    const [students, setStudents] = useState(StudentsDB)
    //cambia el valor de la asistencia del alumno si el checkbox esta seleccionado
    const handleAttendanceChange = (matricula: string, checked: boolean) => {
        setStudents(prev =>
          prev.map(student =>
            student.matricula_Alumnos.toString() === matricula
              ? { ...student, asistencia: checked }
              : student
          )
        );
      };

      const AttendanceBody = students.map((i) => ({
        matricula_AlumnosAsis: i.matricula_Alumnos,
        id_grupoAsis: i.idGroup,
        fecha: new Date().toISOString().slice(0, 10),
        estado: i.asistencia ? 'Asistencia' : 'Falta',
        justificado: 0
      }))

    const PostAttendance = () => {
        
        fetch('http://localhost:3000/api/asistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(AttendanceBody),
            credentials: 'include'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                console.log(AttendanceBody)
                return response.json(); // o response.text() si no es JSON
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });
    }

    const[modalIsOpen, SetIsOpen] = useState(false)
    
    function closeModal(){
        SetIsOpen(false)
    }
    
    const[modalData, setModalData] = useState({
        matricula_Alumnos: '',
        nombre_Alumnos: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setModalData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const PostStudent = () => {
        fetch('http://localhost:3000/api/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                matricula_Alumnos: parseInt(modalData.matricula_Alumnos),
                nombre_Alumnos: modalData.nombre_Alumnos,
                id_grupoA: ClassesDB[0].id_grupo
            }),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                getStudents()
                return response.json(); // o response.text() si no es JSON
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });
    }

    const grupo = ClassesDB[0];

    if (!grupo) {
        throw new Error("Grupo no encontrado");
      }

    const Class = {
        id_grupo: grupo.id_grupo,
        nombre_grupo: grupo.nombre_grupo,
        fecha: new Date().toISOString()
    }    

    const backToRecord = () => {
        getDates(grupo.id_grupo.toString())

        if(ClassesDB.length == 0){
            ClassesDB.push(Class)
        }

        setOpenList(false)
    }

    const getDates = (parameter: string) => {
        ClassesDB.length = 0
        
        fetch('http://localhost:3000/api/asistencias/grupo/fechas/' + parameter, {credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                return response.json(); // o response.text() si no es JSON
            })
            .then(data => {
                ClassesDB.push(...data)

            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });
        }

    const getStudents = () => {
            StudentsDB.length = 0
            
            fetch('http://localhost:3000/api/alumnos', {credentials: 'include'})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la petición: ' + response.status);
                    }
                    return response.json(); // o response.text() si no es JSON
                })
                .then(data => {
                    StudentsDB.push(...data)
                    closeModal()
                })
                .catch(error => {
                    console.error('Hubo un problema con la petición fetch:', error);
                });
        }

    return(
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 float-start 
                                    w-25 my-5 ml-5 py-2 rounded-2xl text-sm"
                        onClick={() => backToRecord()}>Retroceder</button>
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                        onClick={() => SetIsOpen(true)}
                        >Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm"
                        >Eliminar</button>
            </div>

            <h1 className="font-bold text-3xl text-center pb-4">Lista de alumnos</h1>

            <div className="place-self-center">
                <table className="">
                    <thead className="bg-white font-bold">
                        <tr className="">
                            <th className="border-2 p-2">Nombre</th>
                            <th className="border-2 p-2">Matricula</th>
                            <th className="bg-yellow-300 p-2">Asistencia</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {students.map((i, index) => (
                            <DisplayStudents
                            key={index}
                            change={handleAttendanceChange}
                            student={i}/>
                        ))}
                    </tbody>
                </table>

                <div className="text-end w-full">
                    <button className="bg-green-300 hover:bg-green-500
                                        w-30 my-5 ml-5 py-2 rounded-2xl text-sm"
                            onClick={() => PostAttendance()}>Guardar cambios</button>
                </div>
            </div>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
                style= {{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)"
                    }
                }}
                className="bg-white max-w-150 w-3/4 h-4/8 
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            rounded-2xl p-5">
                <h1 className="text-center font-bold text-xl">Agregar Alumno</h1>
                <div className="my-5 grid grid-cols-1 gap-4 font-semibold text-lg">
                    <a>Matricula:</a>
                    <input className="border-2 rounded-xl p-1" name="matricula_Alumnos"
                            type="text" value={modalData.matricula_Alumnos} onChange={handleChange}/>
                    <a>Nombre:</a>
                    <input className="border-2 rounded-xl p-1" name="nombre_Alumnos"
                            type="text" value={modalData.nombre_Alumnos} onChange={handleChange}/>
                </div>
                <div className="absolute bottom-0 grid grid-cols-2">
                    <button className="bg-green-300 hover:bg-green-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                            onClick={() => {PostStudent()}}>Agregar</button>
                    <button className="bg-red-300 hover:bg-red-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                            onClick={() => {SetIsOpen(false)}}>Cancelar</button>
                </div>
            </ReactModal>
        </>
    )
} 