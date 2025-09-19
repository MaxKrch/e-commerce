import clsx from "clsx";
import style from '../NetworkError.module.scss'
import Text from "components/Text";

const defaultContentSlot = () => {
    return (
        <>
            <Text color="primary" className={clsx(style['content-title'])}>
                Кажется, что-то пошло не так
            </Text>
            <Text color="primary" className={clsx(style['content-body'])}>
                Попробуем снова?
            </Text>
        </>
    )
}

export default defaultContentSlot;