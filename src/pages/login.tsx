import { useRef, useState } from "react";
import getFetch from "../functions/getFetch";

type LoginProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({setLogin} : LoginProps) {

    const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Si está vacía, se borró todo
    if (value === '') {
      setPassword('');
      setDisplayPassword('');
      return;
    }
  
    // Si borraron múltiples caracteres (por selección + borrar)
    if (value.length < password.length) {
      const newLength = value.length;
      setPassword(password.slice(0, newLength));
      setDisplayPassword("•".repeat(newLength));
      return;
    }
  
    // Si escribieron un carácter nuevo
    const lastChar = value.slice(-1);
    const newPassword = password + lastChar;
  
    setPassword(newPassword);
    setDisplayPassword("•".repeat(password.length) + lastChar);
  
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    // Programar nuevo timeout para ocultar el último carácter
    timeoutRef.current = setTimeout(() => {
      setDisplayPassword("•".repeat(newPassword.length));
    }, 300);
  };
    
    const [user, setUser] = useState("");

    const [error, setError] = useState(false)
    const handleChangeUser = (e : any) => {
        const value = e.target.value; //e es el valor de todo el input

        setUser(value)
    };

    const login = () => {
        
        fetch('http://localhost:3000/login/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre_Usuario": user,
                "contraseña_Usuario": password
            }),
            credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    setError(true)
                    throw new Error('Error en la petición: ' + response.status);
                }
                return response.json(); // o response.text() si no es JSON
            })
            .then(data => {
                console.log('Login exitoso:', data.message);
                
                getFetch("grupos", setLogin)
            })
            .catch(error => {
                console.error('Hubo un problema con la petición fetch:', error);
                setError(true)
            });
    }

    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center h-screen">
                <img className="size-30" 
                src="/conta-logo.png"></img>
                
                <div className="bg-white min-w-2/6 h-3/6 min-h-90 rounded-4xl
                                grid grid-cols-1">
                    <h1 className="font-bold p-5 text-2xl text-center">Iniciar Sesion</h1>
                    <div className="grid grid-cols-1 gap-4 px-5">
                        <a className="font-medium">Usuario:</a>
                        <input className="border-2 rounded-xl p-1"
                                type="text"
                                value={user}
                                onChange={handleChangeUser}></input>
                        <a className="font-medium">Contraseña:</a>
                        <input className="border-2 rounded-xl p-1" 
                            type="text"
                            value={displayPassword}
                            onChange={handleChange}/>
                        <a className={`text-red-600 ${error ? 'visible' : 'invisible'}`}>Usuario o contraseña incorrectas</a>
                    </div>
                    <div className="">
                        <button className="bg-green-300 hover:bg-green-500 
                                w-28 m-5 py-2 rounded-2xl text-sm float-end"
                                onClick={() => login()}>Ingresar</button>
                    </div>
                </div>
            </div>
        </>
    )
}