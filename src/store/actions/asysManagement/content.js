import axios from 'axios'
export const newContentlist = params => {
    return axios.get('discoveryContent/save').then(res => res.data)
}