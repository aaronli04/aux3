import { getPCN } from "@/utils/classes"

const className = 'page-not-found'
const pcn = getPCN(className)

export default function PageNotFoundComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__title-section')}>
                    sorry the page you&apos;re looking for doesn&apos;t exist.
                </div>
            </div>
        </div>
    )
}