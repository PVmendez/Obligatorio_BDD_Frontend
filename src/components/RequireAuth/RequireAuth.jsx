import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();

    console.log(auth);

    const roles = JSON.parse(auth.roles);

    return (
            roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;