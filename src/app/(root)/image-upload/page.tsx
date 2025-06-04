"use client";

import { ImageUploader } from '@/components/ImageUploader/ImageUploader'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function ImageUploadPage() {

    const submitImages = () => {
        console.log('submitImages')
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <ImageUploader />

            <Button onClick={submitImages}>Upload</Button>
        </div>
    )
}
