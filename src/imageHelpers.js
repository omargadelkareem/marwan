export function compressImage(file, maxWidth = 900, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      img.src = reader.result;
    };

    reader.onerror = reject;
    img.onerror = reject;

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const base64 = canvas.toDataURL("image/jpeg", quality);
      resolve(base64);
    };

    reader.readAsDataURL(file);
  });
}