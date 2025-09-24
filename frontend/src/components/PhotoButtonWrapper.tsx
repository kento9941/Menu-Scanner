"use client";

import CameraButton from "./CameraButton";
import UploadButton from "./UploadButton";
import DeleteButton from "./DeleteButton";

export default function PhotoButtonWrapper() {
    return (
        <div
            className="flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700"
        >
            <CameraButton />
            <UploadButton />
            <DeleteButton />
        </div>
    )
}