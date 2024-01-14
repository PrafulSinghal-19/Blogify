import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutService } from "../../store/authSlice";

const logout = () => {
    const dispatch = useDispatch();
    dispatch(logoutService());
}

export default logout;