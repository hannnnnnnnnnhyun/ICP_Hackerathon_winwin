export const convertImage = (image: Uint8Array|number[]) => {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));
    return `data:image/png;base64,${base64String}`;
}

export const imageToBlob = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        console.log('reader.result: ', reader.result);
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
        resolve(reader.result);
        // resolve(blob);
    }
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
})