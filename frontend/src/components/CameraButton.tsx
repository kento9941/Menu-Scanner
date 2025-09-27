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
    };
    return (
        <>
            <button
                className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                onClick={ handleButtonClick }
            >
                <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </button>
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
