import type { ProductResponseFull } from "types/product"
import style from './ImageGalery.module.scss'
import clsx from "clsx"

export type ImageGaleryProps = {
    images: ProductResponseFull['images']
}

const ImageGalery = ({ images }: ImageGaleryProps) => {
    return (
        <img
            className={clsx(style['img__img'])}
            src={images[0].url}
            alt={images[0].alternativeText ?? 'Card Image'}
        />
    )
}

export default ImageGalery;