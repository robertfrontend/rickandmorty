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
    const [isLoader, setisLoader] = useState(true)

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
        setisLoader(true)
        try {
            const response = await API.get(`character/?name=${inputsearch}`)
            console.log(response, 'response buscando characters')
            setisLoader(false)

            setdata(response.data)
            setCharacters(response.data.results)
            setErrorSearch(false)
        } catch (error) {
            setErrorSearch(true)
            setisLoader(false)

        }

    }

    const resetSearch = () => {
        getCharacter()
        setErrorSearch(false)

    }

    return (
        <>
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
                                <div className="pb-5 mx-auto w-100">
                                    <ul className="pagination pagination-sm mx-auto">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#">&laquo;</a>
                                        </li>
                                        {/* <li className="page-item active">
                                            <a className="page-link" href="#">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">4</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">5</a>
                                        </li> */}
                                        <li className="page-item">
                                            <a className="page-link" href="#">&raquo;</a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                </div>
            </main>
        </>
    )
}
