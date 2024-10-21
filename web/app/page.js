'use client'

import UnityApp from './components/UnityApp';
import ImageRow from './components/ImageRow';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [uiVisible, setUiVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // 1秒内5回をクリックすると、UIを開く、または閉じる
  useEffect(() => {
    if (clickCount === 5) {
      toggleUI();
      setClickCount(0);
    }

    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);


  const handleFontSizeChange = (action) => {
    let newSize = fontSize;
    if (action === 'increase' && fontSize < 40) { 
      newSize = fontSize + 2;
    } else if (action === 'decrease' && fontSize > 4) { 
      newSize = fontSize - 2;
    }
    setFontSize(newSize);
  };

  const toggleUI = () => {
    setUiVisible(!uiVisible);
  };

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
      <div
          className="click-zone"
          onClick={() => setClickCount(clickCount + 1)}
      ></div>

      <div className="font-selector">
          {uiVisible && (
            <div className="font-controls">
              <div className="control-buttons">
                <button onClick={() => handleFontSizeChange('decrease')} className="toggle-btn">-</button>
                <button onClick={() => handleFontSizeChange('increase')} className="toggle-btn">+</button>
              </div>
              <div className="font-indicator">
                <p>font size: {fontSize}px</p>
              </div>
              <div>
                <button onClick={toggleUI} className="toggle-btn">
                  Close Font Controls
                </button>
              </div>
            </div>
          )}
      </div>

      <div className="header">
        <h1>矢代仁の御召の「着やすさ」を解剖！</h1>
        {isSupported ? (
          <p className="service-worker">［きものサローネ 2024に向けた機能性検証プロトタイプ］</p>
        ) : (
          <p className="service-worker">［きものサローネ 2024に向けた機能性検証プロトタイプ］</p>
        )}
      </div>

      <div className="body">
        <div className="container">
          <h2 className="title">仮説からはじめる：機能性を検証するために</h2>
          <p>「御召には、最先端の繊維にも負けない機能性があるのではないか？」</p>
          <p>そんな仮説を出発点に、矢代仁は300年つづく企業としての起源である「御召」の機能性をめぐるリサーチを進めています。「御召」という織物は、もともと徳川11代将軍である家斉が好んできた下着にルーツがあるとされています。御召緯（おめしぬき）とよばれる強い撚りがかかった糸を使っているため、表面に細かい凹凸があり、非常に手触りがよいのが特徴です。</p>
          <p>現代人の感覚でいえば、着物は重たい、着づらいといった印象がどうしてもぬぐえません。ただ、平安時代には貴族が着ていた十二単（じゅうにひとえ）と呼ばれる非常に複雑な様式と比較すると、1500年近い歴史のなかで時代の変化に合わせて進化してきたのが、現代まで残る着物であるというのもまた事実です。着物という文化のなかには、先人たちがいかに快適に暮らせるか？という思いのなかで培ってきた技術が残されているはずです。</p>
          <p>矢代仁は、2024年に「YSN：ゆっくりしっかりのこす」というプロジェクトを立ち上げました。先人が培ってきた技術をプロフェッショナルの力を借りながら、科学的な手法をもとに現代に生きる人たちが理解できるような形で、消費者のみなさまにご説明することを目指しています。</p>
          <p>今回の展示では、弊社がこれまで御召の機能性としてご評判をいただいてきた3つの側面を解明する仮説をご覧いただきます。矢代仁がこだわってきた強い撚りのかかった糸によって生み出される凹凸によると思われる「サラサラしている」、「風通しがよい」、「シワになりにくい」という3つの機能性は、暑さと湿気が年々増す現代で日々着物を着る上では不可欠なものだと考えています。</p>
        </div>

        <div className="container">
          <h2 className="title">仮説1）サラサラ：適度な凹凸が生みだす快適さ</h2>
          <p>着物では生地の凹凸のことを「シボ」と呼びます。着物を御召しになる方だと、一度は聞いたことがある言葉なのではないでしょうか。では、そもそも生地にシボがあると何がいいのでしょう。</p>
          <p>凹凸が少ない生地は、肌と接する点が少なく、そこに強い力がかかってしまいます。シボがあることで肌との接地点が少なくなり、適度な快適さが生み出されるのです。ただし、シボが多すぎてもダメです。接地点が多すぎると、大きな摩擦が発生してしまい、肌離れが悪い生地になってしまうのです。</p>
          <p>以上の仮説を検証するために、生地の凹凸を増減させると肌との接地点がどのように変化するかをシュミレーションできるモデルをつくりました。このモデルが、シボと着心地を考えるうえでの出発点になると思います。</p>
          <UnityApp
            loaderUrl="./webgl1/Build/01_v2.1_webgl.loader.js"
            dataUrl="./webgl1/Build/01_v2.1_webgl.data"
            frameworkUrl="./webgl1/Build/01_v2.1_webgl.framework.js"
            codeUrl="./webgl1/Build/01_v2.1_webgl.wasm"
            className="webgl"
            id="unity-app-1"
          />
        </div>

        <div className="container">
          <h3 className="title">仮説2）風通しのよさ：凹凸の間を空気が流れる</h3>
          <p>高温多湿化が進む現代において、着るものが涼しいかどうかは快適性を担うひとつの大きなポイントです。生地の涼しさをつくる一つの要素として、現代の冷感インナーなどでは「風通しがよい」という言葉がつかわれることがあります。</p>
          <p>御召は単衣で仕立てることで、暑い時期にも対応できる着物です（盛夏に野外が多い着装シーンには「駒御召」と呼ばれる別の織物をオススメしています）。その理由は凹凸によって生まれる風通しのよさにあるのではないかと考えています。</p>
          <p>生地に凹凸ができることによって、まるで生地の表面には高低差が生まれます。仮説1で検証したように肌との設置点も多いため、まるで山と谷の間を風が吹き抜けるように空気の流れが生まれる余地が存在するわけです。</p>
          <p>以下は、御召のような凹凸のある生地で、いかに空気が流れるかを示したモデルです。</p>
          <UnityApp
            loaderUrl="./webgl2/Build/02_v2.8_webgpu.loader.js"
            dataUrl="./webgl2/Build/02_v2.8_webgpu.data"
            frameworkUrl="./webgl2/Build/02_v2.8_webgpu.framework.js"
            codeUrl="./webgl2/Build/02_v2.8_webgpu.wasm"
            className="webgl"
            id="unity-app-2"
          />
        </div>

        <div className="container">
          <h3 className="title">仮説3）シワが戻りやすい：凹凸がもつ形状記憶性</h3>
          <p>アクティブに着物を御召しになる人にとって、気になるのがシワです。江戸時代よりも、移動が多い現代の生活では、どうしても生地にシワが寄ってしまうことは避けがたいのが現実ですし、シワを気にして生活するのは面倒くさいものです。</p>
          <p>矢代仁では「御召はシワになりにくいので着やすい」というお声をよく頂戴してきました。ただ、その理由を明確に把握していたわけではないのが正直なところで、「生地にハリがあるので、シワになりにくい」というご説明をさせていただいておりました。</p>
          <p>御召の凹凸に関するリサーチから見えてきたのは、細かくランダムな凹凸が形状記憶性をもっているのではないか？という仮説です。凹凸が少ない生地と比べ、シワになったとき、生地にかかった重力が凹凸を通じて、元の姿にもどるように分散されている可能性があります。</p>
          <p>以下は、御召をモデルとした凹凸のある生地のなかで、どのように物理的な力がかかっているかを示しています。</p>
          <ImageRow srcArray={['/03_WrinkleSim.gif']} />
        </div>

        <div className="container">
          <h2 className="title">「着やすさ」を解剖していく：今後の展望</h2>
          <p>以上は、2023年から続けてきたリサーチの到達点に過ぎません。これで300年つづいてきた御召の「機能性」を解明できたわけではありません。今後も実際の御召からのデータ取得など、検証を進めていきます。</p>
          <p>また今回のリサーチは、改めて「着やすさ」について考え直すきっかけとなりました。「着やすさ」とは、生地がもつ特性が絡み合うことによって実現されます。また、「着崩れしにくい」「裾捌きがよい」など、着物に固有の着やすさを成立させる要素も存在します。以下にまだ検証中のモデルの一部も公開させていただきます。</p>
          <p>今後も検証を進めた結果をお伝えしながら、御召という織物をみなさまにお届けできればと考えております。2025年10月にも「YSN：ゆっくりしっかりのこす」の展示を京都で開催し、今回のような科学的検証の一部を体感していただく予定です。</p>
          <ul>
            <li>「着崩れしにくい」を検証するモデル</li>
          </ul>
          <ImageRow srcArray={['/image5.gif']} />
          <ul>
            <li>「裾捌きがよい」を検証するモデル</li>
          </ul>
        </div>

        <div className="container">
          <h2 className="title">制作クレジット</h2>
          <p>
              監修：須田伸一、矢代真也（矢代仁）<br />
              テクニカルディレクション：BASSDRUM（池田航成、小川恭平、森岡東洋志）<br />
              ビジュアライゼーション：小川恭平（BASSDRUM）<br />
              アプリケーション構築：張釗（BASSDRUM）<br />
              執筆：矢代真也（矢代仁）
          </p>
        </div>
        
        {/* <div className="container">
          <h3 className="title">櫻坂46 - 自業自得</h3>
          <hr className="horizon-line"/>

          <p>櫻坂46「自業自得」MVをP.I.C.S.にて制作、池田一真 (P.I.C.S. management)が監督を務めました。</p>
          <p>センターを務めたのは3期生・山下瞳月さん。グループに加入して1年経った山下さんの覚悟やパフォーマンス能力が際立つ映像となっています。
            どんな誘惑や後悔があっても、過去に捨て去った自分に再び戻ることはない、信念を持ってブレずに、今の自分をまっすぐ伝える姿を映像で表現しました。</p>
          <video controls width="800">
            <source src="/Sakurazaka46.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="container">
            <h1 className="subtitle">アプリその一</h1>
            <hr className="horizon-line"/>

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
            <h4 className="subtitle">二番目のアプリ</h4>
            <hr className="horizon-line"/>

            <p>サラっとした素材は、肌触りが軽く、快適な着心地を提供します。これらの素材は、汗を素早く吸収し、蒸発させる特性を持っています。</p>
            <p>例えば、マイクロファイバーやポリエステル混紡の生地は、サラっとした感触を持ち、スポーツウェアや日常着に適しています。これらの素材は、湿気を効果的に逃がし、肌を乾いた状態に保ちます。</p>
            <p>サラっとした素材の衣服は、暑い季節や運動時に特に重宝します。肌に張り付かず、不快な湿気感を軽減するため、長時間の着用でも快適さを維持できます。</p>
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
            <h4 className="subtitle">サードアプリ</h4>
            <hr className="horizon-line"/>

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
        </div> */}
      </div>
    </div>
  );
}
