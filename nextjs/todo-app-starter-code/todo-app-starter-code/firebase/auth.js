import {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";
import {
    onAuthStateChanged,
    signOut as authSignOut
} from "firebase/auth";
import { auth } from "./firebase"

// onAuthStateChanged , it will change each time ehen user login, register or logout

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true
})

export default function useFirebaseAuth() {

    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clear = () => {
        setAuthUser(null)
        setIsLoading(false);
    }
    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) { //it runs at the time of sign out
            clear();
            return;
        }
        //else it runs at the time of login
        setAuthUser({
            uid: user.uid,
            email: user.email,
            username: user.displayName
        })
        setIsLoading(false);
    }

    const signOut = () => {
        authSignOut(auth).then(() => clear());
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)
        return () => unsubscribe();
    }, [])

    return {
        authUser,
        isLoading,
        setAuthUser,
        setIsLoading,
        signOut
    }

}

export const AuthUserProvider = ({ children }) => {

    const auth = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    )
}

export const useAuth = () => useContext(AuthUserContext)
