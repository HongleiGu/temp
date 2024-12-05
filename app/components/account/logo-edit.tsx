'use client';

import { useState, useRef } from 'react';
import { Button } from '../../components/button'; // Assuming Button is custom
import Image from 'next/image';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ImageUploadProps } from '@/app/lib/types';

const ImageUpload = ({ register, setValue, initialLogo }: { register: any, setValue: any, initialLogo: string} ) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(initialLogo);

    register('uploadedImage');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            setValue('uploadedImage', file); // Register the file with react-hook-form
            setPreviewImage(URL.createObjectURL(file)); // Generate image preview
        }
    };

    const clearUploadedImage = () => {
        setUploadedImage(null);
        setValue('uploadedImage', null); // Clear react-hook-form value
        setPreviewImage(null); // Clear preview
    };

    return (
        <div className="flex flex-col w-full">

        <div className="flex flex-col items-center">
            {/* Upload Button */}
            <button
                className="flex flex-row self-start my-2 w-fit px-4 items-center font-light text-white border border-gray-300 hover:bg-gray-200 rounded-sm text-sm h-10"
                onClick={handleButtonClick}
            >
                <ArrowUpTrayIcon width={15} height={15} className="mr-2" /> Upload your logo here
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
            />

            {/* Clear Button */}
            {uploadedImage && (
                <Button
                    variant="ghost"
                    className="self-start text-sm text-red-600 hover:text-red-900"
                    onClick={clearUploadedImage}
                >
                    <TrashIcon width={10} height={10} className="mr-1" />
                    Clear uploaded logo
                </Button>
            )}

            {/* Image Preview */}
            <div className="relative self-start w-[100px] h-[100px] border border-black overflow-hidden">
            <Image
                src={previewImage || '/images/no-image-found.png'}
                alt="Your Logo"
                fill
                className="w-[90%] h-64 object-cover border-2 border-black/70"
            />
            </div>
        </div>
        </div>
    );
};

export default ImageUpload;
