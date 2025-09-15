import { appRoutes } from 'constants/app-routes';

import cn from 'clsx';
import AppNameIcon from 'components/icons/AppNameIcon';
import LogoIcon from 'components/icons/LogoIcon';
import { Link } from 'react-router-dom';

import style from './AppLogo.module.scss';

const AppLogo = () => {
  return (
    <Link to={appRoutes.main.create()} className={cn(style['logo'])}>
      <LogoIcon />
      <AppNameIcon />
    </Link>
  );
};

AppLogo.displayName = 'AppLogo';
export default AppLogo;
