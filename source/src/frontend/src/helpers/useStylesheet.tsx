import {useEffect} from 'react';
const useScript = (url: string) => {
    useEffect(() => {
        const script = document.createElement('link');
        script.href = url;
        script.rel="stylesheet"
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;