import { getPCN } from "@/utils/classes";
import Image from "next/image";
import Loading from "../../images/loading.png"

const className = 'loading';
const pcn = getPCN(className);

export default function LoadingComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <Image src={Loading} alt='loading...' />
                <div className={pcn('__title')}>
                    loading...
                </div>
            </div>
        </div>
    )
}