import clsx from "clsx";
import style from './ProductFilter.module.scss';
import MultiDropdown from "components/MultiDropdown";

type ProductFilterProps = {

}

const ProductFilter = ({ }: ProductFilterProps) => {
    return (
        <div className={clsx(style['filter'])}>
            <MultiDropdown
                options={[]}
                value={[]}
                onChange={() => { }}
                getTitle={() => ''}
            />
        </div>
    )
}

export default ProductFilter