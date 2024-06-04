"use server"

import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GetPaymentStatus({ orderId }: { orderId: string }) {
    const user = await currentUser();

    if (!user?.id || !user.emailAddresses[0].emailAddress) throw new Error("You need to be logged in to view this page.");

    const order = await db.order.findFirst({
        where: { id: orderId, userId: user.id },
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true
        }
    });

    if (!order) throw new Error("This order does not exist.");

    if (order.isPaid) {
        return order;
    } else {
        return false;
    }
}