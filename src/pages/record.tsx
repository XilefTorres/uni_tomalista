import DisplayList from "../components/displayList";
import { ClassesDB, StudentsDB } from "../db/classDB";
import { Student } from "../types/class";

type RecordProps = {
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Record({setOpenRecord, setOpenList}: RecordProps) {

    const getStudents = (group: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        StudentsDB.length = 0
        
        fetch('http://localhost:3000/api/alumnos/grupos/' + group, {credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                return response.json(); // o response.text() si no es JSON
            })
            .then(data => {
                data.forEach((student: Student) => {
                    StudentsDB.push({
                      ...student,
                      idGroup: ClassesDB[0].id_grupo,
                      asistencia: false
                    });
                  });
                setState(true)
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
                        onClick={() => setOpenRecord(false)}>Retroceder</button>
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                        onClick={() => getStudents(ClassesDB[0].nombre_grupo, setOpenList)}>Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm">Eliminar</button>
            </div>

            <h1 className="text-center mb-3 text-3xl font-bold">
                Historial</h1>
            <div className="text-center">
                {ClassesDB.map((i, index) => (
                    <DisplayList
                    key={index}
                    setOpenList={setOpenList}
                    date={i.fecha.slice(0, 10)}
                    group={i.id_grupo.toString()}
                    getStudents={getStudents}/>
                ))}
            </div>

            <div className="text-end place-self-center w-5/6 max-w-200">
                <button className="bg-green-300 hover:bg-green-500 
                                    w-25 my-5 py-3 rounded-2xl text-sm">
                Imprimir Excel</button>    
            </div>
        </>
    )
}