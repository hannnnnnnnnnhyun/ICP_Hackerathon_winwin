import { useEffect, useState } from "react";

function useScript(src: string, async?: boolean) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = src; //script의 실행 src
        script.async = typeof async == "boolean" ? async : true;

        const handleLoad = () => setLoading(false);
        const handleError = (error: any) => setError(error);

        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError);

        document.body.appendChild(script);

        return () => {
            script.removeEventListener("load", handleLoad);
            script.removeEventListener("error", handleError);
            document.body.removeChild(script);
        };
    }, [src]);

    return [loading, error];
}

export default useScript;