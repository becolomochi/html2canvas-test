import html2canvas from 'html2canvas';
// const html2canvas = require('html2canvas');

function capture() {
  html2canvas(document.getElementById('target')).then(function(canvas) {
    // document.body.appendChild(canvas);
    downloadImage(canvas.toDataURL());
  });
}

function downloadImage(data) {
  let fname = 'capture_' + new Date()+ ".png";
  let encdata = atob(data.replace(/^.*,/, ''));
  let outdata = new Uint8Array(encdata.length);
  for (let i = 0; i < encdata.length; i++) {
    outdata[i] = encdata.charCodeAt(i);
  }
  let blob = new Blob([outdata], ["image/png"]);
  
  document.getElementById("getImage").href = data;			//base64そのまま設定
  document.getElementById("getImage").download = fname;		//ダウンロードファイル名設定
  document.getElementById("getImage").click(); 			//自動クリック
}

document.getElementById('button').onclick = capture();
