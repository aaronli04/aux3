import { auth, db } from '../firebase/clientApp';
import { signInWithEmailAndPassword, signOut as authSignOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore'


const useAuth = () => {

    const [authObj, authLoading] = useAuthState(auth);
    const [user, userLoading] = useDocumentData(authObj && doc(db, 'users', authObj.uid));

    const signIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const signOut = async () => {
        await authSignOut(auth);
    }

    const createUser = async (user) => {
        // If the user is not logged in, return null
        if (!user) return null;

        // uid is id in the database
        const uid = user.uid;

        // Check if the user is already in the database
        const userDoc = await getDoc(doc(db, 'users', uid));

        // If the user is already in the database, return the user data
        if (userDoc.exists()) {
            const data = await userDoc.data();

            if (data == undefined) return null;

            const userData = {
                email: data.email,
                id: data.id,
                username: data.username,
                spotify_email: data.spotify_email,
                spotify_password: data.spotify_password
            };

            return userData;
        }

        // If the user is not in the database, create a new user
        const email = user.email;
        const username = user.displayName;
        if (email == null || username == null) {
            return null;
        }
        const userData = {
            email: email,
            id: uid,
            username: username,
            spotify_email: '',
            spotify_password: ''
        };

        // Add the user to the database
        await setDoc(doc(db, 'users', uid), userData);

        // Return the user data
        return userData;
    };

    return {
        auth: authObj,
        user: user,
        loading: authLoading || userLoading,
        createUser,
        signIn,
        signOut
    }
}

export default useAuth;