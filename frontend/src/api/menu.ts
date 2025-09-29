export async function uploadImage(sourceLanguage: string, file: File) {
    const formData = new FormData();    
    formData.append("source_language", sourceLanguage);
    formData.append("image", file);
  
    const res = await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Upload failed");
    }
    return res.json();
  }