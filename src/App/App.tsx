import { Outlet } from 'react-router-dom'
import cn from 'clsx';
import style from './App.module.scss';
import AppErrorBoundory from './components/AppErrorBoundory'
import Header from './components/Header'

const App = () => {
  return (
    <div className={cn(style['app'])}>
      <AppErrorBoundory>
        <Header />
        <Outlet />
      </AppErrorBoundory>
    </div>
  )
}

export default App
