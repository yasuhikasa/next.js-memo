// util/screenFit.js

const screenFit = () => {
  // SSR(Server Side Rendering)の環境下でも動作するようにwindowオブジェクトの存在を確認
  if (typeof window !== 'undefined') {
    // 余った領域を黒で塗りつぶす
    document.body.style.backgroundColor = 'black';

    let lastWindowHeight = window.innerHeight;  // 最後に記録されたウィンドウの高さを保存

    const fitScreen = () => {
      const userAgent = navigator.userAgent.toLowerCase();  // ユーザーエージェントを取得し、小文字に変換
      let scaleValue;  // スケール値を保存する変数
      let alignment;  // アラインメントを保存する変数
      let marginTop = 0;  // 上マージンを保存する変数
      let marginLeft = 0;  // 左マージンを保存する変数

      // ユーザーエージェントをチェックして適切なスケール値とマージンを計算
      if (userAgent.includes('aiseg2') || userAgent.includes('homectrl')) {
        const aspectRatio = window.innerWidth / window.innerHeight;  // アスペクト比を計算
        if (aspectRatio > (1024 / 600)) {
          scaleValue = window.innerHeight / 600;  // 縦をフィットさせる
          marginLeft = (window.innerWidth - (1024 * scaleValue)) / 2;  // 左マージンを計算
        } else {
          scaleValue = window.innerWidth / 1024;  // 横をフィットさせる
          marginTop = (window.innerHeight - (600 * scaleValue)) / 2;  // 上マージンを計算
        }
        alignment = 'left';  // 左寄せ
      } else if (userAgent.includes('pewdmshomeviewer') || userAgent.includes('doorctrl')) {
        scaleValue = 1;  // 解像度が基本解像度と同じであるため、スケーリングは不要
      } else if (
        userAgent.includes('android') ||
        userAgent.includes('ipad') ||
        userAgent.includes('iphone')
      ) {
        scaleValue = window.innerHeight / 600;  // 縦をフィットさせる
        marginLeft = (window.innerWidth - (800 * scaleValue)) / 2;  // 左マージンを計算
        alignment = 'center';  // 中央揃え
      } else {
        alignment = 'center';  // 中央揃え
      }

      // body要素のスケール、変形原点、およびマージンを設定
      document.body.style.transform = `scale(${scaleValue})`;
      document.body.style.transformOrigin = alignment === 'left' ? 'top left' : 'top center';
      document.body.style.marginTop = `${marginTop}px`;
      document.body.style.marginLeft = `${marginLeft}px`;
    };

    const handleResize = () => {
      // ウィンドウの高さが大きく変わった（ソフトキーボードの表示/非表示）時に動作
      if (window.innerHeight < lastWindowHeight - 100) {
        // スタイルをリセット
        document.body.style.transform = '';
        document.body.style.marginTop = '';
        document.body.style.marginLeft = '';
      } else {
        // ソフトキーボードが非表示になった場合、再度画面をフィットさせる
        fitScreen();
      }
      lastWindowHeight = window.innerHeight;  // 最後に記録されたウィンドウの高さを更新
    };

    fitScreen();  // 初期ロード時に画面をフィットさせる
    window.addEventListener('resize', handleResize);  // resizeイベントにリスナーを追加
  }
};

export default screenFit;


// // util/screenFit.js

// const screenFit = () => {
//   // window オブジェクトが存在するかどうかをチェック (SSR対応)
//   if (typeof window !== 'undefined') {
//     // 余った領域を黒で埋めるためのスタイルを設定
//     document.body.style.backgroundColor = 'black';

//     const fitScreen = () => {
//       // ユーザーエージェントを取得し、小文字に変換
//       const userAgent = navigator.userAgent.toLowerCase();
//       let scaleValue;  // スケール値を保存する変数
//       let alignment;  // アラインメントを保存する変数
//       let marginTop = 0;  // 上マージンを保存する変数
//       let marginLeft = 0;  // 左マージンを保存する変数

//       // ユーザーエージェントが 'aiseg2' または 'homectrl' を含む場合
//       if (userAgent.includes('aiseg2') || userAgent.includes('homectrl')) {
//         const aspectRatio = window.innerWidth / window.innerHeight;
//         if (aspectRatio > (1024 / 600)) {
//           scaleValue = window.innerHeight / 600;  // 縦をフィットさせる
//           // 余った領域のマージンを計算する
//           marginLeft = (window.innerWidth - (1024 * scaleValue)) / 2;
//         } else {
//           scaleValue = window.innerWidth / 1024;  // 横をフィットさせる
//           // 余った領域のマージンを計算する
//           marginTop = (window.innerHeight - (600 * scaleValue)) / 2;
//         }
//         alignment = 'left';  // 左寄せ
//       } 
//       // ユーザーエージェントが 'pewdmshomeviewer' または 'doorctrl' を含む場合
//       else if (userAgent.includes('pewdmshomeviewer') || userAgent.includes('doorctrl')) {
//         scaleValue = 1;  // 解像度が基本解像度と同じであるため、スケーリングは不要
//       } 
//       // ユーザーエージェントが 'android'、'ipad'、または 'iphone' のいずれかを含む場合
//       else if (
//         userAgent.includes('android') ||
//         userAgent.includes('ipad') ||
//         userAgent.includes('iphone')
//       ) {
//         scaleValue = window.innerHeight / 600;  // 縦をフィットさせる
//         // 余った領域のマージンを計算する
//         marginLeft = (window.innerWidth - (800 * scaleValue)) / 2;
//         alignment = 'center';  // 中央揃え
//       } 
//       // それ以外の場合（デフォルト設定）
//       else {
//         alignment = 'center';  // 中央揃え
//       }

//       // body要素のスケール、変形原点、そしてマージンを設定
//       document.body.style.transform = `scale(${scaleValue})`;
//       document.body.style.transformOrigin = alignment === 'left' ? 'top left' : 'top center';
//       document.body.style.marginTop = `${marginTop}px`;
//       document.body.style.marginLeft = `${marginLeft}px`;
//     };

//     // 初期ロード時に画面をフィットさせる
//     fitScreen();

//     // resizeイベントにリスナーを追加して、画面サイズが変更されたときにfitScreen関数を呼び出す
//     window.addEventListener('resize', fitScreen);

//     // ソフトキーボードが表示されたとき、または非表示になったときにresizeイベントが発生するため、
//     // resizeイベントのハンドラーでfitScreen関数が呼び出され、画面のフィットと回転が元に戻されます。
//   }
// };

// export default screenFit;
