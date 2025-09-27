"use client";

import CameraButton from "./CameraButton";
import UploadButton from "./UploadButton";
import DeleteButton from "./DeleteButton";

export default function PhotoButtonWrapper({
    imageSrc,
    setImageSrc
}: {
    imageSrc: string | null;
    setImageSrc: (src: string | null) => void;
}) {
    return (
        <div
            className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700"
        >
            <CameraButton setImageSrc={setImageSrc}/>
            <UploadButton setImageSrc={setImageSrc}/>
            <DeleteButton imageSrc={imageSrc} setImageSrc={setImageSrc}/>
        </div>
    )
}