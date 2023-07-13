import { getPCN } from "@/utils/classes"

const className = 'login'
const pcn = getPCN(className)

export default function LoginComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title-section')}>
                    login
                </div>
            </div>
        </div>
    )
}