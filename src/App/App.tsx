import cn from 'clsx';
import RootStoreProvider from 'context/root-store/RootStore';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import style from './App.module.scss';
import AppErrorBoundory from './components/AppErrorBoundory';
import Header from './components/Header';

const App = () => {
  return (
    <div className={cn(style['app'])}>
      <AppErrorBoundory>
        <RootStoreProvider>
          <HelmetProvider>
            <Header />
            <Outlet />
          </HelmetProvider>
        </RootStoreProvider>
      </AppErrorBoundory>
    </div>
  );
};

export default App;
