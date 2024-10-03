import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityApp({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
  width = 800,
  height = 600,
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

  return <Unity unityProvider={unityProvider} style={{ width, height }} />;
}
