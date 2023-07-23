import React from "react"
import { getPCN } from "@/utils/classes"
import Image from "next/image"
import upvoteImage from '../../images/upvote.png'
import downvoteImage from '../../images/downvote.png'
import Link from "next/link"

const className = 'home'
const pcn = getPCN(className)

export default function HomeComponent() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__logo-section')}>
                    <div className={pcn('__logo-text')}>
                        auxparty
                    </div>
                </div>
                <div className={pcn('__middle-section')}>
                    <div className={pcn('__image-section')}>
                        <div className={pcn('__image-text')}>
                            upvoted songs move to top of queue
                        </div>
                        <Image src={upvoteImage} width={285} height={166} alt='turn me up gang' />
                    </div>
                    <div className={pcn('__image-section')}>
                        <div className={pcn('__image-text')}>
                            downvoted garbage isn&apos;t played
                        </div>
                        <Image src={downvoteImage} width={285} height={166} alt='turn that shit off' />
                    </div>
                </div>
                <div className={pcn('__end-section')}>
                    <div>
                        never let aux get ruined again
                    </div>
                    <Link className={pcn('__link')} href='/create'>
                        create a room
                    </Link>
                </div>
            </div>
        </div>
    )
}