import axiosClient from "./axiosClient";

const playlistApi = {
    getListByParams: (params) => {
        let url = '/api/playlists?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `api/playlists/${id}`
        return axiosClient.get(url)
    },
    createNew: (data) => {
        const url = `api/playlists`
        return axiosClient.post(url, data)
      },
    updateById: (id, data) => {
        const url = `/api/playlists/${id}`
        return axiosClient.patch(url, data)
    },
    deleteById: (id) => {
        const url = `/api/playlists/${id}`
        return axiosClient.delete(url)
    },
}

export default playlistApi