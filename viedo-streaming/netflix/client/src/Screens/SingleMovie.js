import React from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { Movies } from '../Data/MovieData';
import Movieinfo from '../Components/Single/Movieinfo';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieRates from '../Components/Single/MovieRates';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Components/Movie'
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesAction, getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import { useEffect } from 'react';
import Loader from '../Components/Notification/Loader';
import { RiMovie2Line } from 'react-icons/ri';



const SingleMovie = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const sameClass = "w-full gap-6 flex-colo min-h-screen"

    //use selector
    const { isLoading, isError, movie } = useSelector((state) => state.getMovieById)
    const { movies } = useSelector((state) => state.getAllMovies);

    //related movies
    const RelatedMovies = movies?.filter((m) => m.category === movie?.category)

    //useEffect
    useEffect(() => {
        //movie id
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id])

    // console.log(movie)
    // const dispatch = useDispatch()
    // const { movies } = useSelector((state) => state.getAllMovies)

    // useEffect(() => {
    //     dispatch(getAllMoviesAction({}))
    // }, []);

    // const { likedMovies } = useSelector(state => state.userGetFavoriteMovies)
    // i have to update this with movies, i have to check with all the movies


    // const movie = Movies.find((movie) => movie?.name === id);
    // const movie = Movies.find((movie) => movie?._name === id);
    // const RelatedMovies = Movies.filter((m) => m?.category === movie?.category);
    // const RelatedMovies = Movies.filter((m) => m?.category === movie?.category);




    return (
        <Layout>
            {
                isLoading
                    ?
                    (
                        <div className={sameClass}>
                            <Loader />
                        </div>
                    )
                    :
                    (
                        isError
                            ?
                            (
                                <div className={sameClass}>
                                    <div className={sameClass}>
                                        <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl'>
                                            <RiMovie2Line />
                                        </div>
                                        <p className='text-border text-sm'>
                                            Something went wrong
                                        </p>
                                    </div>
                                </div>
                            )
                            :
                            <>
                                <ShareMovieModal modalOpen={modalOpen} setModalOpen={setModalOpen} movie={movie} />
                                <Movieinfo movie={movie} setModalOpen={setModalOpen} />
                                <div className='container mx-auto min-h-screen px-2 my-6'>
                                    <MovieCasts movie={movie} />
                                    {/* rates */}
                                    <MovieRates movie={movie} />
                                    {/* related */}
                                    {
                                        RelatedMovies?.length > 0
                                        &&
                                        <div className='my-16'>
                                            <Titles title='Related Movies' Icon={BsCollectionFill} />
                                            <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                                {
                                                    RelatedMovies?.map((movie) => (
                                                        <Movie key={movie?._id} movie={movie} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                    )
            }

        </Layout>
    )
}

export default SingleMovie