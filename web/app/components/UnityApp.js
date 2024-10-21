import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityApp({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
  aspectRatio = 4 / 3,
  id = "unity-app",
  className = "",
}) {
  const { unityProvider } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "webgl",
    productVersion: "1.0",
  });

  const containerRef = useRef(null);
  const [unityDimensions, setUnityDimensions] = useState({
    width: "100%",
    height: "100%",
  });

  // Canvasのサイズを調整する
  function fitWindowCanvasSize() {
    const canvas = document.getElementById(id);
    if (!canvas || !containerRef.current) return; 

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const appWidth = 1920; 
    const appHeight = 1440; 
    const scale = Math.min(winWidth / appWidth, winHeight / appHeight);
    const fixWidth = appWidth * scale;
    const fixHeight = appHeight * scale;

    canvas.style.width = `${fixWidth}px`;
    canvas.style.height = `${fixHeight}px`;

    // <Unity>のサイズをcontainerのサイズにする
    setUnityDimensions({
      width: containerRect.width,
      height: containerRect.height,
    });
  }

  // ウインドのサイズを確認する
  function windowResizeEvent() {
    let timeoutId;
    const resizeDelay = 300;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fitWindowCanvasSize();
      }, resizeDelay);
    };

    window.addEventListener("resize", resizeHandler);

    // 清理函数，移除监听器
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }

  useEffect(() => {
    fitWindowCanvasSize();
    const cleanup = windowResizeEvent(); 

    return cleanup;
  }, []);

  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    paddingBottom: `${100 / aspectRatio}%`,
    height: 0,
    overflow: "hidden",
  };

  const unityStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: unityDimensions.width,
    height: unityDimensions.height,
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <Unity unityProvider={unityProvider} id={id} style={unityStyle} />
    </div>
  );
}
