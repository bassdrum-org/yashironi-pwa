'use client'

import UnityApp from './components/UnityApp';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      console.log("Service Worker Registered");

      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.log("Service Worker Not Registered", error);
    }
  }

  return (
    <div>
      {isSupported ? (
        <p>Service Worker Supported and Registered</p>
      ) : (
        <p>Service Worker Not Supported</p>
      )}

      <p>First Unity App</p>
      <UnityApp
        loaderUrl="./webgl1/Build/test.loader.js"
        dataUrl="./webgl1/Build/test.data"
        frameworkUrl="./webgl1/Build/test.framework.js"
        codeUrl="./webgl1/Build/test.wasm"
        width={1024}
        height={768}
      />

      <p>Second Unity App</p>
      <UnityApp
        loaderUrl="./webgl2/Build/test.loader.js"
        dataUrl="./webgl2/Build/test.data"
        frameworkUrl="./webgl2/Build/test.framework.js"
        codeUrl="./webgl2/Build/test.wasm"
        width={1024}
        height={768}
      />

      <p>Third Unity App</p>
      <UnityApp
        loaderUrl="./webgl3/Build/test.loader.js"
        dataUrl="./webgl3/Build/test.data"
        frameworkUrl="./webgl3/Build/test.framework.js"
        codeUrl="./webgl3/Build/test.wasm"
        width={1024}
        height={768}
      />
    </div>
  );
}
