import { useState } from 'react'
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
  const [peliculasList, setPeliculasList] = useState([]);
  const [peliculaNueva, setPeliculaNueva] = useState('');
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
