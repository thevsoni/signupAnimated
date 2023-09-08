import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
//using createUserWithEmailAndPaasord, here we can register user only with email and pwd

import { useAuth } from "@/firebase/auth"
import { useRouter } from "next/router"


const provider = new GoogleAuthProvider();

const RegisterForm = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { authUser, isLoading, setAuthUser } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/")
        }
    }, [authUser, isLoading])

    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user);

        } catch (error) {
            console.error(error)
        }
    }

    const signupHandler = async () => {
        if (!email || !username || !password) {
            return;
        }
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: username })
            console.log(user);
            setAuthUser({
                uid: user.uid,
                email: user.email,
                username
            })


        } catch (error) {
            console.error("error in signup")
        }
    }
    return
    isLoading || (!isLoading && authUser)
        ?
        "Loading"
        :
        (
            <main className="flex lg:h-[100vh]">
                <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                    <div className="p-8 w-[600px]">
                        <h1 className="text-6xl font-semibold">Sign Up</h1>
                        <p className="mt-6 ml-1">
                            Already have an account ?{" "}
                            <span className="underline hover:text-blue-400 cursor-pointer">
                                Login
                            </span>
                        </p>

                        <div onClick={signInWithGoogle} className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
                            <FcGoogle size={22} />
                            <span className="font-medium text-black group-hover:text-white">
                                Login with Google
                            </span>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                />
                            </div>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                />
                            </div>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                />
                            </div>
                            <button
                                onClick={signupHandler}
                                className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                <div
                    className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                    style={{
                        backgroundImage: "url('/login-banner.jpg')",
                    }}
                ></div>
            </main>
        );
};

export default RegisterForm;
