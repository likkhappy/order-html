/**
 * file 转成 dataURL
 * @param file 文件
 * @param callback 回调函数
 */

 function fileToDataURL (file, callback) {
  const reader = new window.FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

/**
 * 使用 canvas 压缩处理 dataURL
 * @param dataURL
 * @param ratio 比例
 * @param callback
 */
function compressDataURL (dataURL, ratio, callback) {
  // 1
  const img = new window.Image();
  img.src = dataURL;
  img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100 * ratio.width;
      canvas.height = 100 * ratio.height;
      const RATIO = canvas.width / canvas.height;
      let cutx = 0;
      let cuty = 0;
      let cutw = img.width;
      let cuth = img.height;
      if (cutw / cuth > RATIO) {
        // 宽超过比例了]]
        let realw = cuth * RATIO;
        cutx = (cutw - realw) / 2;
        cutw = realw;
      } else if (cutw / cuth < RATIO) {
        // 长超过比例了]]
        let realh = cutw / RATIO;
        cuty = (cuth - realh) / 2;
        cuth = realh;
      }
      ctx.drawImage(img, cutx, cuty, cutw, cuth, 0, 0, canvas.width, canvas.height);
      const ndata = canvas.toDataURL('image/jpeg', 1);
      callback(ndata);
}
