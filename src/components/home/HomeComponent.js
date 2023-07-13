import { getPCN } from "@/utils/classes"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    return (
        <div className={className}>
            <div className={pcn('__title-section')}>
                aux3
            </div>
        </div>
    )
}