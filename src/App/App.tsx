import cn from 'clsx';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import style from './App.module.scss';
import AppErrorBoundory from './components/AppErrorBoundory';
import Header from './components/Header';

const App = () => {
  return (
    <div className={cn(style['app'])}>
      <AppErrorBoundory>
        <HelmetProvider>
          <Header />
          <Outlet />
        </HelmetProvider>
      </AppErrorBoundory>
    </div>
  );
};

export default App;
