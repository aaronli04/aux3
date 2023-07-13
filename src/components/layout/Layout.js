export default function Layout({ children }) {
    return (
        <div>
            {/* <span>header</span> */}
            <main>{children}</main>
            {/* <span>footer</span> */}
        </div>
    )
}