import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'


interface Props {
    data: {
        name: string;
        episode: string
        air_date: string
    }
}

export default function CardEpisodeProfile({ data }: Props) {


    const [openinfo, setOpenInfo] = useState<boolean>(false)

    const openInfo = () => {
        setOpenInfo(!openinfo)
    }

    return (
        <span className='d-block bg-primary w-100 my-4 card text-center py-2 text-white px-4'
            style={{ cursor: 'pointer' }}
            onClick={() => openInfo()}
        >
            <div className="row">
                <div className="col-md-10" style={{ textAlign: 'left' }}>
                    <h5 className="text-white ">
                        <b>{data.name}</b>
                    </h5>
                </div>
                <div className="col">
                    <RiArrowDownSLine
                        style={{ fontSize: '2em' }}
                    />
                </div>
            </div>
            {
                openinfo && (
                    <div className="row pt-4">
                        <div className="col">
                            Code: {" "}
                            <b>{data.episode}</b>
                        </div>
                        <div className="col">
                            Date: {" "}
                            <b>{data.air_date}</b>
                        </div>
                    </div>
                )
            }
        </span>
    )
}
