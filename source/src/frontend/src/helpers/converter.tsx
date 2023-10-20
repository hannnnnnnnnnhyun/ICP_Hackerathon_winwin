export const convertImage = (image: Uint8Array|number[]) => {
    try {
        console.log('image: ', image)
        const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));
        return `data:image/png;base64,${base64String}`;
    } catch (e) {
        const tempImage = Buffer.from(image);
        return 'data:image/png;base64,' + tempImage.toString("base64")
    }
}
export const imageToBlob = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
        resolve(reader.result);
    }
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
})