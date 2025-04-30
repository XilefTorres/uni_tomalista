import { GroupsDB, StudentsDB, AttendaceDB } from "../db/classDB";

export default function getFetch(parameter: string, setState: React.Dispatch<React.SetStateAction<boolean>>) {
    StudentsDB.length = 0
    
    fetch('http://localhost:3000/api/' + parameter, {
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.status);
            }
            return response.json(); // o response.text() si no es JSON
        })
        .then(data => {
            switch(parameter) {
                case 'grupos':
                    GroupsDB.push(...data)
                    break
                case 'alumnos':
                    StudentsDB.push(...data)
                    break
                case 'asistencias/grupo':
                    AttendaceDB.push(...data)
                    break
                case 'asistencias/grupo/fechas/':
                    AttendaceDB.push(...data)
                    break
            }

            console.log(data)

            setState(true)
        })
        .catch(error => {
            console.error('Hubo un problema con la petición fetch:', error);
        });
}