/**
 * 將 <img> 或 <canvas> 元素轉換為 File 和 Blob 對象
 * @param {HTMLCanvasElement | HTMLImageElement} element - 輸入的 <canvas> 或 <img> 元素
 * @param {Object} [options] - 可選參數
 * @param {string} [options.format='image/png'] - 輸出圖片格式，例如 'image/png' 或 'image/jpeg'
 * @param {number} [options.quality=1] - 圖片品質（僅適用於 JPEG），範圍 0 到 1
 * @param {string} [options.fileName='image'] - 輸出文件的名稱（不含擴展名）
 * @returns {Promise<{ file: File, blob: Blob }>} - 包含 File 和 Blob 對象的 Promise
 * @throws {Error} - 如果輸入無效或轉換失敗，拋出錯誤
 */
export const elementToFileAndBlob = (element, options = {}) => {
    // 設置默認選項
    const {
      format = 'image/png',
      quality = 1, // 僅對 JPEG 有效
      fileName = 'image',
    } = options;
  
    // 驗證輸入元素
    if (!(element instanceof HTMLCanvasElement) && !(element instanceof HTMLImageElement)) {
      return Promise.reject(new Error('輸入必須是 <canvas> 或 <img> 元素'));
    }
  
    return new Promise((resolve, reject) => {
      // 處理 <canvas> 元素
      if (element instanceof HTMLCanvasElement) {
        element.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('無法從 <canvas> 生成 Blob'));
            }
            const file = new File([blob], `${fileName}.${format.split('/')[1]}`, { type: format });
            resolve({ file, blob });
          },
          format,
          quality
        );
      }
      // 處理 <img> 元素
      else if (element instanceof HTMLImageElement) {
        // 確保圖片已加載
        if (!element.complete || element.naturalWidth === 0) {
          return reject(new Error('圖片尚未加載完成或無效'));
        }
  
        // 創建臨時 Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = element.naturalWidth;
        canvas.height = element.naturalHeight;
  
        // 處理跨域問題
        try {
          ctx.drawImage(element, 0, 0);
        } catch (err) {
          return reject(new Error('無法繪製圖片到 Canvas，可能存在跨域問題'));
        }
  
        // 從 Canvas 生成 Blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('無法從 <img> 生成 Blob'));
            }
            const file = new File([blob], `${fileName}.${format.split('/')[1]}`, { type: format });
            resolve({ file, blob });
          },
          format,
          quality
        );
      }
    });
  };