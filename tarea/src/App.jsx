import { useState, useEffect } from 'react'
import './App.css'

function Peliculas({ texto }) {
  const [estado, setEstado] = useState(false);
  return(
    <div
        className={`pelicula ${estado ? "completada" : ""}`}
        onClick={() => setEstado(!estado)}
    >
        <p>{texto}</p>
    </div>
  )
}

function App() {
  //Con esto, cuando abra la página, primero intentará leer las películas guardadas.
  const [peliculasList, setPeliculasList] = useState(() => {
    const peliculasGuardadas = localStorage.getItem("peliculas");

    return peliculasGuardadas
      ? JSON.parse(peliculasGuardadas)
      : [];
  });
  
  const [peliculaNueva, setPeliculaNueva] = useState('');

  //Cada vez que peliculasList cambie, React actualizará el Local Storage.
  useEffect(() => {
    localStorage.setItem(
      "peliculas",
      JSON.stringify(peliculasList)
    );
  }, [peliculasList]);

  return (
    <div className="app">
      <h1>Lista de peliculas</h1>
      <div className="formulario">
        <input
            type="text"
            placeholder="Ingrese una película"
            value={peliculaNueva}
            onChange={(e)=>setPeliculaNueva(e.target.value)}
        />

        <button onClick={()=>{
            if(peliculaNueva.trim()!==''){
                setPeliculasList([...peliculasList,peliculaNueva]);
                setPeliculaNueva('');
            }
        }}>
            Agregar
        </button>
      </div>
        {peliculasList.map((pelicula, index) => (
          <Peliculas key={index} texto={pelicula} />
        ))}
    </div>
  )
}

export default App
