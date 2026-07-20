<script setup>
import { ref,onMounted,nextTick} from 'vue'

const imageDataUrl = ref(null)
const imageUrl = ref(null)
const drawnImageUrl = ref(null)
const imageWithDrawingUrl = ref(null)
const controlStrenthNumber = ref(0)
const stepsNumber = ref(0)
const guidanceScaleNumber = ref(0)
const seedNumber = ref(-1)
const shareAttentionStepNumber = ref(0)
const adainWeightNumber = ref(0)
const referenceMaskRefine = ref(false)
const enableShapeControl = ref(false)
const useInpainting = ref(false)
const shareAttention = ref(false)
const energyFunction = ref(false)
const adaptiveMask = ref(false)

const display = ref('none')
const modelChooser = ref(1)

const canvasDisplay = ref('none')
const canvasChooser = ref(false)

//讀取圖片顯示
const onFileChange = (event) => {
const file = event.target.files[0]
if (file && file.type.startsWith('image/')) {
  const reader = new FileReader()
  reader.onload = (e) => {
    imageDataUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
// } else {
//   imageDataUrl.value = null
  }
}
const triggerFileInput = () => {
  document.querySelector('.file-input').click()
}

const openCanvas = () => {
  canvasDisplay.value = "block"
  clearCanvas()
}
const closeCanvas = () => {
  canvasDisplay.value = "none"
}


//參數條

function chooseModel(event) {
  modelChooser.value = event
}

function closeParamBlock(){
  display.value = display.value === 'block' ? 'none' : 'block'
}
const canvas = ref(null);
const image = ref(null)
const ctx = ref(null);
const drawing = ref(false);
const strokeColor = ref('#15DCDC');
const lineWidth = ref(5);
const opacity = ref(1.05);

onMounted(() => {
  const canvasEl = canvas.value;
  const canvasArea = canvasEl.parentElement; // 獲取父元素
  
  if (canvasEl && canvasArea) {
    // 設置 canvas 的 CSS 大小
    // canvasEl.style.width = '100%';
    // canvasEl.style.height = '100%';
    
    
    const computedStyle = getComputedStyle(canvasArea);
    const width = parseInt(computedStyle.width, 10);
    const height = parseInt(computedStyle.height, 10);
    const scale = window.devicePixelRatio || 1; // 設備像素比
    canvasEl.width = width * scale;
    canvasEl.height = height * scale;
    ctx.value = canvasEl.getContext('2d');
    ctx.value.scale(scale, scale); // 按比例缩放

    console.log('Canvas initialized with width:', width, 'and height:', height); // Debugging line
  } else {
    console.error('Canvas element or canvas-area element is null');
  }
});

// 取得滑鼠相對 Canvas 的位置
const getMousePos = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // 缩放因子 X
  const scaleY = canvas.height / rect.height; // 缩放因子 Y
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
};
const startDrawing = (event) => {
  drawing.value = true;
  const pos = getMousePos(canvas.value, event);
  ctx.value.beginPath();
  ctx.value.moveTo(pos.x, pos.y);
  console.log('Started drawing at:', pos.x, pos.y); // Debugging line
};

const draw = (event) => {
  if (drawing.value) {
    const pos = getMousePos(canvas.value, event);
    ctx.value.strokeStyle = strokeColor.value;
    ctx.value.lineWidth = lineWidth.value;
    ctx.value.globalAlpha = opacity.value;
    ctx.value.lineTo(pos.x, pos.y);
    ctx.value.stroke();
    console.log('Drawing at:', pos.x, pos.y); // Debugging line
  }
};
const stopDrawing = () => {
  drawing.value = false;
  console.log('Stopped drawing'); // Debugging line
};

const clearCanvas = () => {
  const canvasEl = canvas.value;
  ctx.value.clearRect(0, 0, canvasEl.width, canvasEl.height);
  console.log('Canvas cleared'); // Debugging line
};

