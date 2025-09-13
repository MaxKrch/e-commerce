import clsx from "clsx";
import style from './MainMenu.module.scss';
import { memo } from "react";
import { NavLink } from 'react-router-dom'
import Text from "components/Text";
import AppMenu from "constants/app-menu";

const MainMenu = () => {
    const classes = ({ isActive }: { isActive: boolean }) => clsx({
        [style.link]: true,
        [style.active]: isActive,
    })

    return (
        <nav className={clsx(style['menu'])}>
            {AppMenu.map(item => (
                <NavLink
                    to={item.path}
                    className={classes}
                >
                    <Text view="p-18">
                        {item.title}
                    </Text>
                </NavLink>
            ))}
        </nav>
    )
}

MainMenu.displayName = "MainMenu"
export default memo(MainMenu);