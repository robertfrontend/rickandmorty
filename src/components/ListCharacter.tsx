import { Characters } from '../interfaces/Character'
import CardCharacter from './CardCharacter'
import { Link } from 'react-router-dom'

interface Props {
    characters: Characters[]
}
export default function ListCharacter({ characters }: Props) {
    return (
        <>
            {characters.map((char, key) => (
                <div className="col-md-4 my-3">
                    <Link to={`/profile/${char.id}`} style={{ textDecoration: 'none' }}>
                        <CardCharacter character={char} />
                    </Link>
                </div>
            ))}

        </>
    )
}
