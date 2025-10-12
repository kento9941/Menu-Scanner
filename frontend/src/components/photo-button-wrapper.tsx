"use client";

import CameraButton from "./camera-button";
import UploadButton from "./upload-button";
import DeleteButton from "./delete-button";

export default function PhotoButtonWrapper({
    imageSrc,
    setImageSrc
}: {
    imageSrc: string | null;
    setImageSrc: (src: string | null) => void;
}) {
    return (
        <div className="flex gap-[4em]">
            <CameraButton setImageSrc={setImageSrc}/>
            <UploadButton setImageSrc={setImageSrc}/>
            <DeleteButton imageSrc={imageSrc} setImageSrc={setImageSrc}/>
        </div>
    )
}