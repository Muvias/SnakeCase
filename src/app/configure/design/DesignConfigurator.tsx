'use client'

import NextImage from "next/image";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { HandleComponent } from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { Radio, RadioGroup, Label as RadioGroupLabel, Description as RadioGroupDescription } from "@headlessui/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { saveConfigProps, saveConfig as _saveConfig } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
    configId: string
    imageUrl: string
    imageDimensions: {
        width: number;
        height: number;
    }
}

export function DesignConfigurator({ imageDimensions, imageUrl, configId }: DesignConfiguratorProps) {
    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const { mutate: saveConfig, isPending } = useMutation({
        mutationKey: ["save-config"],
        mutationFn: async (args: saveConfigProps) => {
            await Promise.all([
                saveConfiguration(),
                _saveConfig(args)
            ])
        },
        onError: () => {
            toast.error("Algo deu errado, por favor tente novamente.")
        },
        onSuccess: () => {
            router.push(`/configure/check?id=${configId}`)
        }
    })

    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number],
        model: (typeof MODELS.options)[number],
        material: (typeof MATERIALS.options)[number],
        finish: (typeof FINISHES.options)[number],
    }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0]
    })
    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimensions.width / 4,
        height: imageDimensions.height / 4
    })
    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 205
    })

    const { startUpload } = useUploadThing('imageUploader')

    async function saveConfiguration() {
        try {
            const { left: caseLeft, top: caseTop, width, height } = phoneCaseRef.current!.getBoundingClientRect()
            const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect()

            const leftOffset = caseLeft - containerLeft;
            const topOffset = caseTop - containerTop;

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            const canvas = document.createElement("canvas")
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d")

            const userImage = new Image()
            userImage.crossOrigin = "anonymous"
            userImage.src = imageUrl
            await new Promise((resolve) => userImage.onload = resolve)

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height
            )

            const base64 = canvas.toDataURL();
            const base64Data = base64.split(",")[1];

            const blob = base64ToBlob(base64Data, "image/png")
            const file = new File([blob], "filename.png", { type: "image/png" })

            await startUpload([file], { configId })
        } catch (error) {
            toast.error("Alguma coisa deu errado, por favor tente novamente!")
        }
    }

    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64)
        const byteArray = Uint8Array.from(byteCharacters, char => char.charCodeAt(0))

        return new Blob([byteArray], { type: mimeType })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 my-20 pb-20">
            <div
                ref={containerRef}
                className="relative flex items-center justify-center max-w-4xl h-[37.5rem] p-12 text-center col-span-2 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={896 / 1831}
                        className="relative w-full pointer-events-none z-50 aspect-[896/1831]"
                    >
                        <NextImage
                            src="/phone-template.png"
                            alt="Foto do Celular"
                            fill
                            className="select-none pointer-events-none z-50"
                        />
                    </AspectRatio>

                    <div
                        className="absolute inset-0 top-px bottom-px left-[3px] right-[3px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] z-40"
                    />

                    <div
                        className={cn("absolute inset-0 top-px bottom-px left-[3px] right-[3px] rounded-[32px]",
                            `bg-${options.color.tw}`
                        )}
                    />
                </div>

                <Rnd
                    default={{
                        x: 150,
                        y: 205,
                        width: imageDimensions.width / 4,
                        height: imageDimensions.height / 4
                    }}
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topLeft: <HandleComponent />,
                        topRight: <HandleComponent />
                    }}
                    onResizeStop={(_, __, ref, ___, { x, y }) => {
                        setRenderedDimension({
                            height: parseInt(ref.style.height.slice(0, -2)),
                            width: parseInt(ref.style.width.slice(0, -2))
                        })

                        setRenderedPosition({ x, y })
                    }}
                    onDragStop={(_, data) => {
                        const { x, y } = data

                        setRenderedPosition({ x, y })
                    }}
                    className="absolute z-20 border-[3px] border-primary"
                >
                    <div className="relative w-full h-full">
                        <NextImage
                            src={imageUrl}
                            alt="Sua imagem"
                            fill
                            className="pointer-events-none"
                        />
                    </div>
                </Rnd>
            </div>

            <div className="flex flex-col h-[37.5rem] bg-white">
                <ScrollArea
                    className="relative flex-1 overflow-auto"
                >
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none z-10" />

                    <div className="pt-8 pb-12 px-8">
                        <h2
                            className="text-3xl tracking-tight font-bold"
                        >
                            Personalize sua capinha
                        </h2>

                        <div className="w-full h-px my-6 bg-zinc-200" />

                        <div className="flex flex-col justify-between h-full gap-6 mt-4">
                            <RadioGroup
                                value={options.color}
                                onChange={(value) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: value
                                    }))
                                }}
                            >
                                <Label>
                                    Cor: {options.color.label}
                                </Label>

                                <div className="flex items-center space-x-3 mt-3">
                                    {COLORS.map((color) => (
                                        <Radio
                                            key={color.label}
                                            value={color}
                                            className={({ checked }) => cn(
                                                "flex p-0.5 -m-0.5 rounded-full border-2 border-transparent cursor-pointer active:ring-0 active:outline-none focus:ring-0 focus:outline-none",
                                                checked && `border-${color.tw}`
                                            )}
                                        >
                                            <span
                                                className={cn(`bg-${color.tw}`, "h-8 w-8 rounded-full border border-black/10")}
                                            />
                                        </Radio>
                                    ))}
                                </div>
                            </RadioGroup>

                            <div className="relative flex flex-col w-full gap-3">
                                <Label>
                                    Modelo:
                                </Label>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-full justify-between"
                                        >
                                            {options.model.label}

                                            <ChevronsUpDownIcon className="w-4 h-4 ml-2 shrink-0 text-muted-foreground" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                        {MODELS.options.map((model) => (
                                            <DropdownMenuItem
                                                key={model.label}
                                                onClick={() => { setOptions((prev) => ({ ...prev, model })) }}
                                                className={cn("flex items-center p-1.5 text-sm gap-1 cursor-default hover:bg-zinc-100",
                                                    model.label === options.model.label && "bg-zinc-100"
                                                )}
                                            >
                                                <CheckIcon
                                                    className={cn("h-4 w-4 mr-2",
                                                        model.label === options.model.label
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />

                                                {model.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                                <RadioGroup
                                    key={name}
                                    value={options[name]}
                                    onChange={(val) => {
                                        setOptions((prev) => ({ ...prev, [name]: val }))
                                    }}
                                >
                                    <Label className="capitalize">
                                        {name}
                                    </Label>

                                    <div className="mt-3 space-y-4">
                                        {selectableOptions.map((option) => (
                                            <Radio
                                                key={option.value}
                                                value={option}
                                                className={({ checked }) => cn(
                                                    "relative block sm:flex sm:justify-between px-6 py-4 cursor-pointer rounded-lg shadow-sm border-2 border-zinc-200 bg-white focus:outline-none ring-0 focus:ring-0 outline-none",
                                                    checked && "border-primary"
                                                )}
                                            >
                                                <div className="flex flex-col text-sm">
                                                    <RadioGroupLabel
                                                        as="span"
                                                        className="font-medium text-gray-900"
                                                    >
                                                        {option.label}
                                                    </RadioGroupLabel>

                                                    {option.description ? (
                                                        <RadioGroupDescription
                                                            as="span"
                                                            className="text-muted-foreground"
                                                        >
                                                            {option.description}
                                                        </RadioGroupDescription>
                                                    ) : null}
                                                </div>

                                                <RadioGroupDescription
                                                    as="span"
                                                    className="flex mt-2 sm:mt-0 sm:ml-4 font-medium text-sm sm:text-right text-gray-900"
                                                >
                                                    {formatPrice(option.price / 100)}
                                                </RadioGroupDescription>
                                            </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>
                            ))}
                        </div>
                    </div>
                </ScrollArea>

                <div className="w-full h-16 px-8 bg-white">
                    <div className="h-px w-full bg-zinc-200" />

                    <div className="flex justify-end items-center w-full h-full">
                        <div className="flex items-center w-full gap-6">
                            <p className="font-medium whitespace-nowrap">
                                {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
                            </p>

                            <Button
                                size="sm"
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText="Salvando"
                                className="w-full"
                                onClick={() => saveConfig({
                                    configId,
                                    color: options.color.value,
                                    finish: options.finish.value,
                                    material: options.material.value,
                                    model: options.model.value
                                })}
                            >
                                Continuar
                                <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
