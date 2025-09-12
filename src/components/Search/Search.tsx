import Button from "components/Button"
import Input from "components/Input"
import Text from "components/Text"
import style from './Search.module.scss'
import { useMemo, type FC } from "react"

type SearchProps = {
    placeholder?: string,
    minSearchLength?: number,
    value: string,
    onChangeValue: (value: string) => void,
    onSearch: () => void
}

const Search: FC<SearchProps> = ({
    value,
    onChangeValue,
    placeholder,
    onSearch,
    minSearchLength
}) => {
    const disabled = useMemo(() => {
        return (!!minSearchLength && minSearchLength < value.length)
    }, [minSearchLength, value.length])

    return (
        <div>
            <Input
                value={value}
                onChange={onChangeValue}
                placeholder={placeholder}
            />
            <Button
                onClick={onSearch}
                disabled={disabled}
            >
                <Text>
                    Find now
                </Text>
            </Button>
        </div>
    )
}

export default Search