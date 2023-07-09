import axiosClient from "./axiosClient";

const historyApi = {
    getListByParams: (params) => {
        let url = '/api/histories?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    addHistory: (data) => {
        const url = `api/histories`
        return axiosClient.post(url, data)
    },
}

export default historyApi