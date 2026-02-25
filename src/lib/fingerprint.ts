/**
 * Content fingerprinting using zero-width characters.
 * Encodes a keyId into invisible markers inserted between words.
 * Deterministic per keyId so leaked content can be traced.
 */

// Zero-width characters used for encoding
const ZW_CHARS = [
  "\u200B", // Zero-width space
  "\u200C", // Zero-width non-joiner
  "\u200D", // Zero-width joiner
  "\uFEFF", // Zero-width no-break space (BOM)
];

/**
 * Encode a string into a sequence of zero-width characters.
 * Uses base-4 encoding (4 ZW chars = 2 bits each).
 */
function encodeToZeroWidth(input: string): string {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    // Encode each byte as 4 base-4 digits (8 bits / 2 bits per digit)
    for (let shift = 6; shift >= 0; shift -= 2) {
      const index = (charCode >> shift) & 0x03;
      result += ZW_CHARS[index];
    }
  }
  return result;
}

/**
 * Decode zero-width characters back into the original string.
 */
function decodeFromZeroWidth(encoded: string): string {
  // Extract only zero-width characters
  const zwOnly = encoded.split("").filter((ch) => ZW_CHARS.includes(ch));

  let result = "";
  for (let i = 0; i < zwOnly.length; i += 4) {
    if (i + 3 >= zwOnly.length) break;
    let charCode = 0;
    for (let j = 0; j < 4; j++) {
      const index = ZW_CHARS.indexOf(zwOnly[i + j]);
      if (index === -1) return result; // invalid sequence
      charCode = (charCode << 2) | index;
    }
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * Simple deterministic hash to pick insertion positions.
 * Uses the keyId to generate a stable sequence of positions.
 */
function deterministicPositions(keyId: string, wordCount: number, insertCount: number): number[] {
  // Simple hash from keyId
  let hash = 0;
  for (let i = 0; i < keyId.length; i++) {
    hash = ((hash << 5) - hash + keyId.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash);

  const positions: number[] = [];
  if (wordCount <= 1) return [0];

  for (let i = 0; i < insertCount; i++) {
    // Spread insertions across the text
    const pos = ((hash + i * 7919) % (wordCount - 1)) + 1; // Between words (1 to wordCount-1)
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }

  return positions.sort((a, b) => a - b);
}

/**
 * Add invisible fingerprint markers to text content.
 * The keyId is encoded into zero-width characters and inserted
 * at deterministic positions between words.
 *
 * @param content - The text to fingerprint
 * @param keyId - The API key identifier to embed
 * @returns The fingerprinted text (visually identical)
 */
export function fingerprintContent(content: string, keyId: string): string {
  if (!content || !keyId) return content;

  const encoded = encodeToZeroWidth(keyId);
  const words = content.split(/( +)/); // Split but preserve spaces

  if (words.length <= 2) {
    // Very short content — just append
    return content + encoded;
  }

  // Insert the encoded keyId at a deterministic position
  const nonSpaceIndices: number[] = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].trim() !== "") {
      nonSpaceIndices.push(i);
    }
  }

  if (nonSpaceIndices.length <= 1) {
    return content + encoded;
  }

  // Pick 3 positions (redundancy for robustness) to insert the fingerprint
  const positions = deterministicPositions(keyId, nonSpaceIndices.length, 3);

  let insertCount = 0;
  const result: string[] = [];
  let wordIndex = 0;

  for (let i = 0; i < words.length; i++) {
    result.push(words[i]);
    if (words[i].trim() !== "") {
      wordIndex++;
      if (insertCount < positions.length && wordIndex === positions[insertCount]) {
        result.push(encoded);
        insertCount++;
      }
    }
  }

  return result.join("");
}

/**
 * Extract a fingerprint (keyId) from text content.
 * Looks for zero-width character sequences and attempts to decode them.
 *
 * @param content - Text that may contain a fingerprint
 * @returns The decoded keyId, or null if no fingerprint found
 */
export function extractFingerprint(content: string): string | null {
  if (!content) return null;

  // Extract all zero-width characters
  const zwChars = content.split("").filter((ch) => ZW_CHARS.includes(ch));

  if (zwChars.length < 4) return null; // Need at least 4 chars for 1 byte

  // Try to decode — the fingerprint will appear multiple times (redundancy)
  const decoded = decodeFromZeroWidth(zwChars.join(""));

  if (!decoded || decoded.length === 0) return null;

  // The fingerprint is repeated, so look for the key pattern (starts with "tspy_")
  // or return the first valid segment
  const tspyMatch = decoded.match(/tspy_[a-f0-9]+/);
  if (tspyMatch) return tspyMatch[0];

  // If no tspy_ prefix found, return the raw decoded value if it looks valid
  if (decoded.length >= 4 && /^[\x20-\x7e]+$/.test(decoded)) {
    return decoded;
  }

  return null;
}
