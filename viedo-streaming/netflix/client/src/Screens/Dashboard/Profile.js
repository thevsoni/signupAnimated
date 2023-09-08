import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Uploader from '../../Components/Uploader'
import { Input } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileValidation } from '../../Components/Validation/UserValidation'
import { InlineError } from '../../Components/Notification/Error'
import { Imagepreview } from '../../Components/Imagepreview'
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions'
import toast from "react-hot-toast";


const Profile = () => {

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin)
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "")
    const { isLoading, isError, isSuccess } = useSelector((state) => state.userUpdateProfile);
    const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile);

    //validate user
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ProfileValidation)
    });

    //update profile
    const onSubmit = (data) => {
        dispatch(updateProfileAction({ ...data, image: imageUrl }))
    }

    //delete profile
    const deleteProfile = () => {
        window.confirm("Are you sure , you want to delete your profile ?")
            &&
            dispatch(deleteProfileAction())
    }

    //use effect
    useEffect(() => {
        if (userInfo) {
            setValue("fullName", userInfo?.fullName);
            setValue("email", userInfo?.email);
        }
        if (isSuccess) {
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
        }
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
            dispatch({ type: "USER_DELETE_PROFILE_RESET" })

        }
    }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError])

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>
                    Profile
                </h2>

                <div className='w-full grid lg:grid-cols-12 gap-6'>
                    <div className='col-span-10'>
                        <Uploader setImageUrl={setImageUrl} />
                    </div>
                    {/* image preview */}
                    <div className='col-span-2'>
                        <Imagepreview image={imageUrl} name={userInfo ? userInfo.fullName : "netflix app by thevsoni"} />
                    </div>
                </div>
                <div className='w-full'>

                    <Input
                        label="Your name"
                        placeholder="FullName"
                        type="text"
                        name="fullName"
                        register={register("fullName")}
                        bg={true}
                    />
                    {
                        errors.fullName && <InlineError text={errors.fullName.message} />
                    }
                </div>
                <div className='w-full'>

                    <Input
                        label="Email"
                        placeholder="xyz@gmail.com"
                        type="email"
                        name="email"
                        register={register("email")}
                        bg={true}
                    />
                    {
                        errors.email && <InlineError text={errors.email.message} />
                    }
                </div>
                <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button
                        onClick={deleteProfile}
                        disabled={deleteLoading || isLoading}
                        className='bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        {
                            deleteLoading ? "Deleting..." : "Delete Account"
                        }
                    </button>
                    <button
                        disabled={deleteLoading || isLoading}
                        className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        {
                            isLoading ? "Updating..." : "Update Profile"
                        }
                    </button>
                </div>
            </form>
        </SideBar>
    )
}

export default Profile