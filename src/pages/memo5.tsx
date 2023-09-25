// // JavaScript Document
// var drawScreen = {
//   // View Height / Width
//   view_h: 480,
//   view_w: 800,
  
//   // Viewport Width
//   viewport_w: 800,
  
//   // ソフトキーボード表示/非表示
//   softkeyboard: false,
  
//   // TVの縦フィット、横フィット対応
//   "tv": function(window_h, window_w) {
//     // 表示スケール算出
//     var vscale_h = window_h / drawScreen.view_h;
//     var vscale_w = window_w / drawScreen.view_w;
  
//     var vscale = (vscale_h > vscale_w) ? vscale_w : vscale_h;
  
//     // 小数点3ケタまでで四捨五入（borderの背景画像の表示がおかしくなるため）
//     vscale = Math.round(vscale * 1000) / 1000;
  
//     var style = document.getElementsByClassName('wrap')[0].style;
//     style.webkitTransformOrigin = '50% 0';
//     style.MozTransformOrigin = '50% 0';
//     style.transformOrigin = '50% 0';
//     style.webkitTransform = 'scale(' + vscale + ')';
//     style.MozTransform = 'scale(' + vscale + ')';
//     style.transform = 'scale(' + vscale + ')';
//   },
  
//   // スマートフォンの縦フィット、横フィット対応
//   "sp": function(window_h, window_w, firstdraw) {
//     var style = document.getElementsByClassName('wrap')[0].style;
//     style.visibility = 'visible';
  
//     //ソフトウェアキーボード表示中は拡大＆回転無効
//     if (drawScreen.softkeyboard) {
//       if (style.transform.indexOf('rotate') > -1) {
//         style.top = 0;
//         style.left = 0;
//         style.margin = 0;
//         //回転後に再表示しないとフォーカス位置が更新されない(iOSのみ)
//         if (drawScreen.iOS) {
//           style.display = 'none';
//           setTimeout(function() {
//             style.display = 'block';
//           }, 100);
//         }
//       }
//       style.position = 'absolute';
//       style.transform = '';
//       return;
//     }
  
//     //センター表示
//     style.top = '50%';
//     style.left = '50%';
//     style.marginTop = '-240px';
//     style.marginLeft = '-400px';
//     style.position = window_w < document.body.clientWidth ?
//       'absolute' : //拡大中はabsolute
//       'fixed'; //拡大していない場合、fixed でフィット
  
//     if (drawScreen.iOS && firstdraw) { //iOSでタイミングによって正しいinnerHeightが取得できない問題のWA
//       //横持ちで初回表示時はアドレスバー幅の拡縮によるチラツキを防ぐため非表示
//       if (drawScreen.safari && window_w > window_h) {
//         var dummy_div = document.createElement('div');
//         dummy_div.style.backgroundColor = '#3c3c3d';
//         dummy_div.style.width = dummy_div.style.height = '100%';
//         dummy_div.style.position = 'fixed';
//         document.body.appendChild(dummy_div);
//         drawScreen.dummy_div_for_safari = dummy_div;
  
//         drawScreen.initialHeight = window_h;
//       }
  
//       var redraw = function() {
//         if (!drawScreen.softkeyboard) { //ソフトキーボード非表示時に再描画
//           drawScreen.sp(window.innerHeight, window.innerWidth);
//         }
//       };
//       setTimeout(redraw, 500);
//       setTimeout(redraw, 1000); //500ms後もまだ取得できない場合があるため,1秒後も再描画
//     } else if (drawScreen.safari) {
//       if (drawScreen.dummy_div_for_safari) {
//         document.body.removeChild(drawScreen.dummy_div_for_safari);
//         delete drawScreen.dummy_div_for_safari;
//       }
//       if (drawScreen.initialHeight > window_h) {
//         //Safari横持ちの場合、アドレスバーの高さを考慮して画面位置を調整
//         window.scrollTo(0, (drawScreen.initialHeight - window_h) / 2);
//       }
//     }
  
//     // 表示スケール算出
//     var vscale_h = window_h / drawScreen.view_h;
//     var vscale_w = window_w / drawScreen.view_w;
//     // Viewport との倍率差 (iPhone Safari対応)
//     var viewport_rate = drawScreen.viewport_w/window_w;
  
//     if (vscale_h > vscale_w && window_h > window_w) {
//       //縦持ちの場合は、横回転させて縦or横フィット表示
//       var vscale_r = Math.min(
//         window_h/drawScreen.view_w, window_w/drawScreen.view_h);
//       style.transform = 'scale('+(vscale_r*viewport_rate)+') rotate(90deg)';
//     } else {
//       //横持ちの場合は、回転させずに縦or横フィット表示
//       var vscale = Math.min(vscale_h, vscale_w);
//       style.transform = 'scale('+(vscale*viewport_rate)+')';
//     }
//   }
//   };
  
//   document.addEventListener("DOMContentLoaded", function()
//   {
  
//   // デバイス判別
//   var dn = getDevice();
  
//   // cssによる多デバイス対応用 body へ class 追加
//   document.body.className = dn;
  
//   // media query で非表示にしていたbodyを表示
//   document.body.style.visibility = 'visible';
  
//   // タブレット端末の場合、フィット処理なし
//   if (drawScreen.tablet) {
//     return;
//   }
  
//   // 画面フィット処理
//   var draw = drawScreen[dn];
//   if (draw) {
//     // 初期読み込み時の表示対応
//     draw(window.innerHeight, window.innerWidth, true);
  
