import Button from "components/Button"
import Input from "components/Input"
import Text from "components/Text"
import style from './Search.module.scss'
import { useMemo, type FC } from "react"
import clsx from "clsx"

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
        <div className={clsx(style['search'])}>
            <Input
                value={value}
                onChange={onChangeValue}
                placeholder={placeholder}
                className={clsx(style['input'])}
            />
            <Button
                onClick={onSearch}
                disabled={disabled}
                className={clsx(style['button'])}
            >
                <Text>
                    Find now
                </Text>
            </Button>
        </div>
    )
}

export default Search