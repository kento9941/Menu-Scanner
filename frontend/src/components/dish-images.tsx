"use client";
import { useState } from "react";

export default function DishImages({
    imageUrls,
}: {
    imageUrls: string[];
}) {
    const [clickedImage, setClickedImage] = useState<string>("");

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2em] mt-[2em]">
                {imageUrls && imageUrls.map((url, idx) => (
                <img
                    key={idx}
                    src={url}
                    alt={`Dish Image ${idx}`}
                    className="dish-image"
                    onClick={() => setClickedImage(url)}
                />
                ))}
            </div>

            {clickedImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setClickedImage("")}
                >
                    <img
                        src={clickedImage}
                        alt="Clicked Image"
                        className="max-h-[90vh] max-w-[90vw] shadow-lg"
                        onClick={(e) => e.stopPropagation()} // don't close when clicking on the image
                    />                
                </div>
            )}
        </>
    )
}