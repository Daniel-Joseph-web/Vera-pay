import sharp from 'sharp';

/**
 * Computes a 64-bit difference hash (dHash) of an image buffer.
 * Invariant to moderate lighting, format conversion, and compression changes.
 */
export async function computeImageDHash(imageBuffer: Buffer): Promise<string> {
  const rawPixels = await sharp(imageBuffer)
    .resize(9, 8, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer();

  let binaryString = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const leftPixel = rawPixels[row * 9 + col];
      const rightPixel = rawPixels[row * 9 + col + 1];
      binaryString += leftPixel < rightPixel ? '1' : '0';
    }
  }

  // Convert binary string to 16-character hexadecimal string
  let hexHash = '';
  for (let i = 0; i < 64; i += 4) {
    hexHash += parseInt(binaryString.substring(i, i + 4), 2).toString(16);
  }

  return hexHash;
}

/**
 * Computes Hamming Distance between two 16-hex perceptual hashes.
 * Distance < 5 indicates an identical or recycled image.
 */
export function computeHammingDistance(hash1: string, hash2: string): number {
  if (hash1.length !== hash2.length) return 64;
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    const val = parseInt(hash1[i], 16) ^ parseInt(hash2[i], 16);
    distance += val.toString(2).split('1').length - 1;
  }
  return distance;
}
