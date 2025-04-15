import getFetch from "../functions/getFetch"

type DisplayListProps = {
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
    date: string
}

export default function DisplayList({setOpenList, date}: DisplayListProps){
    return(
        <>
            <button className="bg-white hover:bg-gray-300 h-12 w-5/6 mb-1 max-w-200 border-2"
                    onClick={() => getFetch("alumnos", setOpenList)}>
                {date}</button>
        </>
    )
}