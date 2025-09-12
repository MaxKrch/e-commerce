import cn from 'clsx'
import styles from './App.module.scss'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import productApi from 'services/product-api'
import AppErrorBoundory from './components/AppErrorBoundory'
import Header from './components/Header'

const App = () => {
  useEffect(() => { productApi.getProductList({ request: {} }).then(test => console.log(test)) }, [])
  return (
    <AppErrorBoundory>
      <div className={cn(styles['container'])}>
        E-commerce - онлайн-магазин бесполезных товаров
      </div>
      <Header></Header>
      <Outlet />
    </AppErrorBoundory>

  )
}

export default App
