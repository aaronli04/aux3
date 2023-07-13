import NavHeader from "./NavHeader"

export default function Layout({ children }) {
    return (
        <div>
            <NavHeader />
            <main>{children}</main>
            {/* <span>footer</span> */}
        </div>
    )
}