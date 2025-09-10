import cn from 'clsx'
import styles from './App.module.scss'
import { useEffect } from 'react'
import productApi from '@/services/product-api'

function App() {
  useEffect(() => { productApi.getProductList({}).then(test => console.log(test)) }, [])
  return (
    <div className={cn(styles['container'])}>
      E-commerce - онлайн-магазин бесполезных товаров
    </div>
  )
}

export default App
