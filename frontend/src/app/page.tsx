"use client";
import Image from "next/image";
import { uploadImage } from "@/api/menu";
import PhotoButtonWrapper from "@/components/photo-button-wrapper";
import LanguageDropdown from "@/components/language-selector";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [clickedImage, setClickedImage] = useState<string | null>(null);

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
    <>
      <header id="sticky-parallax-header">
        <span
          className="header-text cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Menu Scanner
        </span>
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16">
        <main className="flex flex-col gap-[32px] row-start-2 items-center pt-[100vh]">

          <div className="upload-container auto-show">
            {/* dotted box */}
            <div className="upload-box">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Your Menu Image"
                  className="uploaded-image"
                />
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <i className="fa-regular fa-image fa-2x no-click" ></i>
                  Upload Menu
                </span>
              )}
            </div>

            
            <div className="flex gap-[4em] items-start justify-center mt-5">
              {/* buttons */}
              <PhotoButtonWrapper imageSrc={ imageSrc } setImageSrc={ setImageSrc }/>

              {/* menu language selector */}
              <LanguageDropdown language={ language } setLanguage={ setLanguage } />
            </div>

            <div className="flex justify-center mt-5">
              {/* submit button */}
              <SubmitButton
                loading={loading}
                imageSrc={imageSrc}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          
          {loading && <div className="w-full flex justify-center mt-[5em]">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
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
              onClick={() => setClickedImage(null)}
            >
              <img
                src={clickedImage}
                alt="Clicked Image"
                className="max-h-[90vh] max-w-[90vw] shadow-lg"
                onClick={(e) => e.stopPropagation()} // don't close when clicking on the image
              />
              
            </div>)}
          
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
    </>
  );
}
