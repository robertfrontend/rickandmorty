import styled from 'styled-components'
import { BsFillRecordCircleFill } from 'react-icons/bs'

import { Characters } from '../interfaces/Character'

interface Props {
    character: Characters
}

export default function CardCharacter({ character }: Props) {

    console.log(character.location.name)

    return (
        <Card className="card bg-secondary ">
            <div className="row">
                <div className="col-md-5">
                    <img src={character.image} alt="" />
                </div>
                <div className="col">
                    <div className="p-3">
                        <h3 style={{ fontWeight: 'bold' }}>{character.name} </h3>
                        <p >
                            <BsFillRecordCircleFill
                                className={character.status === 'Alive' ? 'text-success' : 'text-danger'}
                            />
                            <span className='mx-2'>{character.status} - {character.species} </span>
                        </p>
                        <p className='text-dark'>
                            Last known location: <br />
                            <span style={{ fontWeight: 'normal' }}>{character.location.name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Card >
    )
}

const Card = styled.div`
    h3 {
        font-size: 1.3em;
    }
    img {
        width: 100%;
        min-height: 250px;
        object-fit: cover;
    }
    p {
        font-size: 1.1em;
        font-weight: 700;
        span {
            font-weight: normal;
        }
    }
`