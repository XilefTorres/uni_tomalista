import { useState } from "react";
import DisplayGroups from "../components/displayGroups";

export default function Groups(){

    const[cancel, setCancel] = useState(false)
    

    return (
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm">Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm"
                        onClick={() => setCancel(true)}>Eliminar</button>
            </div>

            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}/>
            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}/>
            <DisplayGroups
                setCancel={setCancel}
                cancel={cancel}/>
        </>
    )
}