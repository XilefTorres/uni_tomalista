type DisplayListProps = {
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
    date: string,
    group: string
    getStudents: (group: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => void
}

export default function DisplayList({setOpenList, date, group, getStudents}: DisplayListProps){
    return(
        <>
            <button className="bg-white hover:bg-gray-300 h-12 w-5/6 mb-1 max-w-200 border-2"
                    onClick={() => getStudents(group, setOpenList)}>
                {date}</button>
        </>
    )
}