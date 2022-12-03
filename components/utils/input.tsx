import { TextInputController } from '@/types/utils'
import React from 'react'

type TextInputProps = {
    controller: TextInputController,
    className?: string
}

export function TextInput({ controller, className }: TextInputProps) {
    return (
        <input 
            type="text" 
            value={controller.value}
            placeholder={controller.placeholder}
            onChange={(event) => {
                controller.onChange(event.target.value || "")
            }}
            className={`bg-c-neutral bg-opacity-50 focus:bg-transparent outline-none px-4 py-2 border rounded-lg border-c-neutral transition-all duration-150 ${className}`}
        />
    )
}