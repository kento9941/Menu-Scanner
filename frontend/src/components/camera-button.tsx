"use client";
import { useRef } from "react";

export default function CameraButton({
    setImageSrc
}: {
    setImageSrc: (src: string | null) => void;
}) {
    const cameraRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        cameraRef.current?.click();
    };

    const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = "";
    };
    return (
        <>
            <i className="fa-solid fa-camera text-2xl md:text-3xl" onClick={ handleButtonClick }></i>
            {/* hidden input */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={ cameraRef }
                onChange={ handleCapture }
                className="hidden"
            />
        </>        
    );
}
