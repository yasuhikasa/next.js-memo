// utils/screenFit.js
export function applyScreenFit() {
  const ua = navigator.userAgent.toLowerCase();
  const style = (document.getElementsByClassName('wrap')[0] as HTMLElement).style;

  let initialHeight = window.innerHeight;
  let isSoftKeyboardShown = false;

  function updateScreenFit() {
    const window_h = window.innerHeight;
    const window_w = window.innerWidth;
    const baseWidth = 800;
    const baseHeight = 480;

    // ソフトキーボードの表示をチェック
    isSoftKeyboardShown = initialHeight > window_h;

    if (ua.indexOf('aiseg2') > -1 || ua.indexOf('homectrl') > -1) {
      // 解像度は1024*600, 縦をフィットさせ、横は左寄せ。余った領域は画面の余白で埋める。
      const scale = window_h / 600;
      const offset = (window_w - 1024 * scale) / 2;
      style.transform = `scale(${scale})`;
      style.transformOrigin = 'top left';
      style.marginLeft = `${offset}px`;
    } else if (ua.indexOf('pewdmshomeviewer') > -1 || ua.indexOf('doorctrl') > -1) {
      // 解像度は800*480, 画面サイズとコンテンツサイズが同じため変更不要
      style.transform = '';
      style.marginLeft = '0';
    } else if (
      ua.indexOf('android') > -1 ||
      ua.indexOf('ipad') > -1 ||
      ua.indexOf('iphone') > -1
    ) {
      if (isSoftKeyboardShown) {
        // ソフトキーボードON時には一時的に画面フィットと回転を元に戻す
        style.transform = '';
        style.marginLeft = '0';
      } else {
        // 縦をフィットさせ、横は中央揃え
        const vscale = window_h / baseHeight;
        const hoffset = (window_w - baseWidth * vscale) / 2;
        style.transform = `scale(${vscale})`;
        style.transformOrigin = 'top';
        style.marginLeft = `${hoffset}px`;
      }
    } else {
      // その他の場合、画面フィットはせず中央揃えにする
      const scale_h = window_h / baseHeight;
      const scale_w = window_w / baseWidth;
      const scale = Math.min(scale_h, scale_w);
      const marginLeft = (window_w - baseWidth * scale) / 2;
      const marginTop = (window_h - baseHeight * scale) / 2;
      style.transform = `scale(${scale})`;
      style.transformOrigin = 'top left';
      style.marginLeft = `${marginLeft}px`;
      style.marginTop = `${marginTop}px`;
    }
  }

  updateScreenFit();
  window.addEventListener('resize', updateScreenFit);
}


