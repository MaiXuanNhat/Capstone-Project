import axiosClient from "./axiosClient";

const songApi = {
    getListByParams: (params) => {
        let url = '/api/songs?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getListById: (data) => {
        const url = `api/songs`
        return axiosClient.post(url, data)
    },
    getOneBySpotifyId: (spotifyId) => {
        const url = `api/songs/get-by-spotify-id/${spotifyId}`
        return axiosClient.get(url)
    }
}

export default songApi