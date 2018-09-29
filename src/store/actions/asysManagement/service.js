import axios from 'axios'
export const newclassifylist = params => {
    return axios.get('discoveryCatalog/save').then(res => res.data)
}