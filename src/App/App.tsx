import cn from 'clsx'
import styles from './App.module.scss'
import { useEffect } from 'react'
import productApi from '@/services/product-api'
import AppErrorBoundory from '@/widgets/AppErrorBoundory'
import { Outlet } from 'react-router-dom'
import Header from '@/widgets/Header'

const App = () => {
  useEffect(() => { productApi.getProductList({}).then(test => console.log(test)) }, [])
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
