import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityApp({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
  aspectRatio = 16 / 9,
  id = "unity-app",
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

  const containerStyle = {
    position: "relative",
    width: "100%",
    paddingBottom: `${100 / aspectRatio}%`,
  };

  const unityStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <Unity unityProvider={unityProvider} id={id} style={unityStyle} />
    </div>
  );
}
