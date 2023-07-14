import useSignInGoogle from "@/hooks/useSignInGoogle"

export default function ContinueWithGoogle({ icon, title }) {
    const { login } = useSignInGoogle()
    return (
        <button onClick={login}>
            {title}
        </button>
    )
}