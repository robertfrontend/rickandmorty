import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { API } from '../API/config'
import { BsFillRecordCircleFill } from 'react-icons/bs';
import Loader from '../components/Loader';
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

    const [episodes, setEpisodes] = useState<Episodes[]>([])
    const [isLoader, setisLoader] = useState(true)

    useEffect(() => {
        getCharacter()
    }, [])


    const getCharacter = async () => {
        setisLoader(true)
        try {
            const response = await API.get(`character/${id}`)
            let data: any = []
            response.data.episode.map((epi: EpisodesInterface) => {

                let dt = epi.substring(40, 100)
                data.push({ 'name': dt, 'url': epi })

            })

            setEpisodes(data)
            setCharacters(response.data)
            setisLoader(false)

        } catch (error) {
            alert('error')
            setisLoader(false)
        }

    }

    return (
        <main className="bg-dark text-white" style={{ minHeight: '100vh' }}>
            <div className="container-fluid">
                <h1 className='py-4'>Profile</h1>
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
                                            episodes.map((res, key) => (
                                                <span key={key} className='d-block bg-primary w-100 my-2 card text-center text-white py-2'
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <b>Episodio: {res.name}</b>
                                                </span>
                                            ))
                                        }
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
` 