/* Utility For Axios Client to server endpoint request to server */
import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://oneshot-api.herokuapp.com/api/'
})

export default instance;