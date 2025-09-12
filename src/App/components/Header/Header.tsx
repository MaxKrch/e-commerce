import cn from "clsx";
import style from './Header.module.scss';
import AppLogo from "./components/AppLogo";
import MainMenu from "./components/MainMenu";
import UserActions from "./components/UserActions";

const Header = () => {
    return (
        <header className={cn(style['header'])}>
            <div className={cn(style['content-container'])}>
                <AppLogo />
                <UserActions />
                <MainMenu />
            </div>
        </header>
    )
}

export default Header;