const saveCanvas = () => {
  const canvasEl = canvas.value;
  const saveCanvas = document.createElement('canvas');
  saveCanvas.width = canvasEl.width;
  saveCanvas.height = canvasEl.height;
  const saveCtx = saveCanvas.getContext('2d');
  console.log('canvasEl.width:', canvasEl.width); // Debugging line
  console.log('canvasEl.height:', canvasEl.height); // Debugging line
  // Fill with black background
  saveCtx.fillStyle = 'black';
  saveCtx.fillRect(0, 0, saveCanvas.width, saveCanvas.height);

  // Draw the original canvas content
  saveCtx.drawImage(canvasEl, 0, 0);

  // Generate download link
  const dataURL = saveCanvas.toDataURL('image/png');
  console.log('Data URL:', dataURL); // Debugging line
  if (dataURL) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';

    // Ensure the link is added to the document and then clicked
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Download link clicked'); // Debugging line
  } else {
    console.error('Failed to generate the Data URL.');
  }
  console.log('Canvas saved'); // Debugging line
};
const extractDrawnArea = ()=> {
      const canvasEl = canvas.value;
      const ctx = canvasEl.getContext('2d');

      const drawnArea = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      const drawnCanvas = document.createElement('canvas');
      drawnCanvas.width = canvasEl.width;
      drawnCanvas.height = canvasEl.height;
      const drawnCtx = drawnCanvas.getContext('2d');
      drawnCtx.putImageData(drawnArea, 0, 0);

      drawnImageUrl.value = drawnCanvas.toDataURL('image/png');
      console.log('drawnImageUrl  :',drawnImageUrl.value)
}
const extractImageWithDrawing = () => {
  nextTick(()=>{
    const imageEl = image.value;
    const canvasEl = canvas.value;
    const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
      // const imageEl = image.value;
      // const canvasEl = canvas.value;
      // const ctx = canvasEl.getContext('2d');

      // 创建一个新的 Canvas 来绘制结果
      const resultCanvas = document.createElement('canvas');
      resultCanvas.width = canvasEl.width;
      resultCanvas.height = canvasEl.height;
      const resultCtx = resultCanvas.getContext('2d', { willReadFrequently: true });

      // 将图像绘制到新的 Canvas 上
      resultCtx.drawImage(imageEl, 0, 0);

      // 获取绘制的区域
      const drawnArea = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      const data = drawnArea.data;

      // 创建一个新的 ImageData 对象来存储被绘制到的图像部分
      const extractedImageData = resultCtx.createImageData(canvasEl.width, canvasEl.height);

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          // 如果在 Canvas 上有绘制，则保留对应的图像像素
          // extractedImageData.data[i] = resultCtx.getImageData((i / 4) % canvasEl.width, Math.floor((i / 4) / canvasEl.width), 1, 1).data[0];
          // extractedImageData.data[i + 1] = resultCtx.getImageData((i / 4) % canvasEl.width, Math.floor((i / 4) / canvasEl.width), 1, 1).data[1];
          // extractedImageData.data[i + 2] = resultCtx.getImageData((i / 4) % canvasEl.width, Math.floor((i / 4) / canvasEl.width), 1, 1).data[2];
          // extractedImageData.data[i + 3] = resultCtx.getImageData((i / 4) % canvasEl.width, Math.floor((i / 4) / canvasEl.width), 1, 1).data[3];
          const x = (i / 4) % canvasEl.width
          const y = Math.floor((i / 4) / canvasEl.width)
          const pixel = resultCtx.getImageData(x, y, 1, 1).data
          extractedImageData.data[i] = pixel[0]
          extractedImageData.data[i + 1] = pixel[1]
          extractedImageData.data[i + 2] = pixel[2]
          extractedImageData.data[i + 3] = pixel[3]
        } else {
          // 否则将像素设为透明
          extractedImageData.data[i + 3] = 0;
        }
      }

      // 将提取的图像数据放入新的 Canvas
      resultCtx.putImageData(extractedImageData, 0, 0);

      // 保存提取后的图像
      imageWithDrawingUrl.value = resultCanvas.toDataURL('image/png');
      console.log('imageWithDrawingUrl  :',imageWithDrawingUrl.value)
    })
    }
  





</script>


<template>
  <div class="start-container">
    <div class="upload-container">
          <div class="image-preview">
            <div id="canvas-container" class="canvas-preview-default" :style="{display:canvasDisplay}">
              <input type="file" @change="onFileChange" accept="image/*" hidden class="file-input"/>
              <img class="image-preview-default" ref="image" :src="imageDataUrl" alt="Uploaded Image" @load="openCanvas" />
              <canvas id="canvas-area"  ref="canvas"  @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing" ></canvas>
              <button id="clearButton" @click="clearCanvas">Clear</button>
              <button id="saveButton" @click="saveCanvas">Save</button>
            </div>
              <!-- <img v-if="imageDataUrl===null" src="../../../public/cry_1.jpg" alt="Uploaded Image" @load="closeCanvas"/> -->
          </div>
          <button @click="triggerFileInput"  class="file-input-button">上傳照片</button>
          <button @click="extractDrawnArea">Extract Drawn Area</button>
          <button @click="extractImageWithDrawing">Extract Image with Drawing</button>
        </div>
      </div>
  </template>

<style scoped>
.start-container {
  position: relative;
  min-width: 100%;
  min-height: 100%;
}

.upload-container {
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid rgb(214, 223, 223);
}

.image-preview {
  border: 2px solid rgb(222, 20, 70);
  min-width: 100%;
  min-height: 100%;
  position: relative;
}
.image-preview-default{
  position: absolute;
  width:100%;
  height:100%
}

.canvas-preview-default {
  width: 100%;
  height: 100%;
  border: 2px solid rgb(0, 223, 223);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}

#canvas-area {
  position: absolute;
  border: 2px solid rgb(37, 13, 133);
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.file-input-button {
  margin-top: 7px;
  position: absolute;
  top: 1;
  left: 50%;
  transform: translate(-50%);
  z-index: 7;
}

#clearButton {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 7;
}

#saveButton {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 7;
}
</style>