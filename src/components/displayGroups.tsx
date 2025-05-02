import { useState } from "react";
import { ClassesDB } from "../db/classDB"
import { Group } from "../types/class"
import ReactModal from 'react-modal';

type DisplayGroups = {
    cancel: boolean,
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>,
    group: Group,
    getGroups: () => void
}

type ClaseDelServidor = {
    id_grupo: string;
    nombre_grupo: string;
    fecha: { fecha: string };
  };

export default function DisplayGroups({cancel, setOpenRecord, group, getGroups} : DisplayGroups) {

    const Class = {
        id_grupo: group.id_grupo,
        nombre_grupo: group.nombre_Grupo,
        fecha: new Date().toISOString().slice(0,10)
    }    

    const[modalIsOpen, SetIsOpen] = useState(false)
    function closeModal(){
        SetIsOpen(false)
    }

    const getDates = async (parameter: string) => {
        ClassesDB.length = 0
        
        try {
            const response = await fetch('http://localhost:3000/api/asistencias/grupo/fechas/' + parameter, { credentials: 'include' });
            if (!response.ok) throw new Error('Error en la petición: ' + response.status);
    
            const data = await response.json();
            const transformedData = data.map((i: ClaseDelServidor) => ({
                id_grupo: group.id_grupo.toString(),
                nombre_grupo: group.nombre_Grupo,
                fecha: i.fecha
            }));
    
            ClassesDB.push(...transformedData);

            console.log(ClassesDB)

            if (ClassesDB.length === 0 || ClassesDB[ClassesDB.length - 1].fecha.slice(0,10) !== new Date().toISOString().slice(0,10)) {
                ClassesDB.push(Class);
            }
        } catch (error) {
            console.error('Hubo un problema con la petición fetch:', error);
        }
    }

    const goToRecord = async () => {
        await getDates(group.id_grupo.toString());

        console.log(new Date().toISOString().slice(0,10))

        setOpenRecord(true);
    }

    const deleteGroup = (id_grupo: number) => {
        fetch('http://localhost:3000/api/grupos/' + id_grupo, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                getGroups()
                closeModal()
                return
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });
    }


    return (
        <>
            <div className="relative inline-block">
                {cancel && (
                    <button
                        className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 w-10 h-10 text-white 
                                font-bold text-xl rounded-full transform -translate-y-2 translate-x-2 z-1"
                        onClick={() => SetIsOpen(true)}
                    >
                        X
                    </button>
                )}

                <button
                    className="bg-white hover:bg-gray-300 w-xs h-2xl p-3
                            rounded-2xl text-center border-l-7 border-t-5
                            grid grid-cols-1"
                    onClick={() => { goToRecord() }}
                >
                    <a className="text-xl font-semibold">{group.materia}</a>
                    <a className="text-lg font-semibold">{group.nombre_Grupo}</a>
                    <a className="font-semibold">{group.turno_Grupo}</a>
                </button>
            </div>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
                style= {{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        zIndex: 2
                    }
                }}
                className="bg-white max-w-100 w-3/4 h-1/4 p-5 rounded-2xl text-center
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            flex flex-col justify-between items-center">
                <h1 className="font-bold text-xl">Eliminar Grupo</h1>
                <p>Estas seguro que desea eliminar el grupo {group.nombre_Grupo}?</p>
                <div className="flex justify-end w-full">
                    <button className="bg-red-300 hover:bg-red-500
                                        w-25 h-10 mr-3 py-2 rounded-2xl text-sm"
                                onClick={() => {deleteGroup(group.id_grupo)}}>Eliminar</button>
                </div>
            </ReactModal>
        </>
    )
}