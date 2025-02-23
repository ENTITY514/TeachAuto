import { FONT_SETTINGS, FONT_SETTINGS_ENUM } from "UI/fonts.settings"

interface ITitleProps {
    children: string | number | JSX.Element | React.ReactNode
    color?: string
    size?: FONT_SETTINGS_ENUM
    textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
}

export const Title: React.FC<ITitleProps> = ({ children, size = FONT_SETTINGS_ENUM.TITLE_MEDIUM, textAlign }) => {
    return (
        <div
            style={{
                textAlign,
                fontWeight: FONT_SETTINGS[size].fontWeight,
                lineHeight: FONT_SETTINGS[size].lineHeight,
                fontSize: FONT_SETTINGS[size].fontSize,
                fontStyle: FONT_SETTINGS[size].fontStyle,
            }}
        >
            {children}
        </div>
    )
}