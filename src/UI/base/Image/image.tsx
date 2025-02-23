import { COLORS } from "UI/colors.settings"
import style from "./style.module.css"

interface IStandartWrapperProps {
    margin?: string
    padding?: string
    width?: string
    height?: string
    borderRadius?: string
    backgroundColor?: COLORS | string
    border?: string
    onClick?: () => void | undefined
    cursor?: string
    url: string
    cover?: boolean
}

export const Image: React.FC<IStandartWrapperProps> = ({
    margin = "12px",
    padding = "12px",
    width = "auto",
    height = "auto",
    borderRadius = "12px",
    backgroundColor = COLORS.EMPTY,
    border = "none",
    cursor,
    onClick,
    url,
    cover = false,
}) => {
    return (
        <div
            className={style.container}
            style={{
                margin,
                padding,
                width,
                height,
                borderRadius,
                backgroundColor,
                border,
                cursor,
                backgroundImage: "url(" + url + ")",
                backgroundSize: cover ? "cover" : "contain"
            }}
            onClick={onClick}
        />
    )
}