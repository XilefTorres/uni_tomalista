import DisplayStudents from "../components/displayStudents"

type StudentsListprops = {
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StudentsList({setOpenList}: StudentsListprops) {

    return(
        <>
            <div className=" text-end">
                <button className="bg-green-300 hover:bg-green-500 float-start 
                                    w-25 my-5 ml-5 py-2 rounded-2xl text-sm"
                        onClick={() => setOpenList(false)}>Retroceder</button>
                <button className="bg-green-300 hover:bg-green-500 
                                w-25 my-5 mr-3 py-2 rounded-2xl text-sm"
                        >Agregar</button>
                <button className="bg-red-300 hover:bg-red-500 
                                w-25 mr-5 py-2 rounded-2xl text-sm"
                        >Eliminar</button>
            </div>

            <h1 className="font-bold text-3xl text-center pb-4">Lista de alumnos</h1>

            <DisplayStudents/>
        </>
    )
} 