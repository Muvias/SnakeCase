import { cn } from "@/lib/utils"

interface MaxWidthWrapperProps {
    children: React.ReactNode
    className?: string
}

export function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
    return (
        <div
            className={cn("max-w-screen-xl w-full h-full mx-auto px-2.5 md:px-20", className)}
        >
            {children}
        </div>
    )
}
