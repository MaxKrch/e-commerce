import clsx from "clsx";
import type React from "react";
import style from './NetworkError.module.scss'

export type NetworkErrorProps = {
    contentSlot: React.ReactNode,
    className?: string,
    actionSlot?: React.ReactNode
}

const NetworkError: React.FC<NetworkErrorProps> = ({
    contentSlot,
    actionSlot,
}) => {
    return (
        <section className={clsx(style['container'])}>
            <div className={clsx(style['content'])}>
                {contentSlot}
            </div>
            <div className={clsx(style['action'])}>
                {actionSlot}
            </div>
        </section>
    )
}

export default NetworkError;