
export const MessageKey = {
    FN_HEADER_NAME: 'FN_HEADER_NAME',
};
export class AppUltil {
    /**
     * Constructor
     */
    constructor() {
    }

    public static base64ToBlob(base64) {
        try {
            const binaryString = window.atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; ++i) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return new Blob([bytes], { type: 'application/octet-stream' });
        }
        catch { return undefined; }
    };

    public static blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
}
