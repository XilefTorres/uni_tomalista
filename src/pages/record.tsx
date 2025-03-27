import DisplayList from "../components/displayList";

export default function record() {

    return(
        <>
            <h1 className="text-center m-10 text-3xl font-bold">
                Historial</h1>
            <div className="text-center">
                <DisplayList/>
                <DisplayList/>
                <DisplayList/>
                <DisplayList/>
                <DisplayList/>
            </div>

            <div className="text-end place-self-center w-5/6 max-w-200">
                <button className="bg-green-300 hover:bg-green-500 
                                    w-25 my-5 py-3 rounded-2xl text-sm">
                Imprimir Excel</button>    
            </div>
        </>
    )
}