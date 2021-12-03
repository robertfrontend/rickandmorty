
import { ChangeEvent, useState } from "react"
import { SearchInterface } from '../interfaces/SearchInterface'

type TypeInputChange = ChangeEvent<HTMLInputElement>


interface Props {
    searchCharacter: (inputsearch: SearchInterface) => void
}

export default function Search({ searchCharacter }: Props) {

    const [inputsearch, setInputSearch] = useState<string>('')


    const hanldeChange = ({ target: { value } }: TypeInputChange) => {
        setInputSearch(value)
    }

    const hanldeSearch = () => {
        searchCharacter({ inputsearch })
    }


    return (
        <div className="w-50 mx-auto">
            <div className="row">
                <div className="col-8">
                    <input
                        type="text"
                        placeholder="Search Character"
                        className="form-control mb-3 shadow-none border-0"
                        onChange={hanldeChange}
                    />
                </div>
                <div className="col" onClick={() => hanldeSearch()}>
                    <button className="btn btn-primary d-block w-100 shadow-none">Search</button>
                </div>
            </div>
        </div>
    )
}
