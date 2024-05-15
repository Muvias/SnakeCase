'use client'

import { Progress } from "@/components/ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { ImageIcon, Loader2Icon, MousePointerSquareDashedIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { toast } from "sonner"

export default function UploadPage() {
    const router = useRouter()

    const [isDragOver, setIsDragOver] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId

            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
        onUploadProgress(p) {
            setUploadProgress(p)
        },
    })

    const [isPending, startTransition] = useTransition()

    function onDropRejected(rejectedFiles: FileRejection[]) {
        const [file] = rejectedFiles

        setIsDragOver(false)

        toast.error(`O tipo ${file.file.type} não é suportado`)
    }

    function onDropAccepted(acceptedFiles: File[]) {
        startUpload(acceptedFiles, { configId: undefined })

        setIsDragOver(false)
    }

    return (
        <div className={cn("relative flex flex-col flex-1 items-center justify-center h-full w-full p-2 my-16 rounded-xl lg:rounded-2xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10",
            isDragOver && "bg-blue-900/10 ring-blue-900/25"
        )}>
            <div className="relative flex-1 flex flex-col items-center justify-center w-full">
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"]
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className="flex-1 flex flex-col items-center justify-center w-full h-full"
                            {...getRootProps()}
                        >
                            <input
                                {...getInputProps()}
                                type="file"
                            />

                            {isDragOver ?
                                <MousePointerSquareDashedIcon className="w-6 h-6 text-zinc-500" />
                                :
                                isUploading || isPending ?
                                    <Loader2Icon className="w-6 h-6 mb-2 text-zinc-500 animate-spin" />
                                    :
                                    <ImageIcon className="w-6 h-6 mb-2 text-zinc-500" />
                            }

                            <div className="mb-2 text-sm text-zinc-700">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p>Carregando...</p>
                                        <Progress
                                            value={uploadProgress}
                                            className="w-40 h-2 mt-2 bg-gray-300"
                                        />
                                    </div>
                                ) : isPending ? (
                                    <p>Redirecionando, por favor aguarde...</p>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">Solte o arquivo</span> para carregar
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold">Clique para carregar</span> ou arraste e solte aqui
                                    </p>
                                )}
                            </div>

                            {isPending ? null : (
                                <p className="text-xs text-zinc-500">
                                    PNG, JPG, JPEG
                                </p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}
