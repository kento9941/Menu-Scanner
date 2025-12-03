"use client";
import { useEffect } from "react";

export default function MenuImage({
    imageSrc,
    setImageSrc,
    menuImage,
    setMenuImage,
    extractedText
}: {
    imageSrc: string | null;
    setImageSrc: (imageSrc: string | null) => void;
    menuImage: string | null;
    setMenuImage: (menuImage: string) => void;
    extractedText: string;
}) {    
    useEffect(() => {
        if (extractedText !== "" && imageSrc && imageSrc !== menuImage) {
            setMenuImage(imageSrc);
            setImageSrc(null);
        }
    }, [extractedText]);
         
    return (
        (menuImage) && (
            <div className="flex justify-center items-center w-[80vw] h-[30vh] md:w-[25vw] md:h-[25vh]">
                <img src={menuImage} alt="Your Menu Image" className="menu-image w-full h-full object-contain"/>
            </div>
        )
    )
}