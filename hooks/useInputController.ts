import type { TextInputController } from "@/types/utils"
import { useState } from "react"

type TextInputControllerHookResult = {
    controller: TextInputController,
    value: string
}

type TextInputControllerHookProps = {
    placeholder?: string
}

const useTextInputController = ({ placeholder }: TextInputControllerHookProps = {}): TextInputControllerHookResult => {
    const [value, setValue] = useState("")

    const onChange = (value: string) => {
        setValue(value)
    }

    return {
        value,
        controller: {
            value,
            onChange,
            placeholder
        }
    }

}

export {
    useTextInputController
}