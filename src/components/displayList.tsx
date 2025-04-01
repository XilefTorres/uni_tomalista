type DisplayListProps = {
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DisplayList({setOpenList}: DisplayListProps){
    return(
        <>
            <button className="bg-white hover:bg-gray-300 h-12 w-5/6 mb-1 max-w-200 border-2"
                    onClick={() => setOpenList(true)}>
                Martes 25 de marzo del 2025</button>
        </>
    )
}