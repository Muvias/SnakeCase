'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { OrderStatus } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { changeOrderStatus } from "./actions"
import { useRouter } from "next/navigation"

interface StatusDropdownProps {
    id: string
    orderStatus: OrderStatus
}

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Aguardando envio",
    fulfilled: "Pronto",
    shipped: "Enviado"
}

export function StatusDropdown({ id, orderStatus }: StatusDropdownProps) {
    const router = useRouter()

    const { mutate: changeStatus } = useMutation({
        mutationKey: ["change-order-status"],
        mutationFn: changeOrderStatus,
        onSuccess: () => router.refresh()
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-between items-center w-52">
                    {LABEL_MAP[orderStatus]}
                    <ChevronsUpDownIcon className="h-4 w-4 ml-2 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0">
                {Object.keys(OrderStatus).map((status) => (
                    <DropdownMenuItem
                        key={status}
                        onClick={() => changeStatus({ id, newStatus: status as OrderStatus })}
                        className={cn("flex items-center text-sm gap-1 p-2.5 cursor-default hover:bg-zinc-100",
                            orderStatus === status && "bg-zinc-100"
                        )}
                    >
                        <CheckIcon className={cn("w-4 h-4 mr-2 text-primary", orderStatus === status ? "opacity-100" : "opacity-0")} />

                        {LABEL_MAP[status as OrderStatus]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
