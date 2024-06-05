'use server'

import { db } from "@/db"
import { OrderStatus } from "@prisma/client"

interface changeOrderStatusProps {
    id: string
    newStatus: OrderStatus
}

export async function changeOrderStatus({ id, newStatus }: changeOrderStatusProps) {
    await db.order.update({
        where: { id },
        data: { status: newStatus }
    })
}