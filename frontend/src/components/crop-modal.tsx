
"use client";

import { useEffect, useState } from "react";
import ReactCrop, { PixelCrop, ReactCropProps } from "react-image-crop";
import { createPortal } from "react-dom";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "@/lib/crop-image";

export default function CropModal({
  tempImage,
  setTempImage,
  setImageSrc,
}: {
  tempImage: string;
  setTempImage: (v: string | null) => void;
  setImageSrc: (v: string | null) => void;
}) {
  const [crop, setCrop] = useState<ReactCropProps["crop"]>({
    unit: "%",
    x: 20,
    y: 20,
    width: 60,
    height: 60,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  async function handleConfirm() {
    if (imageRef && completedCrop) {
      const croppedUrl = await getCroppedImg(imageRef, completedCrop);
      console.log("croppedUrl:", croppedUrl);
      setImageSrc(croppedUrl);
      setTimeout(() => setTempImage(null), 0);
    }
  }

  useEffect(() => {
    // stop scroll when this modal is opened
    document.body.style.overflow = "hidden";
    return () => {
      // enable scroll when closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    (
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-black/70">
        <div className="max-w-[80vw] max-h-[80vh] bg-black p-6 shadow-lg flex flex-col items-center gap-[2em]">
          <div className="max-w-[60vw] max-h-[60vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={undefined}
            >
              <img
                src={tempImage}
                alt="Crop preview"
                onLoad={(e) => setImageRef(e.currentTarget)}
                className="max-w-full max-h-full object-contain"
              />
            </ReactCrop>
          </div>

          <div className="flex gap-[1em] mt-[1em]">
            <button
              onClick={handleConfirm}
              className="fancy-small"
            >
              <span className="text">Confirm</span>
            </button>
            <button
              onClick={() => setTempImage(null)}
              className="fancy-small"
            >
              <span className="text">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    ),
    document.body
  );
}
