import clsx from "clsx";
import style from './MainMenu.module.scss';
import { appRoutes } from "consts/app-routes";
import { memo } from "react";
import { NavLink } from 'react-router-dom'
import Text from "components/Text";

const MainMenu = () => {
    const classes = ({ isActive }: { isActive: boolean }) => clsx({
        [style.link]: true,
        [style.active]: isActive,
    })

    return (
        <nav className={clsx(style['menu'])}>
            <NavLink
                to={appRoutes.products.list.create()}
                className={classes}
            >
                <Text view="p-18">
                    {appRoutes.products.list.title}
                </Text>
            </NavLink>
            <NavLink
                to={appRoutes.categories.create()}
                className={classes}
            >
                <Text view="p-18">
                    {appRoutes.categories.title}
                </Text>
            </NavLink>
            <NavLink
                to={appRoutes.about.create()}
                className={classes}
            >
                <Text view="p-18">
                    {appRoutes.about.title}
                </Text>
            </NavLink>
        </nav>
    )
}

MainMenu.displayName = "MainMenu"
export default memo(MainMenu);