import AppMenu from 'constants/app-menu';

import clsx from 'clsx';
import Text from 'components/Text';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import style from './MainMenu.module.scss';

const MainMenu = () => {
  const classes = ({ isActive }: { isActive: boolean }) =>
    clsx({
      [style.link]: true,
      [style.active]: isActive,
    });

  return (
    <nav className={clsx(style['menu'])}>
      {AppMenu.map((item) => (
        <NavLink key={item.path} to={item.path} className={classes} end>
          <Text view="p-18">{item.title}</Text>
        </NavLink>
      ))}
    </nav>
  );
};

MainMenu.displayName = 'MainMenu';
export default memo(MainMenu);
