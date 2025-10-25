"use client";
import { useEffect } from "react";

export default function MenuImage({
    imageSrc,
    setImageSrc,
    menuImage,
    setMenuImage,
    imageUrls
}: {
    imageSrc: string | null;
    setImageSrc: (imageSrc: string | null) => void;
    menuImage: string | null;
    setMenuImage: (menuImage: string) => void;
    imageUrls: string[]
}) {
    useEffect(() => {
        if (imageUrls.length > 0 && imageSrc && imageSrc !== menuImage) {
          setMenuImage(imageSrc);
          setImageSrc(null);
        }
    }, [imageUrls]);
         
    return (
        (menuImage) && (
            <div className="flex justify-center items-center w-[25vw] h-[25vh]">
                <img src={menuImage} alt="Your Menu Image" className="w-full h-full object-contain"/>
            </div>
        )
    )
}