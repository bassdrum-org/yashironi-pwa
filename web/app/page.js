'use client'

import UnityApp from './components/UnityApp'

export default function Home() {
  return (
    <div>
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
  )
}