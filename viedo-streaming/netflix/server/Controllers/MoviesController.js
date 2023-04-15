import { MoviesData } from "../Data/MoviesData.js";
import Movie from '../Models/MoviesModel.js'
import asyncHandler from "express-async-handler";

// ******* PUBLIC CONTROLLERS *********
//@desc import movies
//@route post /api/movies/import
//@access public

const importMovies = asyncHandler(async (req, res) => {
    //first we make sure our movies table is empty by delete all documents
    await Movie.deleteMany({});
    //then we inserrt all movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

//@desc get all movies
//@route get /api/movies
//@access public
const getMovies = asyncHandler(async (req, res) => {
    try {
        //filter movies bt category ,time, language, rate, year and search
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(category && { category }),
            ...(search && { name: { $regex: search, $options: 'i' } }),
        }

        //load more movie functionality
        const page = Number(req.query.pageNumber) || 1; //if page number is not provided in query ,we set it 1
        const limit = 2; //2 movies per page
        const skip = (page - 1) * limit; //skip 2 movies per page
        //doubt here

        //find movie by query , skip, limit
        const movies = await Movie.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        //get total number of movies
        const count = await Movie.countDocuments(query);

        //send response with movies and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), //total number of pages
            totalMovies: count, //total number of movies
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//@desc get movie by id
//@route get /api/movies/:id
//@access public
const getMovieById = asyncHandler(async (req, res) => {
    try {
        //find movie by id in database
        const movie = await Movie.findById(req.params.id);
        //if the movie if found send it to the client
        if (movie) {
            res.json(movie);
        }
        //if the movie is not found send 404 error
        else {
            res.status(400);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//@desc get top rated movie
//@route get /api/movies/rated/top
//@access public
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        //find top rated movies
        const movies = await Movie.find({}).sort({ rate: -1 });
        //send top rated movie to client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//@desc get random movies
//@route get /api/movies/random/all
//@access public
const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        //find random movies
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        //send random movies to client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


// ****** PRIVATE CONTROLLERS *******

//@desc create movie review
//@route post /api/movies/:id/reviews
//@access private
const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        //find movie by id in db
        const movie = await Movie.findById(req.params.id);

        if (movie) {
            //check if user already reviewed this movie
            const alreadyReviewd = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            //if the user already reviewed this movie send error 400 
            if (alreadyReviewd) {
                res.status(400);
                throw new Error("you already reviewed this movie");
            }
            //else create a new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImages: req.user.image,
                rating: Number(rating),
                comment
            }
            //push the new review to the reviews array
            movie.reviews.push(review);
            //increment the number of reviews
            movie.numberOfReviews = movie.reviews.length;
            //calculate the new rate
            movie.rate = movie.reviews.reduce(
                (acc, item) => item.rating + acc, 0
            ) / movie.reviews.length;

            //save the movie in db
            await movie.save();
            //send the new movie to the client
            res.status(201).json({
                message: "Review added"
            });
        }
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// ****** ADMIN CONTROLLERS *******

//@desc update movie
//@route put /api/movies/:id
//@access private/admin
const updateMovie = asyncHandler(async (req, res) => {
    try {
        //get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts
        } = req.body;

        //find movie by id in db
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            //update movie data
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;

            //save the movie in db
            const updateMovie = await movie.save();

            //send the update movie to the client
            res.status(201).json(updateMovie)
        }
        else {
            res.status(404);
            throw new Error("movie not found");
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//@desc delete movie
//@route delete /api/movies/:id
//@access private/admin
const deleteMovie = asyncHandler(async (req, res) => {
    try {
        //find move by id in db
        const movie = await Movie.findById(req.params.id);
        //if the movie is found delete it
        if (movie) {
            await movie.deleteOne();
            res.json({ message: "movie deleted successfully" });
        }
        else {
            res.status(404);
            throw new Error("movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//@desc delete all movies
//@route delete /api/movies
//@access private/admin
const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        //delete all movies
        await Movie.deleteMany({});
        res.json({ message: "all movies removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//@desc create movie
//@route post /api/movies
//@access private/admin
const createMovie = asyncHandler(async (req, res) => {
    try {
        //get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts
        } = req.body;

        //create a new movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,
        })

        //save the movie in db
        if (movie) {
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        }
        else {
            res.status(400);
            throw new Error("invalid movie data");
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export { importMovies, getMovies, getMovieById, getTopRatedMovies, getRandomMovies, createMovieReview, updateMovie, deleteMovie, deleteAllMovies, createMovie }