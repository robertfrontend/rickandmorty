import { useEffect, useState } from "react";
import axios from "axios";
import ListCharacter from "./components/ListCharacter";
import { Characters } from './interfaces/Character'


interface ResponseApi {
  data: Object
}



function App() {


  const [data, setdata] = useState<ResponseApi>({ data: {} })
  const [characters, setCharacters] = useState<Characters[]>([])

  useEffect(() => {
    getCharacter()
  }, [])


  const getCharacter = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')

    setdata(response.data)
    setCharacters(response.data.results)
    console.log(response, 'response klk')
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a href="/" className="navbar-brand">
            Rick and Morty App
          </a>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">
              {/* <a href="">Hola world</a> */}
            </ul>
          </div>
        </div>
      </nav>

      <main className="bg-dark" style={{ minHeight: '100vh' }}>
        <div className="container-fluid">
          <h1 className="text-white py-4 text-center">Rick and Morty App with<br /> React.js + TypeScript</h1>
          <h2 className="text-white pt-4">Caracteres</h2>

          <div className="row">
            <ListCharacter characters={characters} />
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
