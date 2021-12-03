export interface Characters {
    name: string
    id: number
    image: string
    status: string
    species: string
    location: {
        name: string
        url: string
    }
    episode: []
}
