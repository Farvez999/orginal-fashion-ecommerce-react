import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../Shared/Loading/Loading";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    let location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoutes;