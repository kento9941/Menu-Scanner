"use client";
import Image from "next/image";
import { uploadImage } from "@/api/menu";
import PhotoButtonWrapper from "@/components/photo-button-wrapper";
import LanguageDropdown from "@/components/language-selector";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function handleUpload(file: File) {
    try {
      setLoading(true)
      const data = await uploadImage(language, file);
      setExtractedText(data["extracted_text"]);
      setTranslatedText(data["translated_text"]);
      setImageUrls(data["image_urls"])

    }
    catch (err)
    {
      console.error(err);
      alert("Upload Failed");
    } 
    finally
    {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>selected lang: { language }</p>
        {/* wheel picker */}
        <LanguageDropdown language={ language } setLanguage={ setLanguage } />

        {/* uploaded image */}
        {imageSrc && (
          <img
            src={ imageSrc }
            alt="Your Menu Image..."
            className="max-w-xs rounded-lg shadow"
          />
        )}

        {/* buttons */}
        <PhotoButtonWrapper imageSrc={ imageSrc } setImageSrc={ setImageSrc } />

        <button
          onClick={async () => {
            if (!imageSrc) return;
            const file = await fetch(imageSrc)
              .then(res => res.blob())
              .then(blob => new File([blob], "upload.png", { type: blob.type }));
            await handleUpload(file);
          }}
        >
          Get Image
        </button>        
        
        <div className="w-full flex justify-center">
          {loading && <div className="loader"></div>}
        </div>

        {imageUrls && imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Dish Image ${idx}`}
            className="max-w-xs rounded-lg shadow"
          />
        ))}

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
