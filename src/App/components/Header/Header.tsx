import cn from 'clsx';
import { memo } from 'react';

import style from './Header.module.scss';
import AppLogo from './components/AppLogo';
import MainMenu from './components/MainMenu';
import UserActions from './components/UserActions';
import useInitApp from 'hooks/useInitApp';

const Header = () => {
  useInitApp();

  return (
    <header className={cn(style['header'])}>
      <div className={cn(style['content-container'])}>
        <AppLogo />
        <MainMenu />
        <UserActions />
      </div>
    </header>
  );
};

export default memo(Header);
