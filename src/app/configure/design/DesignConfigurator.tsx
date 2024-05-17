'use client'

import NextImage from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";

import { HandleComponent } from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { Radio, RadioGroup } from "@headlessui/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

interface DesignConfiguratorProps {
    configId: string
    imageUrl: string
    imageDimensions: {
        width: number;
        height: number;
    }
}

export function DesignConfigurator({ imageDimensions, imageUrl, configId }: DesignConfiguratorProps) {
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

    return (
        <div className="grid grid-cols-3 my-20 pb-20">
            <div className="relative flex items-center justify-center max-w-4xl h-[37.5rem] p-12 text-center col-span-2 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
                    <AspectRatio
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
                                                "flex items-center justify-center p-0.5 -m-0.5 rounded-full border-2 border-transparent cursor-pointer active:ring-0 active:outline-none focus:ring-0 focus:outline-none",
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
                                >

                                </RadioGroup>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
