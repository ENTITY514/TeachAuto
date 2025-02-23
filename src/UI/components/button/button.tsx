import { Text } from "UI/base/Text/text"
import { Wrapper } from "UI/base/Wrapper/wrapper"
import { COLORS } from "UI/colors.settings"


interface BUTTONTYPE {
    bgColor: COLORS
    txtColor: COLORS
}

export enum BUTTONTYPES {
    GREEN = 0,
    RED = 1,
    EMPTY = 2,
    PURPULE = 3
}

export const button_type_data: Array<BUTTONTYPE> = [
    { bgColor: COLORS.GREEN, txtColor: COLORS.WHITE },
    { bgColor: COLORS.RED, txtColor: COLORS.WHITE },
    { bgColor: COLORS.EMPTY, txtColor: COLORS.BLACK },
]

interface IStandartButtonProps {
    children: string | JSX.Element | React.ReactNode
    margin?: string
    width?: string
    type?: BUTTONTYPES
    onClick?: () => void
}

export const Button: React.FC<IStandartButtonProps> = ({
    children,
    margin = "0",
    width = "auto",
    type = BUTTONTYPES.EMPTY,
    onClick
}) => {
    return (
        <Wrapper
            backgroundColor={button_type_data[type].bgColor}
            width={width}
            height='62px'
            alignItems='center'
            margin={margin}
            cursor="pointer"
            onClick={onClick}
        >
            <Text
                color={button_type_data[type].txtColor}
                textAlign='center'
                fontSize="20px"
                fontWeight={600}
                lineHeight="normal"
            >
                {children}
            </Text>
        </Wrapper>
    )
}