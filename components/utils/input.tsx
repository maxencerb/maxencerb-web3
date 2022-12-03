import { TextInputController } from '@/types/utils'
import React from 'react'

type TextInputProps = {
    controller: TextInputController,
    className?: string,
    isSearch?: boolean
}

export function TextInput({ controller, className, isSearch }: TextInputProps) {
    return (
        <input 
            type={isSearch ? "search" :"text"}
            value={controller.value}
            placeholder={controller.placeholder}
            onChange={(event) => {
                controller.onChange(event.target.value || "")
            }}
            className={`bg-c-neutral bg-opacity-50 focus:bg-transparent outline-none px-4 py-2 border rounded-lg border-c-neutral transition-all duration-150 ${className}`}
        />
    )
}