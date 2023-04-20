import React from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { Movies } from '../Data/MovieData';
import Movieinfo from '../Components/Single/Movieinfo';


const SingleMovie = () => {
    const { id } = useParams();
    const movie = Movies.find((movie) => movie.name === id);
    return (
        <Layout>
            <Movieinfo movie={movie} />
        </Layout>
    )
}

export default SingleMovie