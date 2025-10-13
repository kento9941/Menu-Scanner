"use client";

export default function DeleteButton({
    imageSrc,
    setImageSrc
}: {
    imageSrc: string | null;
    setImageSrc: (src: string | null) => void;
}) {
    const handleDelete = () => {
        
        const confirmed = window.confirm("Are you sure to delete the image?");
        if (confirmed) {
        setImageSrc(null);
        }
        
      };
    return (
        <button
            className="disabled:opacity-40"
            onClick={handleDelete}
            disabled={!imageSrc}
        >
            <i className="fa-regular fa-trash-can fa-3x"></i>
        </button>
    );
}