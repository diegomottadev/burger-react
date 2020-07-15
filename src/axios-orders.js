import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-project-866af.firebaseio.com/'
})

export default instance;