//     // ブラウザリサイズ時の表示対応
//     window.addEventListener('resize', function() {
//       draw(window.innerHeight, window.innerWidth);
//       if (drawScreen.iOS) {
//         //iOSでリサイズ直後は正しい画角が取得できない問題のWA
//         setTimeout(function() {
//           draw(window.innerHeight, window.innerWidth);
//         }, 100);
//       }
//     }, true);
//   }
  
//   // スマホ画面対応
//   if (dn === "sp") {
//     var focuscheck_type = /^tel$|^textarea$|^text$|^number$|^password$/;
//     //ソフトウェアキーボードOn
//     document.addEventListener("DOMFocusIn", function(event) {
//       if(drawScreen.softkeyboard || //すでに表示済み
//          !event.target || !event.target.type) {
//         return;
//       }
//       if(event.target.type.match(focuscheck_type)) {
//         drawScreen.softkeyboard = true;
//         draw(window.innerHeight, window.innerWidth);
//       }
//     }, false);
  
//     //ソフトウェアキーボードOff
//     document.addEventListener("DOMFocusOut", function(event) {
//       if(!drawScreen.softkeyboard || //すでに非表示
//          !event.target || !event.target.type) {
//         return; 
//       }
//       if(event.target.type.match(focuscheck_type)) {
//         drawScreen.softkeyboard = false;
//         //フォームからフォームへのフォーカス移動を考慮し遅延して再チェック
//         setTimeout(function() {
//           if (!drawScreen.softkeyboard) {
//             draw(window.innerHeight, window.innerWidth);
//           }
//         }, 100);
//       }
//     }, false);
//   } else if (dn === "aiseg") { // 自モニタ画面対応
//     //input, textarea のドラッグ禁止(フォーカスのみ付与)
//     document.addEventListener("mousedown", function(e) {
//       var name = e.target.tagName;
//       if (name && name.match(/^TEXTAREA$|^INPUT$/)) {
//         e.preventDefault();
//         e.target.focus();
//         e.target.setSelectionRange(0,0);
//       }
//     });
//   }
//   });
  
//   // アクセスデバイスの判定
//   function getDevice() {
//   var dn;
//   var agent = navigator.userAgent;
//   if (agent.match(/Viera.*Firefox|Firefox.*Viera/)) {
//   // 4K Viera
//   dn = "tv";
//   } else if (agent.match(/HomeCTRL/)) {
//   // 住宅機器コントローラ
//   dn = "hc";
//   } else if (agent.match(/JM_MON/)) {
//   // 住まいるサポ
//   dn = "nf";
//   } else if (agent.match(/HM_MON/)) {
//   // HEMSモニター
//   dn = "nf";
//   } else if (agent.match(/Android/)) {
//   // Android
//   dn = "sp";
//   if (!agent.match(/Mobile/)) {
//   // タブレット
//   drawScreen.tablet = true;
//   }
//   } else if (agent.match(/iPhone|iPad|iPod/)) {
//   // iOS
//   dn = "sp";
//   drawScreen.iOS = true;
//   if (agent.match(/iPad/)) {
//   // タブレット
//   drawScreen.tablet = true;
//   }
//   if (!agent.match(/CriOS|FxiOS/)) {
//   // Safari (iOS で Chrome, Firefox 以外を Safari とみなす)
//   drawScreen.safari = true;
//   }
//   } else if (agent.match(/NetFront/)) {
//   // NetFront
//   dn = "nf";
//   } else if (agent.match(/AiSEG/)) {
//   // AiSEG
//   dn = "aiseg";
//   } else if (agent.match(/PEWDMSHomeViewer/)) {
//   // マンションインターホン
//   dn = "aiseg"; //画面レイアウトはAiSEGと同じ
//   } else if (agent.match(/DoorCTRL/)) {
//   // ドアホン
//   dn = "aiseg"; //画面レイアウトはAiSEGと同じ
//   } else {
//   // PC-その他
//   dn = "pc";
//   }
//   return dn;
//   }
  //==============================================================================

// このコードは、異なるデバイスでウェブページの表示を最適化するためのものです。具体的には、画面のサイズと向きに基づいて、異なるデバイス（スマートフォン、タブレット、TVなど）に対応するスタイルを動的に適用します。以下に主なポイントを説明します：

// オブジェクトの定義
// drawScreenオブジェクトは、画面の高さ、幅、およびソフトキーボードの状態などのプロパティとメソッドを持ちます。これには、異なるデバイスと画面サイズに対応するためのロジックが含まれています。

// デバイス判定関数
// getDevice関数は、ユーザーエージェントを利用してアクセスしているデバイスを判定します。判定結果は、異なるデバイスに対応するスタイルを動的に適用するために使用されます。

// DOMContentLoadedイベントリスナー
// ページのコンテンツが完全にロードされた後に、このイベントリスナーはアクティブになり、デバイスのタイプに基づいて初期スタイルを適用します。また、resizeイベントリスナーも登録され、ウィンドウサイズが変更されたときに再描画を行います。

// スマートフォン向けの対応
// sp関数は、スマートフォンの縦持ち/横持ちの状態に基づいて画面のスケーリングと回転を調整します。また、ソフトウェアキーボードの表示/非表示時にスタイルをリセットするロジックも含まれています。

// テレビ向けの対応
// tv関数は、テレビのディスプレイサイズに合わせて画面のスケールを調整します。

// DOMFocusIn / DOMFocusOut イベントリスナー
// これらのイベントリスナーは、スマートフォンでのソフトキーボードの表示/非表示を検出し、適切に画面を再描画します。

// その他のデバイス向けの対応
// 住宅機器コントローラ、HEMSモニター、住まいるサポ、AiSEGデバイスなど、特定のデバイス向けの判定と対応が行われています。
