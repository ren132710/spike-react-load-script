import { useEffect, useState } from 'react';

export function useExternalScript(url) {
  const [state, setState] = useState(url ? 'loading' : 'idle');

  useEffect(() => {
    if (!url) {
      setState('idle');
      return;
    }

    // get the script tag that has the src attribute with url
    let script = document.querySelector(`script[src="${url}"]`);

    const handleScript = (e) => {
      setState(e.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      script.async = true;
      script.defer = true;

      // body seems to be a good place to add a dynamic script
      document.body.appendChild(script);
      script.addEventListener('load', handleScript);
      script.addEventListener('error', handleScript);
    }

    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    return () => {
      script.removeEventListener('load', handleScript);
      script.removeEventListener('error', handleScript);
    };
  }, [url]);

  return state;
}
