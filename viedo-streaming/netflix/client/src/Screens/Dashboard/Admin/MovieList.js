import React from 'react'
import Table from '../../../Components/Table'
import { Movies } from '../../../Data/MovieData'
import SideBar from '../SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import { toast } from 'react-hot-toast'
import Loader from '../../../Components/Notification/Loader'
import { Empty } from '../../../Components/Notification/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'


const MoviesList = () => {

    const dispatch = useDispatch()
    const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllMovies)

    const sameClass = "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain"

    useEffect(() => {
        //errors
        if (isError) {
            toast.error(isError);
        }
        dispatch(getAllMoviesAction({}))
    }, [dispatch, isError]);

    //pagination next and prev pages
    const nextPage = () => {
        dispatch(getAllMoviesAction({
            pageNumber: page + 1
        }))
    }
    const prevPage = () => {
        dispatch(getAllMoviesAction({
            pageNumber: page - 1
        }))
    }
    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>
                        Movies List
                    </h2>
                    <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                        Delete All
                    </button>
                </div>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        movies?.length > 0
                            ?
                            <>
                                <Table data={movies} admin={true} />
                                {/* Loading more */}
                                {/* <div className='w-full flex-rows gap-6 md:my-20 my-10'> */}
                                <div className='w-full flex-rows gap-6 my-5'>
                                    <button
                                        onClick={prevPage}
                                        disabled={page === 1}
                                        className={sameClass}>
                                        <TbPlayerTrackPrev className="text-xl" />
                                    </button>
                                    <button
                                        onClick={nextPage}
                                        disabled={page === pages}
                                        className={sameClass}>
                                        <TbPlayerTrackNext className="text-xl" />
                                    </button>
                                </div>
                            </>
                            :
                            <Empty message="you have no movies" />
                }
            </div>
        </SideBar>
    )
}

export default MoviesList