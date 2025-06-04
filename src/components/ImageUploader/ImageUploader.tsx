"use client";

import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2, UploadIcon as Upload } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { generateId } from "./_helpers"

interface Props {

}

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const MAX_FILE_SIZE_MB = `${MAX_FILE_SIZE / 1024 / 1024}MB`;
const MAX_FILES = 2
const ACCEPTED_FILE_TYPES = [".jpeg", ".jpg", ".png"]

export const ImageUploader = ({}: Props) => {
    const [files, setFiles] = useState<
        Array<{
            id: string; file: File; uploading: boolean; progress: number;
            key?: string; isDeleting: boolean; error: boolean; objectUrl?: string;
        }>
    >([]);

    const handleDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            return;
        }

        setFiles((prevFiles) => [
            ...prevFiles,
            ...acceptedFiles.map((file) => ({
                id: generateId(), file, uploading: false, progress: 0, isDeleting: false, error: false, objectUrl: URL.createObjectURL(file),
            })),
        ]);
    };

    const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
        if (fileRejection.length) {
            const toomanyFiles = fileRejection.find(
                (rejection) => rejection.errors[0].code === "too-many-files"
            );
            const fileSizetoBig = fileRejection.find(
                (rejection) => rejection.errors[0].code === "file-too-large"
            );

            if (toomanyFiles) {
                alert("Too many files selected, max is 5");
                return;
            }

            if (fileSizetoBig) {
                alert(`File size exceeds ${MAX_FILE_SIZE_MB} limit`);
                return;
            }
        }
    }, []);

    const removeFile = (id: string) => {
        const fileToRemove = files.find((f) => f.id === id);
        if (fileToRemove) {
            if (fileToRemove.objectUrl) {
                URL.revokeObjectURL(fileToRemove.objectUrl);
            }
        }

        setFiles((prevFiles) =>
            prevFiles.map((f) => (f.id === id ? { ...f, isDeleting: true } : f))
        );

        setTimeout(() => {
            setFiles((prevFiles) =>
                prevFiles.filter((f) => f.id !== id)
            );
        }, 4000); // setTimeout to fake request, replace it if needed
    };

    useEffect(() => {
        return () => {
            // Cleanup object URLs when component unmounts
            files.forEach((file) => {
                if (file.objectUrl) {
                    URL.revokeObjectURL(file.objectUrl);
                }
            });
        };
    }, [files]);

    const { getRootProps, getInputProps, open, isDragActive, isDragReject } =
        useDropzone({
            noKeyboard: true,
            accept: {
                "image/*": ACCEPTED_FILE_TYPES,
            },
            maxFiles: MAX_FILES,
            maxSize: MAX_FILE_SIZE,
            onDrop: handleDrop,
            onDropRejected: rejectedFiles,
        });

    return (
        <>
            <Card
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
                    isDragActive
                        ? "border-primary bg-primary/10 border-solid"
                        : "border-border hover:border-primary"
                )}
            >
                <CardContent className="flex items-center justify-center h-full w-full">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-center">Drop the files here ...</p>
                    ) : (
                        <div className="flex flex-col items-center gap-y-3">
                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            <p className="text-gray-400 text-sm">
                                Supports: {ACCEPTED_FILE_TYPES.join(", ").toUpperCase()}, (max: {MAX_FILE_SIZE_MB}) • Images will be compressed automatically
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {files.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {files.map(({ id, file, uploading, progress, isDeleting, error, objectUrl }) => {
                        return (
                            <div key={id} className="flex flex-col gap-1">
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <img
                                        src={objectUrl}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeFile(id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                    {uploading && !isDeleting && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="text-white font-medium text-lg">
                                                {progress}%
                                            </div>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                                            <div className="text-white font-medium">Error</div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground truncate px-1">
                                    {file.name}
                                </p>
                            </div>
                        );
                    }
                    )}
                </div>
            )}
        </>
    );
}

/**Example upload function with progress */
// const uploadFile = async (file: File) => {
//     setFiles((prevFiles) =>
//       prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f))
//     );

//     try {
//       // 1. Get presigned URL
//       const presignedResponse = await fetch("/api/s3/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filename: file.name,
//           contentType: file.type,
//           size: file.size,
//         }),
//       });

//       if (!presignedResponse.ok) {
//         toast.error("Failed to get presigned URL");

//         setFiles((prevFiles) =>
//           prevFiles.map((f) =>
//             f.file === file
//               ? { ...f, uploading: false, progress: 0, error: true }
//               : f
//           )
//         );

//         return;
//       }

//       const { presignedUrl, key } = await presignedResponse.json();

//       // 2. Upload file to S3

//       await new Promise<void>((resolve, reject) => {
//         const xhr = new XMLHttpRequest();

//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const percentComplete = (event.loaded / event.total) * 100;
//             setFiles((prevFiles) =>
//               prevFiles.map((f) =>
//                 f.file === file
//                   ? { ...f, progress: Math.round(percentComplete), key: key }
//                   : f
//               )
//             );
//           }
//         };

//         xhr.onload = () => {
//           if (xhr.status === 200 || xhr.status === 204) {
//             // 3. File fully uploaded - set progress to 100
//             setFiles((prevFiles) =>
//               prevFiles.map((f) =>
//                 f.file === file
//                   ? { ...f, progress: 100, uploading: false, error: false }
//                   : f
//               )
//             );

//             toast.success("File uploaded successfully");

//             resolve();
//           } else {
//             reject(new Error(`Upload failed with status: ${xhr.status}`));
//           }
//         };

//         xhr.onerror = () => {
//           reject(new Error("Upload failed"));
//         };

//         xhr.open("PUT", presignedUrl);
//         xhr.setRequestHeader("Content-Type", file.type);
//         xhr.send(file);
//       });
//     } catch {
//       toast.error("Something went wrong");

//       setFiles((prevFiles) =>
//         prevFiles.map((f) =>
//           f.file === file
//             ? { ...f, uploading: false, progress: 0, error: true }
//             : f
//         )
//       );
//     }
//   };