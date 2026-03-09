export function compressImage(file, maxWidth = null, quality = 1, mimeType = "image/jpeg") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => (img.src = reader.result);
    reader.onerror = reject;
    img.onerror = reject;

    img.onload = () => {
      const scale = maxWidth ? Math.min(1, maxWidth / img.width) : 1;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const q = Math.max(0, Math.min(1, quality)); // لازم 0..1
      resolve(canvas.toDataURL(mimeType, q));
    };

    reader.readAsDataURL(file);
  });
}