import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { API } from '../API/config'
import { BsFillRecordCircleFill } from 'react-icons/bs';
import Loader from '../components/Loader';
import EpisodesProfile from '../components/EpisodesProfile';
// import { Characters } from "../interfaces/Character";


interface Characters {
    name: string
    id: number
    image: string
    status: string
    species: string
    location: {
        name: string
        url: string
    }
    origin: {
        name: string,
        url: string
    },
    episode: []
}
interface EpisodesInterface {
    substring(arg0: number, arg1: number): any;
    name: ''
}

interface Episodes {
    name: string;
    url: string;
}

const getEpisodesIds = (episodesUrls: string[]): number[] => {
    return episodesUrls.map(url => parseInt(url.split('/').pop()!))
}

export default function Profile() {
    const { id } = useParams();

    const [character, setCharacters] = useState<Characters>({
        name: '',
        id: 0,
        image: '',
        status: '',
        species: '',
        location: {
            name: '',
            url: ''
        },
        origin: {
            name: '',
            url: ''
        },
        episode: []
    })

    const [episodes, setEpisodes] = useState<[]>([])
    const [isLoader, setisLoader] = useState(true)


    useEffect(() => {
        getCharacter()
    }, [])


    const getCharacter = async () => {
        setisLoader(true)
        try {
            const response = await API.get(`character/${id}`)

            // obtener los episodios id
            const episodesIds = getEpisodesIds(response.data.episode)

            // obtener characteres
            setCharacters(response.data)
            setisLoader(false)

            // traer informacion de episodios
            getEpisodes(episodesIds)

        } catch (error) {
            alert('error')
            setisLoader(false)
        }
    }

    const getEpisodes = async (episodesIds: number[]) => {
        setisLoader(true)

        try {
            const response = await API.get(`episode/${episodesIds}`)

            console.log(response.data)

            if (response.data.length > 1) {
                setEpisodes(response.data)
            } else {
                let data: any = []
                data.push(response.data)
                console.log(data, 'data klk')
                setEpisodes(data)
            }
            setisLoader(false)

        } catch (error) {
            alert('error en episodios')
        }

    }

    return (
        <main className="bg-dark text-white" style={{ minHeight: '100vh' }}>
            <div className="container-fluid">
                <Link
                    to="/"
                    className='py-4  text-white d-block'
                    style={{ fontSize: '1.5em' }}>
                    <b>Go back</b>
                </Link>
                <CardContent>
                    {isLoader && (
                        <div className='w-100 text-center'><Loader /></div>
                    )}
                    {
                        !isLoader && (
                            <>
                                <div className='image'><img src={character.image} alt="" /></div>
                                <h2 style={{ fontWeight: 'bold' }} className='text-white text-center mt-3'>
                                    {character.name}
                                </h2>
                                <div className="card">
                                    <div className="p-3">
                                        <p >
                                            <BsFillRecordCircleFill
                                                className={character.status === 'Alive' ? 'text-success' : 'text-danger'}
                                            />
                                            <span className='mx-2'>{character.status} - {character.species} </span>
                                        </p>
                                        <h4>Origin</h4>
                                        <p>{character.origin.name}</p>
                                        <h4>Episodes</h4>
                                        {
                                            episodes.length > 0 && (
                                                <EpisodesProfile episodes={episodes} />

                                            )}
                                        <p>
                                            Last known location: <br />
                                            <span>{character.location.name}</span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </CardContent>
            </div>
        </main>
    )
}


const CardContent = styled.div`
    .image {
        width: 100%;
        border-radius: 200px;
        text-align: center;
        img {
            border-radius: inherit;
        }
    }
    .card {
        width: 50%;
        margin: 2em auto;
        color: #343a40;
        h4 {
            font-weight: bold;
        }
        p {
            font-size: 1.2em;
        }
    }

    @media screen and (max-width: 600px) {
        .card {
            width: 100%;
        }
    }
` 