// api/index.js
import axios from 'axios';
import { useAuthStore } from '../stores/auth';



const modelsFileName = ['cutpaste.yaml','mode1.yaml','mode2.yaml','anomalydiffusion.yaml']




// 設置基礎配置（可根據需求調整）
const apiClient = axios.create({
  baseURL: 'http://192.168.50.94:6060/gdai/v1/api', // 替換為你的 API 基礎路徑
  timeout: 500000, // 請求超時
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  },
});

// 統一錯誤處理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    // 可以在這裡統一處理錯誤，例如顯示通知
    alert(error)
    return Promise.reject(error);
  }
);

// 定義具體的 API 方法
export const getModelYaml = async (aiModel) => {
    try {
        const response = await apiClient.get('/algorithms/configs/base/download', {
          params: {
            ai_model: aiModel, // 動態傳入 ai_model 參數
          },
        });
        console.log( 'aiModel',aiModel)
        return response.data;
      } catch (error) {
        throw new Error(`Failed to download base config for ${aiModel}: ${error.message}`);
      }
};

// 新增的 API 方法：編輯 cutPasteGenerator 配置
export const editConfig = async (yamlData, apiModelName, tokenType, accessToken) => {
  try {
    const response = await apiClient.post(
      `/algorithms/configs/${apiModelName}/edit`,
      yamlData, // 傳入的 YAML 數據（作為字符串）
      {
        headers: {
          'Content-Type': 'application/x-yaml', // 根據 cURL，設置為 application/x-yaml
          'Accept': 'application/json',
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(`Failed to edit ${apiModelName} config: ${error.message}`);
  }
};

// 新增的 API 方法：發送圖片生成請求
export const generateCutPasteImage = async (imageFile, drawBboxes, tokenType, accessToken) => {
  try {
    // 創建 FormData 對象
    const formData = new FormData();
    formData.append('draw_bboxes', drawBboxes); // 添加 draw_bboxes 字段
    formData.append('img', imageFile); // 添加圖片文件

    const response = await apiClient.post(
      '/cutpasteGenerator/generator',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 設置為 multipart/form-data
          'Accept': 'application/json',
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );
    // 提取 cutpaste_outputDir
    const message = response.data?.message;
    if (!message || typeof message !== 'string') {
      throw new Error('無法從響應中提取 message');
    }

    // 假設 message 格式為 "Output images are saved in users/cpc8/result/cutpaste_outputDir"
    const pathParts = message.split('/');
    const cutpasteOutputDir = pathParts[pathParts.length - 1]; // 提取最後一部分 "cutpaste_outputDir"

    return cutpasteOutputDir;
    } catch (error) {
      throw new Error(`Failed to generate cutPaste image: ${error.message}`);
    }
};

// 新增的 API 方法：生成 Shape Mode1
export const generateShapeMode1 = async (imageFile, drawBboxes, tokenType, accessToken) => {
  try {
    // 創建 FormData 對象
    const formData = new FormData();
    formData.append('img', imageFile); // 添加圖片文件

    const response = await apiClient.post(
      '/shapeGenerator/mode1/generator',
      formData,
      {
        params: {
          draw_bboxes: drawBboxes, // 動態傳入 draw_bboxes 參數
        },
        headers: {
          'Content-Type': 'multipart/form-data', // 設置為 multipart/form-data
          'Accept': 'application/json', // 期待 JSON 響應
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );
    // 提取 Shape Mode1_outputDir
    const message = response.data?.message;
    // 假設 message 格式為 "Output images are saved in users/cpc8/result/mode1_outputDir"
    const pathParts = message.split('/');
    console.log("pathParts :", pathParts)
    const shapeOutputDir = pathParts[pathParts.length - 1]; // 提取最後一部分 "cutpaste_outputDir"

    return shapeOutputDir;
    } catch (error) {
      throw new Error(`Failed to generate mode1 image: ${error.message}`);
    }
};

// 新增的 API 方法：生成 Shape Mode2
export const generateShapeMode2 = async (imageFile, maskFile, drawBboxes, tokenType, accessToken) => {
  try {
    // 創建 FormData 對象
    const formData = new FormData();
    formData.append('img', imageFile); // 添加圖片文件
    formData.append('mask', maskFile); // 添加遮罩文件

    const response = await apiClient.post(
      '/shapeGenerator/mode2/generator',
      formData,
      {
        params: {
          draw_bboxes: drawBboxes, // 動態傳入 draw_bboxes 參數
        },
        headers: {
          'Content-Type': 'multipart/form-data', // 設置為 multipart/form-data
          'Accept': 'application/json', // 期待 JSON 響應
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );

      // 提取 Shape Mode1_outputDir
      const message = response.data?.message;
      // 假設 message 格式為 "Output images are saved in users/cpc8/result/mode2_outputDir"
      const pathParts = message.split('/');
      console.log("pathParts :", pathParts)
      const shapeOutputDir = pathParts[pathParts.length - 1]; // 提取最後一部分 "mode2_outputDir"

    return shapeOutputDir; // 返回響應數據
  } catch (error) {
    throw new Error(`Failed to generate shape mode2: ${error.message}`);
  }
};

// // 新增的 API 方法：上傳圖片和遮罩
export const uploadImages = async (imageFiles, maskFiles, groupName, tokenType, accessToken) => {
  try {
    // 創建 FormData 對象
    const formData = new FormData();
    
    // 添加多個圖片文件
    imageFiles.forEach(file => {
      formData.append('image', file);
    });
    
    // 添加多個遮罩文件
    maskFiles.forEach(file => {
      formData.append('mask', file);
    });
    console.log("imageFiles : ",imageFiles)
    console.log("maskFiles : ",maskFiles)
    
    console.log("formData : ",formData)
    const response = await apiClient.post(
      '/upload_images',
      formData,
      {
        params: {
          groupName: groupName, // 動態傳入 groupName 參數
        },
        headers: {
          'Content-Type': 'multipart/form-data', // 設置為 multipart/form-data
          'Accept': 'application/json', // 期待 JSON 響應
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );
    const message = response.data.upload_id;
    return message; // 返回響應數據
  } catch (error) {
    throw new Error(`Failed to upload images: ${error.message}`);
  }
};

// 新增的 API 方法：載入 Diffusion 模型
export const loadDiffusionModel = async (tokenType, accessToken) => {
  try {
    const response = await apiClient.post(
      '/diffusionGenerator/loadModel',
      null, // 無需發送數據主體
      {
        headers: {
          'Accept': 'application/json', // 期待 JSON 響應
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );

    return response.data; // 返回響應數據
  } catch (error) {
    throw new Error(`Failed to load diffusion model: ${error.message}`);
  }
};

// 修正後的 API 方法：生成 Diffusion 數據
export const generateDiffusion = async (drawBboxes, uploadId, tokenType, accessToken) => {
  try {
    const response = await apiClient.post(
      '/diffusionGenerator/generator', // 完整路徑
      null, // 明確指定無數據主體
      {
        params: {
          draw_bboxes: drawBboxes, // 查詢參數
          upload_id: uploadId, // 查詢參數
        },
        headers: {
          'Accept': 'application/json', // 期待 JSON 響應
          'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
        },
      }
    );
    // 提取 diffusion_outputDir
    const message = response.data?.message;
    // 假設 message 格式為 "Output images are saved in users/cpc8/result/diffusion_outputDir"
    const pathParts = message.split('/');
    console.log("pathParts :", pathParts)
    const diffusionOutputDir = pathParts[pathParts.length - 1]; // 提取最後一部分 "diffusion_outputDir"

    return diffusionOutputDir; // 返回響應數據
  } catch (error) {
    throw new Error(`Failed to generate diffusion: ${error.message}`);
  }
};


// 新增的 API 方法：獲取結果目錄並提取 _outputDir
export const getResultDir = async (tokenType, accessToken) => {
  try {
    const response = await apiClient.get('/get_result_dir', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to get result dir: ${error.message}`);
  }
};

// 新增的 API 方法：獲取結果數據
export const getResultData = async (folderName, tokenType, accessToken) => {
  try {
    const response = await apiClient.get('/get_result_data', {
      params: {
        folder_name: folderName, // 動態傳入 folder_name 參數
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to get result data: ${error.message}`);
  }
};

// 新增的 API 方法：獲取圖片數據
export const reviewResultData = async (imagePath, tokenType, accessToken) => {
  try {
    const response = await apiClient.get('/review_result_data', {
      params: {
        image_path: imagePath, // 動態傳入 image_path 參數，axios 會自動進行 URL 編碼
      },
      headers: {
        'Accept': 'application/json', // 雖然響應是圖片，但這裡保留 Accept 頭部
        'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
      },
      responseType: 'blob', // 設置響應類型為 blob，以便處理圖片數據
    });

    return response.data; // 返回 Blob 對象
  } catch (error) {
    throw new Error(`Failed to review result data: ${error.message}`);
  }
};

// 新增的 API 方法：下載結果文件
export const downloadResult = async (folderPath, tokenType, accessToken) => {
  try {
    const response = await apiClient.get('/download_result', {
      params: {
        folder_path: folderPath, // 動態傳入 folder_path 參數
      },
      headers: {
        'Accept': 'application/json', // 可選，雖然響應是 ZIP 文件
        'Authorization': `${tokenType} ${accessToken}`, // 動態組合 Authorization
      },
      responseType: 'blob', // 設置響應類型為 blob，以便處理 ZIP 文件
    });

    // 從響應頭中提取文件名（如果需要的話）
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'downloaded_file.zip'; // 預設文件名
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1]; // 提取例如 "cutpaste_outputDir_20250317170510.zip"
      }
    }

    return { blob: response.data, filename }; // 返回 Blob 和文件名
  } catch (error) {
    throw new Error(`Failed to download result: ${error.message}`);
  }
};
// 根據需要添加更多 API 方法