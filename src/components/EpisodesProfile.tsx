import CardEpisodeProfile from './CardEpisodeProfile'

export default function EpisodesProfile({ episodes }: any | null) {

    return (
        <>
            {
                episodes.map((data: any, key: number) => (
                    <CardEpisodeProfile data={data} key={key} />
                ))
            }
        </>
    )
}
