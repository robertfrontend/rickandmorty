import { Characters } from '../interfaces/Character'
import CardCharacter from './CardCharacter'
interface Props {
    characters: Characters[]
}


export default function ListCharacter({ characters }: Props) {
    return (
        <>
            {characters.map((char, key) => (
                <div className="col-md-4 my-3">
                    <CardCharacter character={char} />
                </div>
            ))}

        </>
    )
}
