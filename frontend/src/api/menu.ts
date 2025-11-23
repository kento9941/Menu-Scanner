export async function uploadImage(sourceLanguage: string, file: File) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000) // 2 minutes for EasyOCR model loading

  try {
    const formData = new FormData();    
    formData.append("source_language", sourceLanguage);
    formData.append("image", file);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) throw new Error("Backend URL is not defined");

    console.log("ENV:", process.env.NEXT_PUBLIC_BACKEND_URL)
  
    const res = await fetch(`${backendUrl}/upload-image`, {
      method: "POST",
      body: formData,
      mode: "cors",
      credentials: "omit",
      signal: controller.signal,
    });

    clearTimeout(timeout);
  
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Upload failed");
    }    
    return res.json();

  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Upload failed: timeout after 2 minutes. The backend may be loading models - please try again.");
    }
    if (err instanceof Error) {
      throw new Error(err.message || "Upload failed");
    }
    throw new Error("Upload failed");
  }
}