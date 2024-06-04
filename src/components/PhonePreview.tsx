'use client'

import { CaseColor } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "./ui/aspect-ratio"
import { cn } from "@/lib/utils"

interface PhonePreviewProps {
    croppedImageUrl: string
    color: CaseColor
}

export function PhonePreview({ croppedImageUrl, color }: PhonePreviewProps) {
    const ref = useRef<HTMLDivElement>(null)

    const [renderedDimensions, setRenderedDimensions] = useState({
        height: 0,
        width: 0
    })

    function handleResize() {
        if (!ref.current) return;

        const { height, width } = ref.current.getBoundingClientRect()

        setRenderedDimensions({
            width,
            height
        })
    }

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [ref.current])

    let caseBackgroundColor = 'bg-zinc-900'

    if (color === "blue") caseBackgroundColor = 'bg-blue-950'
    if (color === "rose") caseBackgroundColor = 'bg-rose-950'

    return (
        <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
            <div
                className="absolute scale-[1.0352] z-20"
                style={{
                    left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                    top: renderedDimensions.height / 6.22
                }}
            >
                <img
                    src={croppedImageUrl}
                    alt="Preview da capinha"
                    width={renderedDimensions.width / (3000 / 637)}
                    className={cn("phone-skew relative rounded-t-[15px] md:rounded-t-[30px] rounded-b-[10px] md:rounded-b-[20px] z-20", caseBackgroundColor)}
                />
            </div>

            <div className="relative h-full w-full z-40">
                <img
                    src="/clearphone.png"
                    alt="phone"
                    className="h-full w-full pointer-events-none antialiased rounded-md"
                />
            </div>
        </AspectRatio>
    )
}
