import React from 'react'

type CardProps = {
    children?: React.ReactNode,
    className?: string,
    variant?: "outlined" | "filled"
}

export default function Card({ children, className, variant = "outlined" }: CardProps) {
    return (
        <div className={`rounded-lg  ${
            variant === "outlined" ? 
                "border border-c-neutral bg-black bg-opacity-50":
                " bg-black bg-opacity-50 shadow-md"
        } ${className}`}>
            {children}
        </div>
    )
}