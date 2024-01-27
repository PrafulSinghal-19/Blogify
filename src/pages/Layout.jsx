import { Header, Footer } from "../components"
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { Loader } from "../components"
import { getActiveUser } from "../store/authSlice"
import { useDispatch } from 'react-redux';

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.userStatus);
    const promiseStatus = useSelector(state => state.auth.promiseStatus);
    const [loading, setLoading] = useState(true);

    const [pathName, setPathName] = useState('');

    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        setPathName(pathname);
    }, []);

    const protectedRoutes = [/^\/$/, /^\/createBlog$/, /^\/post\/([^\/]+)$/];

    const unProtectedRoutes = [/^\/login/, /^\/signup/];

    useEffect(() => {    
        if (promiseStatus === "idle") {
            dispatch(getActiveUser());
        } 
        
        if (promiseStatus === "fulfilled" || promiseStatus === "rejected") {
            setLoading(false);
            if (authStatus) {
                console.log(protectedRoutes.find(route => route.test(pathName)), pathName)
                if (protectedRoutes.find(route => route.test(pathName))) navigate(pathName);
                else navigate('/');
            }
            else {
                if (unProtectedRoutes.find(route => route.test(pathName))) navigate(pathName);
                else navigate('/login');
            }   
        }
    }, [authStatus, promiseStatus]);

    return (
        <>
            <Header />
            {loading && <Loader text="Loading" />}
            {!loading && <Outlet />}
            <Footer />
        </>
    )
}

export default Layout;