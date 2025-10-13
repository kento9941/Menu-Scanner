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

          <div className="upload-container">
            {/* dotted box */}
            <div className="upload-box auto-show">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Your Menu Image"
                  className="uploaded-image"
                />
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <i className="fa-regular fa-image fa-2x"></i>
                  Upload menu image
                </span>
              )}
            </div>

            <div className="auto-show">
              <div className="flex gap-[4em] items-start justify-center">
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
          </div>

          <div className="">
            <div className="">
              <div className="w-full flex justify-center">
                {loading &&
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
                </div>}
              </div>

              {imageUrls && imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Dish Image ${idx}`}
                  className="max-w-xs rounded-lg shadow"
                />
              ))}
            </div>
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
    </>
  );
}
