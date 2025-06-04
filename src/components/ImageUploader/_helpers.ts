/**
 * Compresses an image file to reduce its size before upload
 * @param file - The image file to compress
 * @param maxWidth - Maximum width for the compressed image (default: 1200)
 * @param maxHeight - Maximum height for the compressed image (default: 800)
 * @param quality - Compression quality between 0 and 1 (default: 0.8)
 * @returns Promise<string> - Base64 data URL of the compressed image
 */
interface CompressImageOptionsProps {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
}
export function compressImage(file: File, options: CompressImageOptionsProps = {}): Promise<string> {
    const { maxWidth = 1200, maxHeight = 800, quality = 0.8 } = options;
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;

            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx?.drawImage(img, 0, 0, width, height);

            // Convert to base64 with compression
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Converts a file to base64 data URL
 * @param file - The file to convert
 * @returns Promise<string> - Base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

// Custom format function that mimics date-fns format
export const format = (date: Date, pattern: string): string => {
    const formatMap: { [key: string]: () => string } = {
        // Day patterns
        'EEEE': () => date.toLocaleDateString('en-US', { weekday: 'long' }), // Monday, Tuesday, etc.
        'EEE': () => date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue, etc.
        'EE': () => date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue, etc.
        'E': () => date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue, etc.

        // Date patterns
        'dd': () => date.getDate().toString().padStart(2, '0'), // 01, 02, ..., 31
        'd': () => date.getDate().toString(), // 1, 2, ..., 31

        // Month patterns
        'MMMM': () => date.toLocaleDateString('en-US', { month: 'long' }), // January, February, etc.
        'MMM': () => date.toLocaleDateString('en-US', { month: 'short' }), // Jan, Feb, etc.
        'MM': () => (date.getMonth() + 1).toString().padStart(2, '0'), // 01, 02, ..., 12
        'M': () => (date.getMonth() + 1).toString(), // 1, 2, ..., 12

        // Year patterns
        'yyyy': () => date.getFullYear().toString(), // 2023, 2024, etc.
        'yy': () => date.getFullYear().toString().slice(-2), // 23, 24, etc.

        // Hour patterns (24-hour)
        'HH': () => date.getHours().toString().padStart(2, '0'), // 00, 01, ..., 23
        'H': () => date.getHours().toString(), // 0, 1, ..., 23

        // Hour patterns (12-hour)
        'hh': () => {
            const hours = date.getHours();
            const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
            return hour12.toString().padStart(2, '0');
        }, // 01, 02, ..., 12
        'h': () => {
            const hours = date.getHours();
            const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
            return hour12.toString();
        }, // 1, 2, ..., 12

        // Minute patterns
        'mm': () => date.getMinutes().toString().padStart(2, '0'), // 00, 01, ..., 59
        'm': () => date.getMinutes().toString(), // 0, 1, ..., 59

        // Second patterns
        'ss': () => date.getSeconds().toString().padStart(2, '0'), // 00, 01, ..., 59
        's': () => date.getSeconds().toString(), // 0, 1, ..., 59

        // AM/PM patterns
        'a': () => date.getHours() >= 12 ? 'PM' : 'AM',
        'aa': () => date.getHours() >= 12 ? 'PM' : 'AM',
        'aaa': () => date.getHours() >= 12 ? 'PM' : 'AM',
    };

    // Replace patterns in the format string
    let result = pattern;

    // Sort patterns by length (longest first) to avoid partial replacements
    const sortedPatterns = Object.keys(formatMap).sort((a, b) => b.length - a.length);

    for (const patternKey of sortedPatterns) {
        const regex = new RegExp(patternKey, 'g');
        result = result.replace(regex, formatMap[patternKey]());
    }

    return result;
};

export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
