"use client";
import Image from "next/image";
import PhotoButtonWrapper from "@/components/photo-button-wrapper";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@/components/wheel-picker";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [value, setValue] = useState<string>("en");

  const options: WheelPickerOption[] = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Japanese",
      value: "ja",
    },
  ];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {/* wheel picker */}
        <WheelPickerWrapper>
          <WheelPicker options={options} value={value} onValueChange={setValue} />
        </WheelPickerWrapper>

        {/* uploaded image */}
        {imageSrc && (
          <img
            src={ imageSrc }
            alt="Your menu image..."
            className="max-w-xs rounded-lg shadow"
          />
        )}

        {/* buttons */}
        <PhotoButtonWrapper imageSrc={ imageSrc } setImageSrc={ setImageSrc } />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
