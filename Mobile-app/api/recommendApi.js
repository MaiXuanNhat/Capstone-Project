import axiosClient from "./axiosClient";

const recommendApi = {
    getSongRecommendations:(data) => {
        let url = 'api/recommend-songs?'
        return axiosClient.post(url, data)
    },
}

export default recommendApi