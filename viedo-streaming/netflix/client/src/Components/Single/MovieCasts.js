import React from 'react'
import Titles from '../Titles'
import { FaUserFriends } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { UserData } from '../../Data/MovieData'

const MovieCasts = ({ movie }) => {
    return (
        movie?.casts?.length > 0
        &&
        (
            <div className='my-12'>
                <Titles title='Casts' Icon={FaUserFriends} />
                <div className='mt-10'>
                    <Swiper autoplay={{
                        delay: 1000,
                        disableOnInteraction: false
                    }}
                        loop={true}
                        speed={1000}
                        modules={[Autoplay]}
                        spaceBetween={10}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            400: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {
                            // UserData.map((user, i) => (
                            movie?.casts?.map((cast) => (
                                <SwiperSlide key={cast?._id}>
                                    <div className='w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800'>
                                        <img
                                            // src={`/images/${user.image}`}  
                                            src={cast?.image ? `/images/${cast?.image}` : "/images/user.png"}
                                            alt={cast?.name}
                                            className='w-full h-64 object-cover rounded mb-4' />
                                        <p>{cast?.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>
        )
    )
}

export default MovieCasts