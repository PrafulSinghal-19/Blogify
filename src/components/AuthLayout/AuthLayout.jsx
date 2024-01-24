import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Loader } from "../index"
import { getActiveUser } from "../../store/authSlice"
import { useDispatch } from 'react-redux';

const AuthLayout = ({ children, authenticated = true }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.userStatus);
    const promiseStatus = useSelector(state => state.auth.promiseStatus);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {        
    //     if (promiseStatus === "idle") {
    //         dispatch(getActiveUser());
    //     }

    //     if (authenticated && authStatus) {
    //         navigate('/');
    //     }
    //     if (!authenticated && !authStatus) {
    //         navigate('/login');
    //     }
        
    //     if (promiseStatus === "fulfilled" || promiseStatus === "rejected") setLoading(false);
    // }, [authenticated, authStatus, promiseStatus]);

    return loading ? <Loader /> : <>{children} </>;
}

export default AuthLayout;