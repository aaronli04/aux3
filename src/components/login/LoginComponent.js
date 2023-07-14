import { getPCN } from "@/utils/classes"
import ContinueWithGoogle from "./ContinueWith/ContinueWithGoogle"

const className = 'login'
const pcn = getPCN(className)

export default function LoginComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title-section')}>
                    login
                </div>
                <div className={pcn('__button-section')}>
                    <ContinueWithGoogle title='Continue with Google'/>
                </div>
            </div>
        </div>
    )
}