import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div>Header</div>
            <div><Outlet /></div>
            <div>Footer</div>
        </>
    )
}

export default Layout;