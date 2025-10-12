"use client";
import { useRef } from "react";

export default function UploadButton({
    setImageSrc
}: {
    setImageSrc: (src: string | null) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // read the image file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <i className="fa-solid fa-upload fa-3x" onClick={ handleButtonClick }></i>
            {/* hidden input */}
            <input
                type="file"
                accept="image/*"
                ref={ fileInputRef }
                onChange={ handleFileChange }
                className="hidden"           
            />
        </>
    );
}