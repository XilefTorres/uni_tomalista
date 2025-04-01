import { useState } from "react";

type LoginProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({setLogin} : LoginProps) {

    const [password, setPassword] = useState("");
    const [displayPassword, setDisplayPassword] = useState("");

    const handleChange = (e : any) => {
        const value = e.target.value; //e es el valor de todo el input

        if(value.slice(-1) === "•" || value.slice(-1) === ""){ //revisa si el ultimo caracter de la contraseña es un punto
        //                                                      (al tener mas de un valor le pone un punto con el backspace) o un espacio vacio
            setPassword(password.slice(0, -1));  //elimina el ultimo caracter
            setDisplayPassword(displayPassword.slice(0, -1));  
        } else{
            const lastChar = value.slice(-1); // Obtiene el último carácter ingresado
            setPassword(password + lastChar);
            setDisplayPassword("•".repeat(password.length) + lastChar);

            // Oculta el último carácter después de 500ms
            setTimeout(() => {
                setDisplayPassword("•".repeat(password.length + 1));
            }, 500);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center h-screen">
                <img className="size-30" 
                src="src/assets/conta-logo.png"></img>
                
                <div className="bg-white min-w-2/6 h-3/6 min-h-90 rounded-4xl">
                    <h1 className="font-bold p-5 text-2xl text-center">Iniciar Sesion</h1>
                    <div className="grid grid-cols-1 gap-4 px-5">
                        <a className="font-medium">Usuario:</a>
                        <input className="border-2 rounded-xl p-1"></input>
                        <a className="font-medium">Contraseña:</a>
                        <input className="border-2 rounded-xl p-1" 
                            type="text"
                            value={displayPassword}
                            onChange={handleChange}/>
                        <a className="text-red-600">Usuario o contraseña incorrectas</a>
                    </div>
                    <button className="bg-green-300 hover:bg-green-500 
                            w-28 m-5 py-2 rounded-2xl text-sm"
                            onClick={() => setLogin(true)}>Ingresar</button>
                </div>
            </div>
        </>
    )
}