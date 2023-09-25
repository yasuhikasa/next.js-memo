interface DrawScreen {
  view_h: number;
  view_w: number;
  viewport_w: number;
  softkeyboard: boolean;
  iOS?: boolean;
  safari?: boolean;
  tablet?: boolean;
  dummy_div_for_safari?: HTMLDivElement;
  initialHeight?: number;
  tv?: (window_h: number, window_w: number) => void;
  sp: (window_h: number, window_w: number, firstdraw?: boolean) => void;
  [key: string]: any;  // 他のプロパティがある場合に備えて
}

export const drawScreen:DrawScreen = {
  // View Height / Width
  view_h: 480,
  view_w: 800,
  
  // Viewport Width
  viewport_w: 800,
  
  // ソフトキーボード表示/非表示
  softkeyboard: false,
  
  // スマートフォンの縦フィット、横フィット対応
  "sp": function(window_h, window_w, firstdraw) {
    const style = (document.getElementsByClassName('wrap')[0] as HTMLElement).style;
    style.visibility = 'visible';
  
    //ソフトウェアキーボード表示中は拡大＆回転無効
    if (drawScreen.softkeyboard) {
      if (style.transform.indexOf('rotate') > -1) {
        style.top = '0';
        style.left = '0';
        style.margin = '0';
        //回転後に再表示しないとフォーカス位置が更新されない(iOSのみ)
        if (drawScreen.iOS) {
          style.display = 'none';
          setTimeout(function() {
            style.display = 'block';
          }, 100);
        }
      }
      style.position = 'absolute';
      style.transform = '';
      return;
    }
  
    //センター表示
    style.top = '50%';
    style.left = '50%';
    style.marginTop = '-240px';
    style.marginLeft = '-400px';
    style.position = window_w < document.body.clientWidth ?
      'absolute' : //拡大中はabsolute
      'fixed'; //拡大していない場合、fixed でフィット
  
    if (drawScreen.iOS && firstdraw) { //iOSでタイミングによって正しいinnerHeightが取得できない問題のWA
      //横持ちで初回表示時はアドレスバー幅の拡縮によるチラツキを防ぐため非表示
      if (drawScreen.safari && window_w > window_h) {
        const dummy_div = document.createElement('div');
        dummy_div.style.backgroundColor = '#3c3c3d';
        dummy_div.style.width = dummy_div.style.height = '100%';
        dummy_div.style.position = 'fixed';
        document.body.appendChild(dummy_div);
        drawScreen.dummy_div_for_safari = dummy_div;
  
        drawScreen.initialHeight = window_h;
      }
  
      const redraw = function() {
        if (!drawScreen.softkeyboard) { //ソフトキーボード非表示時に再描画
          drawScreen.sp(window.innerHeight, window.innerWidth);
        }
      };
      setTimeout(redraw, 500);
      setTimeout(redraw, 1000); //500ms後もまだ取得できない場合があるため,1秒後も再描画
    } else if (drawScreen.safari) {
      if (drawScreen.dummy_div_for_safari) {
        document.body.removeChild(drawScreen.dummy_div_for_safari);
        delete drawScreen.dummy_div_for_safari;
      }
      if (drawScreen.initialHeight !== undefined && drawScreen.initialHeight > window_h) {
        //Safari横持ちの場合、アドレスバーの高さを考慮して画面位置を調整
        window.scrollTo(0, (drawScreen.initialHeight - window_h) / 2);
      }
    }
  
    // 表示スケール算出
    const vscale_h = window_h / drawScreen.view_h;
    const vscale_w = window_w / drawScreen.view_w;
    // Viewport との倍率差 (iPhone Safari対応)
    const viewport_rate = drawScreen.viewport_w/window_w;
  
    if (vscale_h > vscale_w && window_h > window_w) {
      //縦持ちの場合は、横回転させて縦or横フィット表示
      const vscale_r = Math.min(
        window_h/drawScreen.view_w, window_w/drawScreen.view_h);
      style.transform = 'scale('+(vscale_r*viewport_rate)+') rotate(90deg)';
    } else {
      //横持ちの場合は、回転させずに縦or横フィット表示
      const vscale = Math.min(vscale_h, vscale_w);
      style.transform = 'scale('+(vscale*viewport_rate)+')';
    }
  }
  };
  
  document.addEventListener("DOMContentLoaded", function()
  {
  
  // デバイス判別
  const dn = getDevice();
  
  // cssによる多デバイス対応用 body へ class 追加
  document.body.className = dn;
  
  // media query で非表示にしていたbodyを表示
  document.body.style.visibility = 'visible';
  
  // タブレット端末の場合、フィット処理なし
  if (drawScreen.tablet) {
    return;
  }
  
  // 画面フィット処理
  const draw = drawScreen[dn];
  if (draw) {
    // 初期読み込み時の表示対応
    draw(window.innerHeight, window.innerWidth, true);
  
    // ブラウザリサイズ時の表示対応
    window.addEventListener('resize', function() {
      draw(window.innerHeight, window.innerWidth);
      if (drawScreen.iOS) {
        //iOSでリサイズ直後は正しい画角が取得できない問題のWA
        setTimeout(function() {
          draw(window.innerHeight, window.innerWidth);
        }, 100);
      }
    }, true);
  }
  
  // スマホ画面対応
  if (dn === "sp") {
    const focuscheck_type = /^tel$|^textarea$|^text$|^number$|^password$/;
    //ソフトウェアキーボードOn
    document.addEventListener("DOMFocusIn", function(event) {
      const target = event.target as HTMLInputElement | null;
      if(drawScreen.softkeyboard || //すでに表示済み
         !target || !target.type) {
        return;
      }
      if(target.type.match(focuscheck_type)) {
        drawScreen.softkeyboard = true;
        draw(window.innerHeight, window.innerWidth);
      }
    }, false);
  
    //ソフトウェアキーボードOff
    document.addEventListener("DOMFocusOut", function(event) {
      const target = event.target as HTMLInputElement | null;
      if(!drawScreen.softkeyboard || //すでに非表示
        !target || !target.type) {
        return;
      }
      if(target.type.match(focuscheck_type)) {
        drawScreen.softkeyboard = false;
        //フォームからフォームへのフォーカス移動を考慮し遅延して再チェック
        setTimeout(function() {
          if (!drawScreen.softkeyboard) {
            draw(window.innerHeight, window.innerWidth);
          }
        }, 100);
      }
    }, false);
  } else if (dn === "aiseg") { // 自モニタ画面対応
        //input, textarea のドラッグ禁止(フォーカスのみ付与)
        document.addEventListener("mousedown", function(e) {
          if (e.target instanceof HTMLElement) {
            var name = e.target.tagName;
            if (name && name.match(/^TEXTAREA$|^INPUT$/)) {
              e.preventDefault();
              const target = e.target as HTMLInputElement | HTMLTextAreaElement;
              target.focus();
              target.setSelectionRange(0,0);
            }
          }
        })
  }
  });
  
  // アクセスデバイスの判定
  function getDevice() {
  let dn;
  const agent = navigator.userAgent;
  if (agent.match(/HomeCTRL/)) {
  // 住宅機器コントローラ
  dn = "hc";
  } else if (agent.match(/Android/)) {
  // Android
  dn = "sp";
  } else if (agent.match(/iPhone|iPad|iPod/)) {
  // iOS
  dn = "sp";
  drawScreen.iOS = true;
  if (agent.match(/iPad/)) {
  // タブレット
  drawScreen.tablet = true;
  }
  } else if (agent.match(/AiSEG/)) {
  // AiSEG
  dn = "aiseg";
  } else if (agent.match(/PEWDMSHomeViewer/)) {
  // マンションインターホン
  dn = "aiseg"; //画面レイアウトはAiSEGと同じ
  } else if (agent.match(/DoorCTRL/)) {
  // ドアホン
  dn = "aiseg"; //画面レイアウトはAiSEGと同じ
  } else {
  // PC-その他
  dn = "pc";
  }
  return dn;
  }