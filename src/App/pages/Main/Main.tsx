import { appRoutes } from "constants/app-routes";
import { Navigate } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <Navigate to={appRoutes.products.list.create()}></Navigate>
        </div>
    )
}

export default MainPage;