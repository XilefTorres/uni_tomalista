export default function DisplayStudents() {
    return (
        <>
            <div className="place-self-center">
                <table className="">
                    <thead className="bg-white font-bold">
                        <tr className="">
                            <th className="border-2 p-2">Numero</th>
                            <th className="border-2 p-2">Nombre</th>
                            <th className="border-2 p-2">Matricula</th>
                            <th className="bg-yellow-300 p-2">Asistencia</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="text-center items-center justify-center">
                            <td className="border-2 p-2">1</td>
                            <td className="border-2 p-2">Jorge Xilef Jacobo Torres</td>
                            <td className="border-2 p-2">22020217</td>
                            <td className="bg-yellow-300 p-2">
                                <input className="size-5 " type="checkbox" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-end w-full">
                    <button className="bg-green-300 hover:bg-green-500
                                        w-30 my-5 ml-5 py-2 rounded-2xl text-sm">Guardar cambios</button>
                </div>
            </div>
        </>
    )
}