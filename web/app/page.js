'use client'

import UnityApp from './components/UnityApp';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    let audioContext;

    // The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
    // この問題を解決するためAudioに実装
    function startAudio() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          console.log('Audio context resumed after user gesture.');
        });
      }
    }

    const startButton = document.querySelector('#startButton');
    if (startButton) {
      startButton.addEventListener('click', startAudio);
    }

    return () => {
      if (startButton) {
        startButton.removeEventListener('click', startAudio);
      }
    };
  }, []);

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

      <p>ボタンをクリックすると音声に関する警告が止まる</p>
      <button id="startButton">Start Audio</button>
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
