"use client";

export default function SubmitButton({
    loading,
    imageSrc,
    handleUpload
}: {
    loading: boolean;
    imageSrc: string | null;
    handleUpload: (file: File) => void;
}) {
    
    return (
        <button 
            className="fancy"
            disabled={loading}
            onClick={async () => {
                if (!imageSrc) return;
                const file = await fetch(imageSrc)
                  .then(res => res.blob())
                  .then(blob => new File([blob], "upload.png", { type: blob.type }));
                await handleUpload(file);
              }}
        >
            <span className="top-key"></span>
            <span className="text">Find Images</span>
            <span className="bottom-key"></span>
        </button>
    )
}