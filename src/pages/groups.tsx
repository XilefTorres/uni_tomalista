import { useState } from "react";
import DisplayGroups from "../components/displayGroups";
import Modal from 'react-modal';

type GroupsProps = {
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Groups({setOpenRecord}: GroupsProps){

    const[cancel, setCancel] = useState(false)
    const[modalIsOpen, SetIsOpen] = useState(false)

    function closeModal(){
        SetIsOpen(false)
    }

    return (
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                        onClick={() => SetIsOpen(true)}>Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm"
                        onClick={() => setCancel(true)}>Eliminar</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
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
                    <a>Materia:</a>
                    <input className="border-2 rounded-xl"/>
                    <a>Semestre:</a>
                    <input className="border-2 rounded-xl"/>
                    <a>Turno:</a>
                    <input className="border-2 rounded-xl"/>
                    <a>Horario:</a>
                </div>
                <div className="absolute bottom-0 grid grid-cols-2">
                    <button className="bg-green-300 hover:bg-green-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm">Agregar</button>
                    <button className="bg-red-300 hover:bg-red-500
                                    w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                            onClick={() => SetIsOpen(false)}>Cancelar</button>
                </div>
            </Modal>

            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}
                setOpenRecord={setOpenRecord}/>
            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}
                setOpenRecord={setOpenRecord}/>
            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}
                setOpenRecord={setOpenRecord}/>
        </>
    )
}