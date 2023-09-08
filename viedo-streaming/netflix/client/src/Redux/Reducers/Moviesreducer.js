import * as moviesConstants from '../Constants/MoviesConstants'

//get all movies
export const moviesListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_LIST_REQUEST:
            return { isLoading: true }
        case moviesConstants.MOVIES_LIST_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload.movies,
                pages: action.payload.pages,
                page: action.payload.page,
                totalMovies: action.payload.totalMovies,
            }
        case moviesConstants.MOVIES_LIST_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state;
    }
}

//get random movies
export const moviesRandomReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_RANDOM_REQUEST:
            return { isLoading: true }
        case moviesConstants.MOVIES_RANDOM_SUCCESS:
            return { isLoading: false, movies: action.payload }
        case moviesConstants.MOVIES_RANDOM_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state;
    }
}

//get movie by id
export const movieDetailsReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIE_DETAILS_REQUEST:
            return { isLoading: true }
        case moviesConstants.MOVIE_DETAILS_SUCCESS:
            return { isLoading: false, movie: action.payload }
        case moviesConstants.MOVIE_DETAILS_FAIL:
            return { isLoading: false, isError: action.payload }
        case moviesConstants.MOVIE_DETAILS_RESET:
            return { movie: {} }
        default:
            return state;
    }
}

//get top rated movies
export const movieTopRatedReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIE_TOP_RATED_REQUEST:
            return { isLoading: true }
        case moviesConstants.MOVIE_TOP_RATED_SUCCESS:
            return { isLoading: false, movies: action.payload }
        case moviesConstants.MOVIE_TOP_RATED_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state;
    }
}

//create review
export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.CREATE_REVIEW_REQUEST:
            return { isLoading: true }
        case moviesConstants.CREATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case moviesConstants.CREATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload }
        case moviesConstants.CREATE_REVIEW_RESET:
            return {}
        default:
            return state;
    }
}