import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const AuthLayout = ({children, authenticated=true}) => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authenticated && authStatus) {
            navigate('/');
        }
        if (!authenticated && !authStatus) {
            navigate('/login');
        }
        setLoading(false);
    }, [authenticated, authStatus]);

    return loading ? <CircularProgress /> : <>{ children }</>;
}

export default AuthLayout;