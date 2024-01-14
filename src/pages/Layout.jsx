import { Outlet } from "react-router-dom";
import {Header} from "../components"

const Layout = () => {
    return (
        <>
            <Header />
            <div><Outlet /></div>
            <div>Footer</div>
        </>
    )
}

export default Layout;