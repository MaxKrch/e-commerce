import Search from "components/Search";
import { useCallback, useState } from "react";

export type ProductSearchProps = {
    onSearch: (value: string) => void
}

const ProductSearch = ({
    onSearch
}: ProductSearchProps) => {
    const [value, setValue] = useState('');

    const handleChange = useCallback((newValue: string) => {
        if (newValue !== value) setValue(newValue)
    }, [value]);

    const handleSearch = useCallback(() => {
        onSearch(value),
            setValue('')
    }, [value])

    return (
        <Search
            value={value}
            onChangeValue={handleChange}
            onSearch={handleSearch}
            placeholder="Search product"
        />
    )

}

export default ProductSearch