import MultiDropdown from "components/MultiDropdown"

type ProductFilterProps ={

}

const ProductFilter = ({}: ProductFilterProps) => {
    return(
        <MultiDropdown 
            options={[]}
            value={[]}
            onChange={() => {}}
            getTitle={() => ''}
        />
    )
}

export default ProductFilter