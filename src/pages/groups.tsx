import { useState } from "react";
import DisplayGroups from "../components/displayGroups";
import ReactModal from "react-modal";
import { GroupsDB } from "../db/classDB";

type GroupsProps = {
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Groups({setOpenRecord}: GroupsProps){

    const[cancel, setCancel] = useState(false)
    const[modalIsOpen, SetIsOpen] = useState(false)
    
    function closeModal(){
        SetIsOpen(false)
    }
    
    const[modalData, setModalData] = useState({
        groupName: '',
        career: '',
        shift: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setModalData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const postGroup = (groupName: string, career: string, shift: string) => {
        console.log(groupName + " " + career + " " + shift) 
        
        fetch('http://localhost:3000/api/grupos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre_Grupo": groupName,
                "carrera_Grupo": career,
                "turno_Grupo": shift
            })})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                getGroups()

                return response.json(); // o response.text() si no es JSON
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });
    }
    
    const getGroups = () => {
        console.log(GroupsDB)
        GroupsDB.length = 0
        console.log(GroupsDB)
        fetch('http://localhost:3000/api/grupos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición: ' + response.status);
                }
                return response.json(); // o response.text() si no es JSON
            })
            .then(data => {
                GroupsDB.push(...data)
                setCancel(false)
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
            });

    }

    return (
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                        onClick={() => SetIsOpen(true)}>Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm"
                        onClick={() => cancel ? setCancel(false) : setCancel(true)}>Eliminar</button>
            </div>

            <h1 className="text-3xl text-center font-bold mb-5">Materias asignadas</h1>

            <div className="grid grid-cols-1 gap-8 place-self-center place-content-center md:flex md:flex-row">
                {GroupsDB.map((i, index) => (
                    <DisplayGroups
                    key={index}
                    cancel={cancel}
                    setOpenRecord={setOpenRecord}
                    group={i}
                    getGroups={getGroups}/>
                ))}
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
                className="bg-white max-w-150 w-3/4 h-6/8 
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            rounded-2xl p-5">
                <h1 className="text-center font-bold text-xl">Agregar Grupo</h1>
                <div className="my-5 grid grid-cols-1 gap-4 font-semibold text-lg">
                    <a>Grupo:</a>
                    <input className="border-2 rounded-xl p-1" name="groupName"
                            type="text" value={modalData.groupName} onChange={handleChange}/>
                    <a>Carrera:</a>
                    <input className="border-2 rounded-xl p-1" name="career"
                            type="text" value={modalData.career} onChange={handleChange}/>
                    <a>Turno:</a>
                    <input className="border-2 rounded-xl p-1" name="shift"
                            type="text" value={modalData.shift} onChange={handleChange}/>
                    <a>Horario:</a>
                </div>
                <div className="absolute bottom-0 grid grid-cols-2">
                    <button className="bg-green-300 hover:bg-green-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                            onClick={() => {postGroup(modalData.groupName, modalData.career, modalData.shift)}}>Agregar</button>
                    <button className="bg-red-300 hover:bg-red-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                            onClick={() => {SetIsOpen(false)}}>Cancelar</button>
                </div>
            </ReactModal>
        </>
    )
}