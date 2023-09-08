import axios from 'axios'

const Axios = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://thevsoni-netflixbackend.onrender.com/api",
})

export default Axios;
