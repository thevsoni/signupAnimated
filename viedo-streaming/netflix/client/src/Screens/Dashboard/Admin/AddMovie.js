import React from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UsedInputs'
import Uploader from '../../../Components/Uploader'
import { CategoriesData } from '../../../Data/CategoriesData'
import { UserData } from '../../../Data/MovieData'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastsModal from '../../../Components/Modals/CastsModal'
import { useState } from 'react'
import { useEffect } from 'react'

const AddMovie = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);

    useEffect(() => {
        if (modalOpen === false) {
            setCast();
        }
    }, [modalOpen]);
    return (
        <SideBar>
            <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>
                    Create Movie
                </h2>
                <div className='w-full grid md:grid-cols-2 gap-6'>

                    <Input
                        label="Movie Title"
                        placeholder='Game of Thrones'
                        type="text"
                        bg={true}
                    />
                    <Input
                        label="Hours"
                        placeholder='2hrs'
                        type="text"
                        bg={true}
                    />
                </div>

                <div className='w-full grid md:grid-cols-2 gap-6'>

                    <Input
                        label="Language Used"
                        placeholder='English'
                        type="text"
                        bg={true}
                    />
                    <Input
                        label="Year of Release"
                        placeholder='2023'
                        type="number"
                        bg={true}
                    />
                </div>

                {/* images */}
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    {/* img without title */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Image without Title
                        </p>
                        <Uploader />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img src="/images/movies/1.jpg" alt="" className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                    {/* image with title */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Image with Title
                        </p>
                        <Uploader />
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img src="/images/movies/2.jpg" alt="" className='w-full h-full object-cover rounded' />
                        </div>
                    </div>
                </div>

                {/* descriptions */}
                <Message label="Movie Description" placeholder="Make it short and sweet" />

                {/* category */}
                <div className='text-sm w-full'>
                    <Select label="Movie Category" options={CategoriesData} />
                </div>

                {/* movie video */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className='text-border font-semibold text-sm'>
                        Movie Video
                    </label>
                    <Uploader />
                </div>

                {/* casts */}
                <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
                    <button onClick={() => { setModalOpen(true) }} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
                        Add Cast
                    </button>
                    <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
                        {
                            UserData.map((user, i) => (
                                <div key={i} className='p-2 italic text-xs text-text rounded flex-colo bg-main border border-border'>
                                    <img src={`/images/${user.image ? user.image : "/user.png"}`} alt={user.fullName}
                                        className='w-full h-24 rounded mb-2 object-cover' />
                                    <p>{user.fullName || user.name}</p>
                                    <div className='flex-rows mt-2 w-full gap-2'>
                                        <button className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                                            <MdDelete />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCast(user);
                                                setModalOpen(true)
                                            }}
                                            className='w-6 h-6 flex-colo bg-dry border border-border text-green-500 rounded'>
                                            <FaEdit />
                                        </button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>

                {/* submit */}
                <button className='bg-subMain w-full flex-rows gap-4 font-medium text-white py-4 rounded'>
                    <ImUpload /> Publish Movies
                </button>
            </div>
        </SideBar>
    )
}

export default AddMovie