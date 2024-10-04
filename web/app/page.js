'use client'

import UnityApp from './components/UnityApp';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);

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
      <div className="container">
        <h1>Yashironi PWA</h1>
      </div>

      <div className="container">
        {isSupported ? (
          <p className="service-worker">Service Worker Supported and Registered</p>
        ) : (
          <p className="service-worker">Service Worker Not Supported</p>
        )}
      </div>

      <div className="container">
        <h3>櫻坂46 - 自業自得</h3>
        <p>櫻坂46「自業自得」MVをP.I.C.S.にて制作、池田一真 (P.I.C.S. management)が監督を務めました。</p>
        <br />
        <p>センターを務めたのは3期生・山下瞳月さん。グループに加入して1年経った山下さんの覚悟やパフォーマンス能力が際立つ映像となっています。
          どんな誘惑や後悔があっても、過去に捨て去った自分に再び戻ることはない、信念を持ってブレずに、今の自分をまっすぐ伝える姿を映像で表現しました。</p>
        <video controls width="800">
          <source src="/Sakurazaka46.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container">
        <h3>First Unity App</h3>
        <p>これは日本語のダミーテキストです。文章の構造や配置を確認するために使用されます。実際の内容に意味はありませんが、文字の流れや配置を視覚化するのに役立ちます。</p>
        <p>ダミーテキストは、レイアウトやデザインの試作段階で、最終的なコンテンツの代わりに使用されます。これにより、デザイナーやクライアントは、実際の文章が挿入される前に、全体的な見た目や雰囲気を把握することができます。</p>
        <UnityApp
          loaderUrl="./webgl1/Build/test.loader.js"
          dataUrl="./webgl1/Build/test.data"
          frameworkUrl="./webgl1/Build/test.framework.js"
          codeUrl="./webgl1/Build/test.wasm"
          className="webgl"
          id="unity-app-1"
        />
      </div>
      
      <div className="container">
        <h3>Second Unity App</h3>
        <p>サラっとした素材は、肌触りが軽く、快適な着心地を提供します。これらの素材は、汗を素早く吸収し、蒸発させる特性を持っています。</p>
        <p>例えば、マイクロファイバーやポリエステル混紡の生地は、サラっとした感触を持ち、スポーツウェアや日常着に適しています。これらの素材は、湿気を効果的に逃がし、肌を乾いた状態に保ちます。</p>
        <p>サラっとした素材の衣服は、暑い季節や運動時に特に重宝します。肌に張り付かず、不快な湿気感を軽減するため、長時間の着用でも快適さを維持できます。</p>
        <br />
        <p>風通しが良い素材は、空気の循環を促進し、快適な着心地を提供します。これは特に暑い季節や運動時に重要です。通気性の高い素材は、汗を素早く蒸発させ、体温調節を助けます。</p>
        <p>例えば、メッシュ素材やコットン、リネンなどは風通しが良く、夏のウェアに適しています。これらの素材を使用した衣服は、体を涼しく保ち、不快な蒸れを防ぎます。</p>
        <p>また、風通しの良い衣服は、臭いの蓄積も軽減します。空気が自由に流れることで、汗や体臭が衣服に留まりにくくなります。これは、日常生活だけでなく、スポーツウェアにおいても重要な特性です。</p>
        <UnityApp
          loaderUrl="./webgl2/Build/test.loader.js"
          dataUrl="./webgl2/Build/test.data"
          frameworkUrl="./webgl2/Build/test.framework.js"
          codeUrl="./webgl2/Build/test.wasm"
          className="webgl"
          id="unity-app-2"
        />
      </div>

      <div className="container">
        <h3>Third Unity App</h3>
        <p>シワになりにくい素材は、忙しい現代生活において非常に重要です。これらの素材は、洗濯後や長時間の着用後でも、美しい外観を維持します。</p>
        <p>ポリエステルやナイロンなどの合成繊維は、シワになりにくい特性を持っています。これらの素材は、ビジネス用の衣服や旅行用の衣類に適しています。</p>
        <p>また、特殊な加工を施された天然繊維も、シワ耐性を持つことがあります。これにより、綿やリネンなどの快適な素材でも、シワになりにくい特性を得ることができます。</p>
        <p>シワになりにくい衣服は、アイロンがけの時間を節約し、常に整った外見を保つことができます。これは、忙しいプロフェッショナルや頻繁に旅行する人々にとって特に有用です。</p>
        <UnityApp
          loaderUrl="./webgl3/Build/test.loader.js"
          dataUrl="./webgl3/Build/test.data"
          frameworkUrl="./webgl3/Build/test.framework.js"
          codeUrl="./webgl3/Build/test.wasm"
          className="webgl"
          id="unity-app-3"
        />
      </div>
    </div>
  );
}
