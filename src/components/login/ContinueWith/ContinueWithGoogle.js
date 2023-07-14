import useSignInGoogle from "@/hooks/useSignInGoogle"

export default function ContinueWithGoogle() {
    const { login } = useSignInGoogle()
    return (
        <button onClick={login}>
            Continue with Google
        </button>
    )
}