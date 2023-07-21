import { getPCN } from "@/utils/classes";
import Link from "next/link";

const className = 'nav-header';
const pcn = getPCN(className);

const links = [
    { name: 'home', path: '/' },
    { name: 'create a room', path: '/create' },
    { name: 'join a room', path: '/rooms' }
]

export default function NavHeader() {
    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__links-section')}>
                    {links.map(link =>
                        <Link className={pcn('__link')} key={link.path} href={link.path}>
                            {link.name}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}