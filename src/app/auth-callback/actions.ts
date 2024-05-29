"use server"

import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server"

export async function getAuthStatus() {
    const user = await currentUser();

    if (!user?.id || !user.emailAddresses[0].emailAddress) throw new Error("Invalid user data");

    const existingUser = await db.user.findFirst({
        where: { id: user.id }
    })

    if (!existingUser) {
        await db.user.create({
            data: {
                id: user.id,
                email: user.emailAddresses[0].emailAddress,
            }
        })
    }

    return { success: true }
}