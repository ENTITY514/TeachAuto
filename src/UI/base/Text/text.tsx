import { COLORS } from "UI/colors.settings"
import { FONT_SETTINGS, FONT_SETTINGS_ENUM } from "UI/fonts.settings"

interface ITextProps {
    children: string | JSX.Element | React.ReactNode
    color?: COLORS
    fontSize?: string
    cursor?: string
    onClick?: () => void
    textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
    lineHeight?: string
    fontWeight?: number
    display?: string
    margin?: string
    fontSettings?: FONT_SETTINGS_ENUM
    fontStyle?: string

}

export const Text: React.FC<ITextProps> = ({
    children,
    fontSettings = FONT_SETTINGS_ENUM.MEDIUM,
    color = COLORS.WHITE,
    fontSize,
    cursor,
    onClick,
    textAlign,
    lineHeight,
    fontWeight,
    fontStyle,
    display,
    margin
}) => {
    return (
        <div
            style={{
                fontWeight: fontWeight ? fontWeight : FONT_SETTINGS[fontSettings].fontWeight,
                lineHeight: lineHeight ? lineHeight : FONT_SETTINGS[fontSettings].lineHeight,
                fontSize: fontSize ? fontSize : FONT_SETTINGS[fontSettings].fontSize,
                fontStyle: fontStyle ? fontStyle : FONT_SETTINGS[fontSettings].fontStyle,
                color,
                cursor,
                textAlign,
                display,
                margin
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}