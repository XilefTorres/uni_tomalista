import DisplayList from "../components/displayList";
import { ClassesDB } from "../db/classDB";

type RecordProps = {
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Record({setOpenRecord, setOpenList}: RecordProps) {

    return(
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 float-start 
                                    w-25 my-5 ml-5 py-2 rounded-2xl text-sm"
                        onClick={() => setOpenRecord(false)}>Retroceder</button>
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm">Agregar</button>
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
                    date={i.fecha.slice(0, 10)}/>
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