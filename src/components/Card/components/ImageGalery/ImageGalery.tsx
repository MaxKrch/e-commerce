import clsx from 'clsx';
import type { Product } from 'types/products';

import style from './ImageGalery.module.scss';

export type ImageGaleryProps = {
  images: Product['images'];
};

const ImageGalery = ({ images }: ImageGaleryProps) => {
  return (
    <img
      className={clsx(style['img__img'])}
      src={images[0].url}
      alt={images[0].alternativeText ?? 'Card Image'}
    />
  );
};

export default ImageGalery;
