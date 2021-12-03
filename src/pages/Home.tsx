import axios from "axios";
import React, { useEffect, useState } from "react";
import ListCharacter from "../components/ListCharacter";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { Characters } from "../interfaces/Character";
import { SearchInterface } from '../interfaces/SearchInterface'


import { API } from "../API/config";

interface ResponseApi {
    data: Object
}

export default function Home() {
    const [data, setdata] = useState<ResponseApi>({ data: {} })
    const [characters, setCharacters] = useState<Characters[]>([])
    const [isLoader, setisLoader] = useState(false)

    const [errorsearch, setErrorSearch] = useState(false)

    useEffect(() => {
        getCharacter()

    }, [])


    const getCharacter = async () => {
        setisLoader(true)

        try {
            const response = await API.get('character')
            console.log("characters,")

            setdata(response.data)
            setCharacters(response.data.results)
            setisLoader(false)
        } catch (error) {
            alert('ha ocurrido un error')
            setisLoader(false)
        }
    }

    const searchCharacter = async ({ inputsearch }: SearchInterface) => {
        try {
            const response = await API.get(`character/?name=${inputsearch}`)
            console.log(response, 'response buscando characters')

            setdata(response.data)
            setCharacters(response.data.results)
            setErrorSearch(false)
        } catch (error) {
            setErrorSearch(true)
        }

    }

    const resetSearch = () => {
        getCharacter()
        setErrorSearch(false)

    }

    return (
        <>
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

                    <Search searchCharacter={searchCharacter} />

                    {
                        errorsearch && (
                            <div className="w-50 mx-auto">
                                <div className="alert alert-dismissible alert-danger text-center">
                                    <b>Character not found</b> <a href="#" className="alert-link"
                                        onClick={() => resetSearch()}
                                    >to reset
                                    </a>
                                </div>
                            </div>
                        )
                    }

                    {isLoader ?
                        <div className="text-center"><Loader /></div>
                        : (
                            <>
                                <h2 className="text-white pt-4">Caracteres</h2>
                                <div className="row">
                                    <ListCharacter characters={characters} />
                                </div>
                            </>
                        )}
                </div>
            </main>
        </>
    )
}
