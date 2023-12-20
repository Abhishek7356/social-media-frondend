
import axios from 'axios';

export const commonApi = async (method, url, data) => {

    const config = {
        method,
        url,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    }

    return await axios(config).then((response) => response).catch((err) => err)
}

export const commonFileUploadApi = async (url, data) => {

    return await axios.post(url, data).then((response) => response).catch((err) => err)

}

export const commonFileUpdate = async (url, data) => {

    return await axios.put(url, data).then((response) => response).catch((err) => err)

}

export const commonApiFileUploadAndDatas = async (method, url, data, reqHeader) => {

    const config = {
        method,
        url,
        data,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }

    return await axios(config).then((response) => response).catch((err) => err)
}