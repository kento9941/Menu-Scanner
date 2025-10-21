export async function uploadImage(sourceLanguage: string, file: File) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const formData = new FormData();    
    formData.append("source_language", sourceLanguage);
    formData.append("image", file);
  
    const res = await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeout);
  
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Upload failed");
    }    
    return res.json();

  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Upload failed: timeout after 10s");
    }
    throw new Error(err.message || "Upload failed");
  }
}