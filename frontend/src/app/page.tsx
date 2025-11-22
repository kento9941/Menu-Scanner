"use client";
import Image from "next/image";
import { uploadImage } from "@/api/menu";
import PhotoButtonWrapper from "@/components/photo-button-wrapper";
import LanguageDropdown from "@/components/language-selector";
import SubmitButton from "@/components/submit-button";
import MenuImage from "@/components/menu-image";
import DishImages from "@/components/dish-images";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [menuImage, setMenuImage] = useState<string | null>(null);
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
    <AnimatePresence mode="wait">
      <motion.div
        key={extractedText + "_" + (imageUrls[0] || "empty")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
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
              {/* upload box */}
              <div className="upload-box">
                {imageSrc ? (
                  <img src={imageSrc} alt="Your Menu Image" className="uploaded-image" />
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <i className="fa-regular fa-image fa-2x no-click"></i>
                    Upload Menu
                  </span>
                )}
              </div>
  
              <div className="flex gap-[4em] items-start justify-center mt-5">
                <PhotoButtonWrapper imageSrc={imageSrc} setImageSrc={setImageSrc} />
                <LanguageDropdown language={language} setLanguage={setLanguage} />
              </div>
  
              <div className="flex justify-center mt-5">
                <SubmitButton loading={loading} imageSrc={imageSrc} handleUpload={handleUpload} />
              </div>
            </div>
  
            {/* loader */}
            {loading && (
              <div className="w-full flex justify-center mt-[5em]">
                <div className="spinner">
                  <div></div><div></div><div></div><div></div><div></div>
                  <div></div><div></div><div></div><div></div><div></div>
                </div>
              </div>
            )}
  
            {/* menu image and texts */}
            <motion.div
              key={extractedText}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-[5em] mt-[5em] mb-[2em]">
                <MenuImage
                  imageSrc={imageSrc}
                  setImageSrc={setImageSrc}
                  menuImage={menuImage}
                  setMenuImage={setMenuImage}
                  extractedText={extractedText}
                />
  
                <div className="dish-texts">
                  {extractedText && (
                    <div className="flex items-start">
                      <span className="w-[9em] shrink-0 font-bold">Original Text</span>
                      <span className="text break-words">{extractedText}</span>
                    </div>
                  )}
  
                  {translatedText && (
                    <div className="flex items-start">
                      <span className="w-[9em] shrink-0 font-bold">Translation</span>
                      <span className="text break-words">{translatedText}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
  
            {/* dish images */}
            <motion.div
              key={imageUrls[0] || "empty"}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            >
              <DishImages imageUrls={imageUrls} menuImage={menuImage} />
            </motion.div>
  
          </main>
  
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );  
}
