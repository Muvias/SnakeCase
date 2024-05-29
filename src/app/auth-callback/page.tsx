'use client'

import { useQuery } from "@tanstack/react-query"
import { getAuthStatus } from "./actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"

export default function Page() {
    const router = useRouter()

    const [configId, setConfigId] = useState<string | null>(null)

    useEffect(() => {
        const configurationId = localStorage.getItem("configurationId");

        if (configurationId) setConfigId(configurationId);
    }, [])

    const { data } = useQuery({
        queryKey: ["auth-callback"],
        queryFn: async () => await getAuthStatus(),
        retry: true,
        retryDelay: 500
    })

    if (data?.success) {
        if (configId) {
            localStorage.removeItem("configurationId")

            router.push(`/configure/check?id=${configId}`)
        } else {
            router.push("/")
        }
    }

    return (
        <div className="flex justify-center w-full my-24">
            <div className="flex flex-col items-center gap-2">
                <Loader2Icon className="w-8 h-8 shrink-0 animate-spin text-zinc-500" />

                <h3 className="text-xl font-semibold">Entrando...</h3>
                <p>Você será redirecionado automaticamente</p>
            </div>
        </div>
    )
}
