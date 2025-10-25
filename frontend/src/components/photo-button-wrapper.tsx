"use client";

import CameraButton from "./camera-button";
import UploadButton from "./upload-button";
import DeleteButton from "./delete-button";
import { useState } from "react";
import CropModal from "./crop-modal";

export default function PhotoButtonWrapper({
    imageSrc,
    setImageSrc,
}: {
    imageSrc: string | null;
    setImageSrc: (src: string | null) => void;
}) {
    const [tempImage, setTempImage] = useState<string | null>(null);
    return (
        <>
            <div className="flex gap-[4em]">
                <CameraButton setImageSrc={setTempImage}/>
                <UploadButton setImageSrc={setTempImage}/>
                <DeleteButton imageSrc={imageSrc} setImageSrc={setImageSrc}/>
            </div>

            {tempImage && (
            <CropModal
                tempImage={tempImage}
                setTempImage={setTempImage}
                setImageSrc={setImageSrc}
            />
            )}
        </>
    )
}