import axiosClient from "./axiosClient";

const songApi = {
    getListByParams: (params) => {
        let url = '/api/songs?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `api/songs/${id}`
        return axiosClient.get(url)
    },
    getOneBySpotifyId: (spotifyId) => {
        const url = `api/songs/get-by-spotify-id/${spotifyId}`
        return axiosClient.get(url)
    }
}

export default songApi