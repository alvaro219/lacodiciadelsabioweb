/**
 * Prepara una imagen para subirla: como mucho `maxSide` píxeles por lado y en
 * WebP, que pesa bastante menos que un PNG. Si el navegador no puede
 * convertirla, o el resultado no pesa menos, devuelve el archivo original.
 */
export async function compressImage(file: File, maxSide = 1920, quality = 0.9): Promise<File> {
  if (!/^image\/(png|jpeg|webp|bmp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (!blob || blob.type !== 'image/webp' || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' });
  } catch {
    return file;
  }
}
