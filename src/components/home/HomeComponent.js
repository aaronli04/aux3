import { getPCN } from "@/utils/classes"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    console.log(pcn('__liner'))
    return (
        <div className={className}>
            what the fuck
        </div>
    )
}