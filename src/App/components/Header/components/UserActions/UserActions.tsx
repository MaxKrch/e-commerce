import clsx from "clsx";
import style from './UserActions.module.scss';
import BagIcon from "components/icons/CartIcon";
import UserIcon from "components/icons/UserIcon";
import { appRoutes } from "constants/app-routes";
import { memo } from "react";
import { Link } from "react-router-dom";

const UserActions = () => {
    return (
        <div className={clsx(style['actions'])}>
            <Link to={appRoutes.main.create()}>
                <BagIcon className={clsx(style['action'])} />
            </Link>
            <Link to={appRoutes.main.create()}>
                <UserIcon className={clsx(style['action'])} />
            </Link>
        </div>
    )
}

UserActions.displayName = "UserActions";
export default memo(UserActions)
