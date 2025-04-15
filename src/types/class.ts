export type Group = {
    carrera_Grupo: string,
    id_grupo: number,
    nombre_Grupo: string,
    turno_Grupo: string
}

export type Student = {
    idGroup: Group["id_grupo"],
    matricula_Alumnos: number,
    nombre_Alumnos: string
}

export type Attendace = {
    idStudent: Student["matricula_Alumnos"],
    idGroup: Student["idGroup"],
    date: Date,
    state: boolean,   
}

export type Class = {
    id_grupo: Group["id_grupo"],
    fecha: string
}