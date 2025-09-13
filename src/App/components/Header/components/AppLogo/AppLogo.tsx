import cn from 'clsx';
import style from './AppLogo.module.scss'
import { Link } from 'react-router-dom';
import { appRoutes } from 'constants/app-routes';
import LogoIcon from 'components/icons/LogoIcon';
import AppNameIcon from 'components/icons/AppNameIcon';

const AppLogo = () => {
    return (
        <Link
            to={appRoutes.main.create()}
            className={cn(style['logo'])}
        >
            <LogoIcon />
            <AppNameIcon />
        </Link>
    )
}

AppLogo.displayName = "AppLogo"
export default AppLogo;