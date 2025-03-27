type DisplayGroups = {
    setCancel: React.Dispatch<React.SetStateAction<boolean>>
    cancel: boolean
    setOpenRecord: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DisplayGroups({setCancel, cancel, setOpenRecord} : DisplayGroups) {

    return (
        <>
            {cancel &&  
            <button className="bg-red-500 hover:bg-red-700 w-10 h-10 text-white font-bold text-xl 
                    justify-self-end rounded-full transform translate-y-5 translate-x-80"
                    onClick={() => setCancel(false)}>X</button>}
            
            <button className="bg-white hover:bg-gray-300 w-xs h-2xl p-3 ml-5 
                    rounded-2xl text-center border-l-7 border-t-5
                    grid grid-cols-1"
                    onClick={() => setOpenRecord(true)}>
                <a className="text-xl font-semibold">Materia</a>
                <a className="text-lg font-semibold">Semestre</a>
                <a className="font-semibold">Turno</a>
            </button>

            <hr className="my-8 border-1"></hr>
        </>
    )
}