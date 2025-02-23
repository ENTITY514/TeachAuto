import React from 'react'
import style from './style.module.css'
import { Text } from 'UI/base/Text/text'
import { COLORS } from 'UI/colors.settings'
import { Wrapper } from 'UI/base/Wrapper/wrapper'

interface ITextAreaProps {
    height?: string
    width?: string
    placeholder?: string
    type?: string
    margin?: string
    padding?: string
    onChange?: (value: string | number) => void
    onEnter?: (value: string | number) => void,
    lineHeight?: string
    fontWeight?: number
    fontSize?: string
    cursor?: string
    children?: string
    alignItems?: string
}


export const TextArea: React.FC<ITextAreaProps> = ({
    height = "62px",
    width = "100%",
    padding = "12px",
    placeholder = "",
    type = "text",
    margin = "0",
    onChange = (value: string | number) => { },
    onEnter = (value: string | number) => { },
    lineHeight = "normal",
    fontWeight = "500",
    fontSize = "16px",
    cursor,
    children,
    alignItems

}) => {
    const [value, setValue] = React.useState<string>("")
    const input_ref = React.useRef<HTMLTextAreaElement>(null)

    const handlerChange = () => {
        if (input_ref.current !== null) {
            setValue(input_ref.current.value)
            onChange(input_ref.current.value)
        }
    }

    const hadlerKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            onEnter(value)
            input_ref.current?.blur()
        }
    }
    return (
        <div className={style.contaioner}>
            {children ? <Text color={COLORS.GREY}>{children}</Text> : null}
            <Wrapper
                margin={margin}
                height={height}
                width={width}
                padding={padding}
                alignItems={alignItems}
            >
                <textarea
                    ref={input_ref}
                    className={style.textarea}
                    value={value}
                    onChange={handlerChange}
                    onKeyDown={hadlerKeyDown}
                    placeholder={placeholder}
                    style={{ fontSize, cursor, lineHeight, fontWeight, margin }}
                />
            </Wrapper>
        </div>
    )
}