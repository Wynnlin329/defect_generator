<script setup>
import { ref,nextTick,onMounted, onBeforeUnmount,reactive,computed,watch } from 'vue'
import {getModelYaml,getResultData,generateCutPasteImage,editConfig,getResultDir,reviewResultData,downloadResult,generateShapeMode1,generateShapeMode2,uploadImages,loadDiffusionModel,generateDiffusion} from '../../api/index.js'
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import { useApiData } from '../../stores/apiData';
import jsYaml from 'js-yaml';
import {elementToFileAndBlob} from '../../stores/elementToBlob.js'
import {useConfigData} from '../../stores/configData.js'
import { mapClientPointToBitmap } from '../../utils/canvasGeometry'
import { releaseObjectUrl, replaceObjectUrl } from '../../utils/objectUrl'


//初始化參數面板
const isInitialized = reactive({ value: false });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const configData = useConfigData();
const {fetchConfigError,downloadModelConfig,initializePromise} = configData;

(async () => {
      await initializePromise; // 等待 downloadModelConfig 更新完成
      Object.assign(modelConfigs.cutPaste, {
        outputDir: downloadModelConfig.cutPaste.output_dir || '',
        dataDir: downloadModelConfig.cutPaste.data_dir || '',
        numImages: downloadModelConfig.cutPaste.generation?.num_images || 3,
        randomSeed: downloadModelConfig.cutPaste.generation?.random_seed || 0,
        areaRatio: downloadModelConfig.cutPaste.generation?.params?.cutpaste_normal?.area_ratio || [0.05, 0.05],
        aspectRatio: downloadModelConfig.cutPaste.generation?.params?.cutpaste_normal?.aspect_ratio || 0.3,
        width: downloadModelConfig.cutPaste.generation?.params?.cutpaste_scar?.width || [6, 6],
        height: downloadModelConfig.cutPaste.generation?.params?.cutpaste_scar?.height || [15, 15],
        rotation: downloadModelConfig.cutPaste.generation?.params?.cutpaste_scar?.rotation || [5, 5],
        drawingPrimitives: downloadModelConfig.cutPaste.drawing_primitives || []
      });

      Object.assign(modelConfigs.mode1,{
        drawingPrimitives: downloadModelConfig.geometricShapes_1.drawing_primitives,
        numImages: downloadModelConfig.geometricShapes_1.generation.num_images,
        kernelBoundaries: downloadModelConfig.geometricShapes_1.generation.params.draw_multiple_polygons.kernel_boundaries,
        transformParams:  downloadModelConfig.geometricShapes_1.generation.params.draw_stripes.transform_params,
        maxKernelSize:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.max_kernel_size,
        maxRadRatio:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.max_rad_ratio,
        minKernelSize:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.min_kernel_size,
        minRadRatio:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.min_rad_ratio,
        randomSeed:  downloadModelConfig.geometricShapes_1.generation.random_seed
      });
      Object.assign(modelConfigs.mode2,{
        drawingPrimitives: downloadModelConfig.geometricShapes_2.drawing_primitives,
        numImages: downloadModelConfig.geometricShapes_2.generation.num_images,
        kernelBoundaries: downloadModelConfig.geometricShapes_2.generation.params.draw_multiple_polygons.kernel_boundaries,
        transformParams: downloadModelConfig.geometricShapes_2.generation.params.draw_stripes.transform_params,
        maxKernelSize: downloadModelConfig.geometricShapes_2.generation.params.generate_background.max_kernel_size,
        maxRadRatio: downloadModelConfig.geometricShapes_2.generation.params.generate_background.max_rad_ratio,
        minKernelSize: downloadModelConfig.geometricShapes_2.generation.params.generate_background.min_kernel_size,
        minRadRatio: downloadModelConfig.geometricShapes_2.generation.params.generate_background.min_rad_ratio,
        nbLines: downloadModelConfig.geometricShapes_2.generation.params.draw_lines.nb_lines,
        randomSeed: downloadModelConfig.geometricShapes_2.generation.random_seed,
        outputDir: downloadModelConfig.geometricShapes_2.output_dir
      });
      Object.assign(modelConfigs.anomalydiffusion,{
        numImages: downloadModelConfig.anomalyDiffusion.generation.num_images,
        randomSeed: downloadModelConfig.anomalyDiffusion.generation.random_seed,
        batchSize: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.batch_size,
        sampleName: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.sample_name,
        anomalyName: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.anomaly_name,
        adaptiveMask: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.adaptive_mask,
        drawingPrimitives:downloadModelConfig.anomalyDiffusion.drawing_primitives
      });


      // 更新 modelSliders cutPaste
      modelSliders.cutPaste.numImages.rangeValue = modelConfigs.cutPaste.numImages;
      modelSliders.cutPaste.randomSeed.rangeValue = modelConfigs.cutPaste.randomSeed;
      modelSliders.cutPaste.areaRatio.rangeValue = modelConfigs.cutPaste.areaRatio[0];
      modelSliders.cutPaste.aspectRatio.rangeValue = modelConfigs.cutPaste.aspectRatio;
      modelSliders.cutPaste.width.rangeValue = modelConfigs.cutPaste.width[0];
      modelSliders.cutPaste.height.rangeValue = modelConfigs.cutPaste.height[0];
      modelSliders.cutPaste.rotation.rangeValue = modelConfigs.cutPaste.rotation[0];

      // 更新 modelSliders.geometricShapes_1
      modelSliders.geometricShapes_1.numImages.rangeValue = modelConfigs.mode1.numImages;
      modelSliders.geometricShapes_1.randomSeed.rangeValue = modelConfigs.mode1.randomSeed;
      modelSliders.geometricShapes_1.kernelSize.rangeValue = modelConfigs.mode1.minKernelSize;
      modelSliders.geometricShapes_1.radRatio.rangeValue = modelConfigs.mode1.minRadRatio;
      modelSliders.geometricShapes_1.kernelBoundariesLeft.rangeValue = modelConfigs.mode1.kernelBoundaries[0];
      modelSliders.geometricShapes_1.kernelBoundariesRight.rangeValue = modelConfigs.mode1.kernelBoundaries[1];
      modelSliders.geometricShapes_1.transformParamsLeft.rangeValue = modelConfigs.mode1.transformParams[0];
      modelSliders.geometricShapes_1.transformParamsRight.rangeValue = modelConfigs.mode1.transformParams[1];

      // 更新 modelSliders mode2
      modelSliders.geometricShapes_2.numImages.rangeValue = modelConfigs.mode2.numImages;
      modelSliders.geometricShapes_2.randomSeed.rangeValue = modelConfigs.mode2.randomSeed;
      modelSliders.geometricShapes_2.kernelSize.rangeValue = modelConfigs.mode2.minKernelSize;
      modelSliders.geometricShapes_2.radRatio.rangeValue = modelConfigs.mode2.minRadRatio;
      modelSliders.geometricShapes_2.kernelBoundariesLeft.rangeValue = modelConfigs.mode2.kernelBoundaries[0];
      modelSliders.geometricShapes_2.kernelBoundariesRight.rangeValue = modelConfigs.mode2.kernelBoundaries[1];
      modelSliders.geometricShapes_2.transformParamsLeft.rangeValue = modelConfigs.mode2.transformParams[0];
      modelSliders.geometricShapes_2.transformParamsRight.rangeValue = modelConfigs.mode2.transformParams[1];
      modelSliders.geometricShapes_2.nbLines.rangeValue = modelConfigs.mode2.nbLines;
      // 更新 modelSliders TFIDG

      // 更新 modelSliders AD
      modelSliders.anomalyDiffusion.numImages.rangeValue = modelConfigs.anomalydiffusion.numImages;
      modelSliders.anomalyDiffusion.randomSeed.rangeValue = modelConfigs.anomalydiffusion.randomSeed;


      isInitialized.value = true; // 標記初始化完成
    })();



//登入ref
const authStore = useAuthStore();
// const configData = ref(null)
const error = ref(null);
const isLoading = ref(false)
const isDownloading =ref(false)
const showDialog = ref(false);
const message = ref(null) 
//參數表ref
// const apiData = useApiData();
// const {imageUploadFileName,downloadModelConfig,modelConfigs,modelConfigsToAPI,valueToArray,modelChooser,setModelChooser} = apiData

const modelsFileName = ['cutpaste.yaml','mode1.yaml','mode2.yaml','anomalydiffusion.yaml']

const imageUploadFileName = ref(null)
const uploadId = ref(null)
const resultFolderName = ref(null)
const resultFolderImage = ref([])
const outputResultImageUrl = ref(null)

const selectedSampleName = ref('zipper'); // 當前選擇的 sample_name
const selectedAnomalyName = ref('rough'); // 當前選擇的 anomaly_name





const modelConfigs = reactive({
  
  TFIDG:{
    controlStrenthNumber: 0,
    stepsNumber : 0,
    guidanceScaleNumber : 0,
    seedNumber: -1,
    shareAttentionStepNumber : 0,
    adainWeightNumber : 0,
    referenceMaskRefine : false,
    enableShapeControl : false,
    useInpainting : false,
    shareAttention : false,
    energyFunction : false,
    adaptiveMask : false
    },
  cutPaste:{
    outputDir: downloadModelConfig.cutPaste.output_dir , //固定
    dataDir: downloadModelConfig.cutPaste.data_dir, //固定
    numImages: downloadModelConfig.cutPaste.generation.num_images,   //預設3   範圍1~10 正整數
    randomSeed: downloadModelConfig.cutPaste.generation.random_seed,  //預設0   可填數字
    areaRatio: downloadModelConfig.cutPaste.generation.params.cutpaste_normal.area_ratio,  //預設0.05  0.02~0.15   選擇後都發一樣的
    aspectRatio: downloadModelConfig.cutPaste.generation.params.cutpaste_normal.aspect_ratio,  //大於0 小於1  小數點兩位
    width: downloadModelConfig.cutPaste.generation.params.cutpaste_scar.width, // 取預設值 2~16 使用者選擇後發兩個相同數值，但最大最小保持2~16
    height: downloadModelConfig.cutPaste.generation.params.cutpaste_scar.height, //同上
    rotation: downloadModelConfig.cutPaste.generation.params.cutpaste_scar.rotation, //同上,
    drawingPrimitives: downloadModelConfig.cutPaste.drawing_primitives
  },
  mode1:{
    drawingPrimitives: downloadModelConfig.geometricShapes_1.drawing_primitives,
    numImages: downloadModelConfig.geometricShapes_1.generation.num_images,
    kernelBoundaries: downloadModelConfig.geometricShapes_1.generation.params.draw_multiple_polygons.kernel_boundaries,
    transformParams:  downloadModelConfig.geometricShapes_1.generation.params.draw_stripes.transform_params,
    maxKernelSize:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.max_kernel_size,
    maxRadRatio:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.max_rad_ratio,
    minKernelSize:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.min_kernel_size,
    minRadRatio:  downloadModelConfig.geometricShapes_1.generation.params.generate_background.min_rad_ratio,
    randomSeed:  downloadModelConfig.geometricShapes_1.generation.random_seed,
    outputDir: downloadModelConfig.geometricShapes_1.output_dir
    },
  mode2: {
    drawingPrimitives: downloadModelConfig.geometricShapes_2.drawing_primitives,
    numImages: downloadModelConfig.geometricShapes_2.generation.num_images,
    kernelBoundaries: downloadModelConfig.geometricShapes_2.generation.params.draw_multiple_polygons.kernel_boundaries,
    transformParams: downloadModelConfig.geometricShapes_2.generation.params.draw_stripes.transform_params,
    maxKernelSize: downloadModelConfig.geometricShapes_2.generation.params.generate_background.max_kernel_size,
    maxRadRatio: downloadModelConfig.geometricShapes_2.generation.params.generate_background.max_rad_ratio,
    minKernelSize: downloadModelConfig.geometricShapes_2.generation.params.generate_background.min_kernel_size,
    minRadRatio: downloadModelConfig.geometricShapes_2.generation.params.generate_background.min_rad_ratio,
    nbLines: downloadModelConfig.geometricShapes_2.generation.params.draw_lines.nb_lines,
    randomSeed: downloadModelConfig.geometricShapes_2.generation.random_seed,
    outputDir: downloadModelConfig.geometricShapes_2.output_dir
  },
  anomalydiffusion:{
    numImages: downloadModelConfig.anomalyDiffusion.generation.num_images,
    randomSeed: downloadModelConfig.anomalyDiffusion.generation.random_seed,
    batchSize: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.batch_size,
    sampleName: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.sample_name,
    anomalyName: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.anomaly_name,
    adaptiveMask: downloadModelConfig.anomalyDiffusion.generation.params.anomaly_diffusion.adaptive_mask,
    drawingPrimitives:downloadModelConfig.anomalyDiffusion.drawing_primitives
    }
  }
)

const modelConfigsToAPI = computed(() => {
  console.log('Computing modelConfigsToAPI with anomalydiffusion :', JSON.stringify(modelConfigs.anomalydiffusion, null, 2));
  return {
    TFIDG: {
      controlStrenthNumber: 0,
      stepsNumber: 0,
      guidanceScaleNumber: 0,
      seedNumber: -1,
      shareAttentionStepNumber: 0,
      adainWeightNumber: 0,
      referenceMaskRefine: false,
      enableShapeControl: false,
      useInpainting: false,
      shareAttention: false,
      energyFunction: false,
      adaptiveMask: false
    },
    cutPaste: {
      output_dir: modelConfigs.cutPaste.outputDir,
      data_dir: modelConfigs.cutPaste.dataDir,
      generation: {
        num_images: Number(modelConfigs.cutPaste.numImages), // 轉為數字
        random_seed: Number(modelConfigs.cutPaste.randomSeed), // 轉為數字
        params: {
          cutpaste_normal: {
            area_ratio: modelConfigs.cutPaste.areaRatio, // 假設這是一個陣列，可能需要進一步處理
            aspect_ratio: Number(modelConfigs.cutPaste.aspectRatio) // 轉為數字
          },
          cutpaste_scar: {
            width: modelConfigs.cutPaste.width.map(Number), // 陣列轉為數字
            height: modelConfigs.cutPaste.height.map(Number), // 陣列轉為數字
            rotation: modelConfigs.cutPaste.rotation.map(Number) // 陣列轉為數字
          }
        }
      },
      drawing_primitives: [
        'cutpaste_scar'
      ]
    },
    geometricShapes_1: {
      drawing_primitives: [
        'draw_lines',
        'draw_polygon',
        'draw_multiple_polygons',
        'draw_ellipses',
        'draw_star',
        'draw_checkerboard',
        'draw_stripes',
        'draw_cube',
        'gaussian_noise'
      ],
      generation: {
        num_images: Number(modelConfigs.mode1.numImages), // 轉為數字
        params: {
          draw_multiple_polygons: {
            kernel_boundaries: modelConfigs.mode1.kernelBoundaries.map(Number) // 陣列轉為數字
          },
          draw_stripes: {
            transform_params: modelConfigs.mode1.transformParams.map(Number) // 陣列轉為數字
          },
          generate_background: {
            max_kernel_size: Number(modelConfigs.mode1.maxKernelSize), // 轉為數字
            max_rad_ratio: Number(modelConfigs.mode1.maxRadRatio), // 轉為數字
            min_kernel_size: Number(modelConfigs.mode1.maxKernelSize), // 轉為數字
            min_rad_ratio: Number(modelConfigs.mode1.maxRadRatio) // 轉為數字
          }
        },
        random_seed: Number(modelConfigs.mode1.randomSeed) // 轉為數字
      },
      output_dir: 'result/mode1_geometry_outputDir'
    },
    geometricShapes_2: {
      output_dir: 'result/mode2_geometry_outputDir',
            generation: {
                num_images: Number(modelConfigs.mode2.numImages),
                random_seed: Number(modelConfigs.mode2.randomSeed),
                params: {
                    generate_background: {
                        min_kernel_size: Number(modelConfigs.mode2.maxKernelSize),
                        max_kernel_size: Number(modelConfigs.mode2.maxKernelSize),
                        min_rad_ratio: Number(modelConfigs.mode2.maxRadRatio),
                        max_rad_ratio: Number(modelConfigs.mode2.maxRadRatio)
                    },
                    draw_lines: {
                        nb_lines: Number(modelConfigs.mode2.nbLines)
                    },
                    draw_stripes: {
                        transform_params: modelConfigs.mode2.transformParams.map(Number)
                    },
                    draw_multiple_polygons: {
                        kernel_boundaries: modelConfigs.mode2.kernelBoundaries.map(Number)
                    }
                }
            },
            drawing_primitives: [
              'draw_lines',
              'gaussian_noise'
            ]
    },
    anomalyDiffusion: {
      output_dir: 'result/diffusion_outputDir',
      anomalydiffusion_config: 'lib/anomalydiffusion/configs/latent-diffusion/txt2img-1p4B-finetune-encoder+embedding.yaml',
      actual_resume: 'lib/anomalydiffusion/models/ldm/text2img-large/model.ckpt',
      ckpt: 'lib/anomalydiffusion/logs/anomaly-checkpoints/checkpoints',
      generation: {
          num_images: Number(modelConfigs.anomalydiffusion.numImages),
          random_seed: Number(modelConfigs.anomalydiffusion.randomSeed),
          params: {
          anomaly_diffusion: {
            batch_size: Number(modelConfigs.anomalydiffusion.batchSize),
            sample_name: modelConfigs.anomalydiffusion.sampleName,
            anomaly_name: modelConfigs.anomalydiffusion.anomalyName,
            adaptive_mask: modelConfigs.anomalydiffusion.adaptiveMask
            }
          }
        },
      drawing_primitives: [
        'anomaly_diffusion'
      ]
    }
  };
});


const modelSliders = reactive({
  TFIDG: {
    controlStrength: {
      rangeValue: 1,
      min: 0,
      max: 2,
      step: 0.01,
      label: "Control Strength",
      id: 0
    },
    steps: {
      rangeValue: 50,
      min: 1,
      max: 100,
      step: 1,
      label: "Steps",
      id: 1
    },
    guidanceScale: {
      rangeValue: 7.5,
      min: 0,
      max: 30,
      step: 0.1,
      label: "Guidance Scale",
      id: 2
    },
    seed: {
      rangeValue: -1,
      min: -1,
      max: 999999999,
      step: 1,
      label: "Seed",
      id: 3
    },
    shareAttentionStep: {
      rangeValue: 20,
      min: 4,
      max: 50,
      step: 0.1,
      label: "Share Attention Step",
      id: 4
    },
    adainWeight: {
      rangeValue: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Adain Weight",
      id: 5
    }
  },
  cutPaste: {
    numImages: {
      rangeValue: modelConfigs.cutPaste.numImages,
      min: 1,
      max: 10,
      step: 1,
      label: "Num Images",
      id: 0
    },
    randomSeed: {
      rangeValue: modelConfigs.cutPaste.randomSeed,
      min: 0,
      max: 999,
      step: 1,
      label: "Random Seed",
      id: 1
    },
    areaRatio: {
      rangeValue: modelConfigs.cutPaste.areaRatio[0],
      min: 0.02,
      max: 0.15,
      step: 0.01,
      label: "Area Ratio",
      id: 2
    },
    aspectRatio: {
      rangeValue: modelConfigs.cutPaste.aspectRatio,
      min: 0.01,
      max: 0.99,
      step: 0.01,
      label: "Aspect Ratio",
      id: 3
    },
    width: {
      rangeValue: modelConfigs.cutPaste.width[0],
      min: 2,
      max: 16,
      step: 1,
      label: "Width",
      id: 4
    },
    height: {
      rangeValue: modelConfigs.cutPaste.height[0],
      min: 10,
      max: 25,
      step: 1,
      label: "Height",
      id: 5
    },
    rotation: {
      rangeValue: modelConfigs.cutPaste.rotation[0],
      min: -45,
      max: 45,
      step: 1,
      label: "Rotation",
      id: 6
    }
  },
  geometricShapes_1: {
    numImages: {
      rangeValue: modelConfigs.mode1.numImages,
      min: 1,
      max: 10,
      step: 1,
      label: "Num Images",
      id: 1
    },
    randomSeed: {
      rangeValue: modelConfigs.mode1.randomSeed,
      min: 0,
      max: 999,
      step: 1,
      label: "Random Seed",
      id: 2
    },
    kernelSize: {
    rangeValue: modelConfigs.mode1.minKernelSize,
    min: 150,
    max: 500,
    step: 1,
    label: "Kernel Size",
    id: 3
    },
    radRatio: {
    rangeValue: modelConfigs.mode1.minRadRatio,
    min: 0.02,
    max: 0.031,
    step: 0.001,
    label: "Rad Ratio",
    id: 4
    },
    kernelBoundariesLeft: {
    rangeValue:  modelConfigs.mode1.kernelBoundaries[0],
    min: 3,
    max: 10,
    step: 1,
    label: "Kernel Boundaries Left",
    id: 5
    },
    kernelBoundariesRight: {
    rangeValue: modelConfigs.mode1.kernelBoundaries[1],
    min: 2,
    max: 10,
    step: 1,
    label: "Kernel Boundaries Right",
    id: 6
    },
    transformParamsLeft: {
    rangeValue: modelConfigs.mode1.transformParams[0],
    min: 0.05,
    max: 0.15,
    step: 0.01,
    label: "Transform Params Left",
    id: 7
    },
    transformParamsRight: {
    rangeValue: modelConfigs.mode1.transformParams[1],
    min: 0.05,
    max: 0.15,
    step: 0.01,
    label: "Transform Params Right",
    id: 8
    },
  },
  geometricShapes_2: {
    numImages: {
      rangeValue: modelConfigs.mode2.numImages,
      min: 1,
      max: 10,
      step: 1,
      label: "Num Images",
      id: 1
    },
    randomSeed: {
      rangeValue: modelConfigs.mode2.randomSeed,
      min: 0,
      max: 999,
      step: 1,
      label: "Random Seed",
      id: 2
    },
    kernelSize: {
    rangeValue: modelConfigs.mode2.minKernelSize,
    min: 150,
    max: 500,
    step: 1,
    label: "Kernel Size",
    id: 3
    },
    radRatio: {
    rangeValue: modelConfigs.mode2.minRadRatio,
    min: 0.02,
    max: 0.031,
    step: 0.001,
    label: "Rad Ratio",
    id: 4
    },
    kernelBoundariesLeft: {
    rangeValue:  modelConfigs.mode2.kernelBoundaries[0],
    min: 3,
    max: 10,
    step: 1,
    label: "Kernel Boundaries Left",
    id: 5
    },
    kernelBoundariesRight: {
    rangeValue: modelConfigs.mode2.kernelBoundaries[1],
    min: 2,
    max: 10,
    step: 1,
    label: "Kernel Boundaries Right",
    id: 6
    },
    transformParamsLeft: {
    rangeValue: modelConfigs.mode2.transformParams[0],
    min: 0.05,
    max: 0.15,
    step: 0.01,
    label: "Transform Params Left",
    id: 7
    },
    transformParamsRight: {
    rangeValue: modelConfigs.mode2.transformParams[1],
    min: 0.05,
    max: 0.15,
    step: 0.01,
    label: "Transform Params Right",
    id: 8
    },
    nbLines: {
    rangeValue: modelConfigs.mode2.transformParams[1],
    min: 2,
    max: 10,
    step: 1,
    label: "Nb Lines",
    id: 9
    }
  },
  anomalyDiffusion: {
    numImages: {
      rangeValue: modelConfigs.anomalydiffusion.numImages,
      min: 1,
      max: 10,
      step: 1,
      label: "Num Images",
      id: 1
    },
    randomSeed: {
      rangeValue: modelConfigs.anomalydiffusion.randomSeed,
      min: 0,
      max: 999,
      step: 1,
      label: "Random Seed",
      id: 2
    }
  }
});

const cutPasteArrayValue = ['width', 'height' ,'rotation' ,'areaRatio']





const mVTecStructure = ref({
  bottle:['broken_large','broken_small','contamination'],
  cable:['bent_wire','cable_swap','combined','cut_inner_insulation','cut_outer_insulation','missing_cable','missing_wire','poke_insulation'],
  capsule:['crack','faulty_imprint','poke','scratch','squeeze'],
  carpet:['color','cut','hole','metal_contamination','thread'],
  grid:['bent','broken','glue','metal_contamination','thread'],
  hazelnut:['crack','cut','hole','print'],
  leather:['color','cut','fold','glue','poke'],
  metal_nut:['bent','color','flip','scratch'],
  pill:['color','combined','contamination','crack','faulty_imprint','pill_type','scratch'],
  screw:['manipulated_front','scratch_head','scratch_neck','thread_side','thread_top'],
  tile:['crack','glue_strip','gray_stroke','oil','rough'],
  toothbrush:['defective'],
  transistor:['bent_lead','cut_lead','damaged_case','misplaced'],
  wood:['color','combined','hole','liquid','scratch'],
  zipper:['broken_teeth','combined','fabric_border','fabric_interior','rough','split_teeth','squeezed_teeth']
  }
)

// 提取所有的 sample_name 選項
const sampleOptions = Object.keys(mVTecStructure.value);

// 根據選擇的 sample_name 動態計算可用的 anomaly_name 選項
const availableAnomalyOptions = computed(() => {
  return modelConfigs.anomalydiffusion.sampleName ? mVTecStructure.value[modelConfigs.anomalydiffusion.sampleName] : [];
});

// 監聽 sample_name 變化，重置 anomaly_name
modelConfigs.anomalydiffusion.sampleName = ''; // 初始化為空
// watch(modelConfigs.anomalydiffusion.sampleName, (newValue) => {
//   modelConfigs.anomalydiffusion.anomalyName = ''; // 當 sample_name 改變時，重置 anomaly_name
// });


//圖片Ref
const modelChooser = ref('TFIDG')
const display = ref('block')

const imageRefs = ref({});
const canvasRefs = ref({});
const backgroundMaskCanvasRef = ref(null)
const backgroundMaskImageRef = ref(null)
const referenceMaskCanvasRef = ref(null)
const referenceMaskImageRef = ref(null)
const backgroundMaskCanvas = ref(false)
const isMultipleImg = ref(false)
const isHiddenInput = ref(true)

const iconStates = reactive(
{
  background:[
    {
      isHovered:false,
      isActive:false
    },
    {
      isHovered:false,
      isActive:false
    },
    {
      isHovered:false,
      isActive:false
    },
  ],
  reference:[
      {
        isHovered:false,
        isActive:false
      },
      {
        isHovered:false,
        isActive:false
      },
      {
        isHovered:false,
        isActive:false
      },
  ],
  backgroundMask:[
      {
        isHovered:false,
        isActive:false
      }
  ],
  referenceMask:[
      {
        isHovered:false,
        isActive:false
      }
    ]
  }
)

const canvasStates = reactive([
  {
    canvasDisplay:"none",
    imageSrc:null,
    imageEl:null,
    canvasEl:null,
    ctx:null,
    drawing:false,
    strokeColor:'#15DCDC',
    lineWidth:20,
    opacity:0.03,
    maskImageUrl:null,
    imageWithDrawingUrl:null,
    bigImageUrl: null,
    imagePath:null,
    imageName:null,
    imageFile:null,
    imageFileList:[null],
    imageBlob:null,
    maskFile:null,
    maskFileList:[null],
    maskBlob:null
  },
  {
    canvasDisplay:"none",
    imageSrc:null,
    imageEl:null,
    canvasEl:null,
    ctx:null,
    drawing:false,
    strokeColor:'#E5DCDC',
    lineWidth:20,
    opacity:0.03,
    maskImageUrl:null,
    imageWithDrawingUrl:null,
    bigImageUrl: null,
    imagePath:null,
    imageName:null,
    imageFile:null,
    imageFileList:[null],
    imageBlob:null,
    maskFile:null,
    maskFileList:[null],
    maskBlob:null
  }
]);

const maskCanvasStates = reactive([
  {
    maskCanvasDisplay:"none",
    maskImageName:null,    
    maskImageUrl:null,
    canvasEl:null,
    imageEl:null,
    ctx:null,
    file:null,
    blob:null
  },
  { 
    maskCanvasDisplay:"none",
    maskImageName:null,       
    maskImageUrl:null,
    canvasEl:null,
    imageEl:null,
    ctx:null,
    file:null,
    blob:null
  }
])

const modelComponentGroup = reactive({
  needBackground:[
    "TFIDG","cutPaste","geometricShapes_1","geometricShapes_2","anomalyDiffusion"
  ],
  needMask:[
    "TFIDG","geometricShapes_2","anomalyDiffusion"
  ],
  needReference:[
    "TFIDG"
  ],
  needCanvas:[
    "TFIDG","geometricShapes_2"
  ]
})

// 動態設置 ref 的函數
const setImageRef = (index) =>(el) =>{
  if (el) imageRefs.value[index]= el;
  // console.log("imageRefs.value[index]  ",imageRefs.value[index])
  // console.log("el  ",el)
};

const setCanvasRef = (index) => (el) =>{
  if (el) canvasRefs.value[index] = el;
  // console.log("imageRefs.value[index]  ",canvasRefs.value[index])
  // console.log("el  ",el)
} ;



//讀取圖片顯示
const onFileChange = async (index,event) => {
  console.log("event.target.files : ", event.target.files)
  // const file = null
  // if(modelChooser.value == 'anomalyDiffusion'  && event.target.files.length == 1){
  //   file = event.target.files[0]
  //   const fileName=event.target.files[0].name
  //   canvasStates[index].imageName = fileName
  // }else if(modelChooser.value == 'anomalyDiffusion'){
  //   const files = Array.from(event.target.files);
  //   canvasStates[index].imageFileList = files.filter(file => file.type.startsWith('image/')); // 確保是圖片文件
    
  //   return
  // }else{ 
  //   file = event.target.files[0]
  //   const fileName=event.target.files[0].name
  //   canvasStates[index].imageName = fileName
  // }
    const files = Array.from(event.target.files);
    canvasStates[index].imageFileList = files.filter(file => file.type.startsWith('image/')); // 確保是圖片文件
    const file = event.target.files[0]
    const fileName=event.target.files[0].name
    canvasStates[index].imageName = fileName
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = async(e) => {
      // imageDataUrl.value = e.target.result
        canvasStates[index].imageSrc=e.target.result;
        await nextTick();
      // 設置 imageEl 和 canvasEl
      const imageEl = imageRefs.value[index];
      const canvasEl = canvasRefs.value[index];
      canvasStates[index].imageEl = imageEl;
      canvasStates[index].canvasEl = canvasEl;
      if (!imageEl) {
        console.log(`Image ref at index ${index} is not available`);
        return;
      }
      // 等待圖片載入完成
      if (!imageEl.complete) {
        await new Promise((resolve) => {
          imageEl.onload = resolve;
        });
      }
      console.log("index    ", index);
      setupCanvas(canvasStates[index]);
      //將輸入的image轉為file與blob
      extractImageToBlob(canvasStates[index]);
      console.log("imageEl ", imageRefs.value[index]);
      console.log("canvasEl ", canvasRefs.value[index]);
    }
    reader.readAsDataURL(file)
// } else {
//   imageDataUrl.value = null
  }else{
    console.log('Support Type (.jpg .png)')
    eventMessage('Support Type (.jpg .png)');
  }
}

const onFileChangeMask = async (index,event) => {

  // const file = null
  // if(modelChooser.value == 'anomalyDiffusion'  && event.target.files.length == 1){
  //   file = event.target.files[0]
  //   const fileName=event.target.files[0].name
  //   maskCanvasStates[index].maskImageName = fileName
  // }else if(modelChooser.value == 'anomalyDiffusion'){
  //   const files = Array.from(event.target.files);
  //   canvasStates[index].maskFileList = files.filter(file => file.type.startsWith('image/')); // 確保是圖片文件
  //   return
  // }else{ 
  //   file = event.target.files[0]
  //   const fileName=event.target.files[0].name
  //   maskCanvasStates[index].maskImageName = fileName
  // }
  const files = Array.from(event.target.files);
  canvasStates[index].maskFileList = files.filter(file => file.type.startsWith('image/')); // 確保是圖片文件
  const file = event.target.files[0]
  const fileName=event.target.files[0].name
  maskCanvasStates[index].maskImageName = fileName

  // console.log('fileName  ',fileName)
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = async(e) => {
        maskCanvasStates[index].maskImageUrl=e.target.result;
      // 設置 imageEl 和 canvasEl
      await nextTick();
      }
    reader.readAsDataURL(file)
  }
  else{
    console.log('Support Type (.jpg .png)')
    eventMessage('Support Type (.jpg .png)');
  }
}

const setMaskImageToCanvas = async(index)=>{
  await nextTick();
  openMaskCanvas(index)
  if(index == 0){
    const imageEl = backgroundMaskImageRef.value;
    const canvasEl = backgroundMaskCanvasRef.value;
    maskCanvasStates[index].imageEl = imageEl;
    maskCanvasStates[index].canvasEl = canvasEl;
  }else{
    const imageEl = referenceMaskImageRef.value;
    const canvasEl = referenceMaskCanvasRef.value;
    maskCanvasStates[index].imageEl = imageEl;
    maskCanvasStates[index].canvasEl = canvasEl;
  }
  if (!maskCanvasStates[index].imageEl.complete) {
        await new Promise((resolve) => {
          imageEl.onload = resolve;
        });
  }
  setupCanvas(maskCanvasStates[index]);
  
  const resultCanvas = document.createElement('canvas');
  const resultCtx = resultCanvas.getContext('2d', { willReadFrequently: true });
  resultCanvas.width = maskCanvasStates[index].imageEl.naturalWidth;
  resultCanvas.height = maskCanvasStates[index].imageEl.naturalHeight;
  // 確保圖片載入完成
  if (!maskCanvasStates[index].imageEl.complete) {
    console.error('圖片尚未載入完成');
    error.value = '圖片尚未載入完成'
    eventMessage(error.value);
    return;
  }
  resultCtx.drawImage(maskCanvasStates[index].imageEl, 0, 0);
  maskCanvasStates[index].canvasEl = resultCanvas
  maskCanvasStates[index].ctx = resultCtx
  const dataurl = maskCanvasStates[index].canvasEl.toDataURL('image/png')
  console.log("dataurl   ", dataurl);
  
  // 使用 elementToFileAndBlob 將 resultCanvas 轉為 File 和 Blob
  try {
    const { file, blob } = await elementToFileAndBlob(resultCanvas, {
      format: 'image/png',
      // fileName: `mask-image-${index}`,
      fileName:maskCanvasStates[index].maskImageName
    });

    // 將結果存儲到 maskCanvasStates[index] 中
    maskCanvasStates[index].dataurl = dataurl; // 保留原始的 Data URL
    canvasStates[index].maskFile = file; // 存儲 File 對象
    canvasStates[index].maskBlob = blob; // 存儲 Blob 對象

    console.log('canvasStates[index].maskFile:', canvasStates[index].maskFile);
    console.log('canvasStates[index].maskBlob:', canvasStates[index].maskBlob);
  } catch (error) {
    console.error('轉換為 File 和 Blob 失敗:', error);
    eventMessage(error);
    throw error; // 或者根據需求處理錯誤
  }


  console.log("maskCanvasStates[index].imageEl   ", maskCanvasStates[index].imageEl);
  console.log("maskCanvasStates[index].canvasEl   ",maskCanvasStates[index].canvasEl);
  console.log("maskCanvasStates[index].ctx   ",maskCanvasStates[index].ctx);
}

const triggerFileInput = (index) => {
  if(index == 0){
    document.querySelector('.file-input-background').click()
  }
  else if (index == 1){
    document.querySelector('.file-input-reference').click()
  }
}

const triggerMaskFileInput = (index) => {
  if(index == 0){
    document.querySelector('.file-input-background-mask').click()
  }
  else if (index == 1){
    document.querySelector('.file-input-reference-mask').click()
  }
}




const openCanvas = (index) => {
  canvasStates[index].canvasDisplay = "block"
  clearCanvas(canvasStates[index]);
  setupCanvas(canvasStates[index]);
  console.log("openCanvas index    ", index);
}
const closeCanvas = (index) => {
  canvasStates[index].canvasDisplay ="none"
  backgroundMaskCanvas.value = false
  // imageDataUrl.value = null
  canvasStates[index].imageSrc = null;
  canvasStates[index].maskImageUrl = null;
  canvasStates[index].bigImageUrl = null;
}

const openMaskCanvas = (index) => {
  maskCanvasStates[index].maskCanvasDisplay = "block"
}

const closeMaskCanvas = (index) => {
  maskCanvasStates[index].maskImageUrl = null;
  maskCanvasStates[index].imageEl = null;
  maskCanvasStates[index].canvasEl = null;
  maskCanvasStates[index].maskCanvasDisplay = "none"
}

//參數條

function chooseModel(event) {
  // setModelChooser(event)
  modelChooser.value=event

  if(event === 'anomalyDiffusion'){
    isMultipleImg.value = true
    isHiddenInput.value = false
  }else{
    isMultipleImg.value = false
    isHiddenInput.value = true
  }
}

const currentSliders = computed(() => modelSliders[modelChooser]);


function closeParamBlock(){
  display.value = display.value === 'block' ? 'none' : 'block'
}


const setupCanvas = async (state) => {
  // await nextTick()
  // const imageEl = image.value
  // const canvasEl = canvas.value;
  // 如果還沒匯入就先跳出
  if (!state.canvasEl) return;

  const scale = window.devicePixelRatio || 1; // 設備像素比

  // const container = state.canvasEl.parentElement;
  // const containerWidth = container.clientWidth;
  // const containerHeight = container.clientHeight || containerWidth * 0.75;
  // const fixedWidth = 178; // 固定寬度
  // const fixedHeight = 178; // 固定高度
  const container = document.querySelector('.upload-container');
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const aspectRatio = state.imageEl.naturalWidth / state.imageEl.naturalHeight;

  state.ctx = state.canvasEl.getContext('2d', { willReadFrequently: true })

  if(!state.imageEl) return;

  // 按比例缩放
  state.ctx.scale(scale, scale);
  // 确保图像已加载后设置 Canvas 大小
  state.canvasEl.width = state.imageEl.naturalWidth* scale;
  state.canvasEl.height = state.imageEl.naturalHeight* scale;

  // 設置顯示尺寸隨容器調整
  state.canvasEl.style.width = `${containerWidth}px`;
  state.canvasEl.style.height = `${containerHeight}px`;
  // 設置 Canvas 顯示尺寸為固定值
  // state.canvasEl.style.width = `${fixedWidth}px`;
  // state.canvasEl.style.height = `${fixedHeight}px`;

  // let displayWidth = containerWidth;
  // let displayHeight = displayWidth / aspectRatio;
  // if (displayHeight > containerHeight) {
  //   displayHeight = containerHeight;
  //   displayWidth = displayHeight * aspectRatio;
  // }
 

  // 设置 Canvas 样式以覆盖图像
  // state.canvasEl.style.width = `${state.imageEl.width}px`
  // state.canvasEl.style.height = `${state.imageEl.height}px`
  // state.canvasEl.style.width = `${displayWidth}px`;
  // state.canvasEl.style.height = `${displayHeight}px`;

  // 设置画笔粗细
  state.ctx.lineWidth = 20
  state.ctx.strokeStyle = '#15DCDC'
  state.ctx.globalAlpha = 0.03
  state.ctx.lineCap = 'round'; 
  
}

// 取得滑鼠相對 Canvas 的位置
const getMousePos = (canvasEl, event) => {
  const rect = canvasEl.getBoundingClientRect();
  return mapClientPointToBitmap(
    { clientX: event.clientX, clientY: event.clientY },
    rect,
    { width: canvasEl.width, height: canvasEl.height }
  );
};
const startDrawing = (state,event) => {
  state.drawing = true;
  const pos = getMousePos(state.canvasEl, event);
  state.ctx.beginPath();
  state.ctx.moveTo(pos.x, pos.y);
  console.log('Started drawing at:', pos.x, pos.y); // Debugging line
};

const draw = (state,event) => {
  if (state.drawing) {
    const pos = getMousePos(state.canvasEl, event);
    state.ctx.strokeStyle = state.strokeColor;
    state.ctx.lineWidth = state.lineWidth;
    state.ctx.globalAlpha = state.opacity;
    state.ctx.lineTo(pos.x, pos.y);
    state.ctx.stroke();
    console.log('Drawing at:', pos.x, pos.y); // Debugging line
  }
};
const stopDrawing = (state) => {
  state.drawing = false;
  console.log('Stopped drawing'); // Debugging line
};

const clearCanvas = (state) => {
  console.log('state  ',state); // Debugging line
  const canvasEl = state.canvasEl;
  state.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  console.log('Canvas cleared'); // Debugging line
};

const saveCanvas = (state) => {
  const saveCanvas = document.createElement('canvas');
  saveCanvas.width = state.canvasEl.width;
  saveCanvas.height = state.canvasEl.height;
  const saveCtx = saveCanvas.getContext('2d');
  console.log('canvasEl.width:', state.canvasEl.width); // Debugging line
  console.log('canvasEl.height:', state.canvasEl.height); // Debugging line
  // Fill with black background
  saveCtx.fillStyle = 'black';
  saveCtx.fillRect(0, 0, saveCanvas.width, saveCanvas.height);

  // Draw the original canvas content
  saveCtx.drawImage(state.canvasEl, 0, 0);

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
    eventMessage('Failed to generate the Data URL.');
  }
  console.log('Canvas saved'); // Debugging line
};

const runImageExtract = async(index,state,targetWidth) => {
  await nextTick()
  if(maskCanvasStates[index].maskImageUrl == null){
    console.log("maskCanvasStates[index].maskImageUrl == null")
    // extractImageToBlob(state);
    extractDrawnArea(state);
    extractImageWithDrawing(state,'noMaskFile');
    extractBigImage(state,targetWidth);
  }else{
    console.log('maskCanvasStates[index].maskImageUrl !== null ');
    state.ctx = maskCanvasStates[index].ctx;
    // console.log('state.canvasEl ',state.canvasEl)
    state.canvasEl = maskCanvasStates[index].canvasEl;
    state.maskImageUrl = maskCanvasStates[index].maskImageUrl
    // console.log('state.canvasEl ',state.canvasEl)
    // console.log('state.imageEl ',state.imageEl)
    // extractImageToBlob(state);
    extractImageWithDrawing(state,'maskFile');
    extractBigImage(state,targetWidth);
  }
}
const extractImageToBlob =async (state)=> {
  const imageEl = state.imageEl;
    const canvasEl = state.canvasEl;
    const ctx =  canvasEl.getContext('2d');
    // 创建一个新的 Canvas 来绘制结果
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = canvasEl.width;
    resultCanvas.height = canvasEl.height;
    
    const resultCtx = resultCanvas.getContext('2d', { willReadFrequently: true });
    console.log("imageEl  ",imageEl)
    // 将图像绘制到新的 Canvas 上
    resultCtx.drawImage(imageEl, 0, 0);
  try {
      const { file, blob } = await elementToFileAndBlob(resultCanvas, {
        format: 'image/png',
        fileName: state.imageName,
      });
      state.imageFile = file;
      state.imageBlob = blob;
      console.log('state.imageFile:', state.imageFile);
      console.log('state.imageBlob:', state.imageBlob);
  } 
  catch (error) {
    console.error('轉換為 File 和 Blob 失敗:', error);
    eventMessage('轉換為 File 和 Blob 失敗:' + error)
    // throw error;
  }
}
const extractDrawnArea =async (state)=> {
      const canvasEl = state.canvasEl;
      const ctx = canvasEl.getContext('2d');

      const drawnArea = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      const drawnCanvas = document.createElement('canvas');
      drawnCanvas.width = canvasEl.width;
      drawnCanvas.height = canvasEl.height;
      const drawnCtx = drawnCanvas.getContext('2d');

      // 設置黑色背景
      drawnCtx.fillStyle = 'black';
      drawnCtx.fillRect(0, 0, drawnCanvas.width, drawnCanvas.height);

      // 將繪圖區域設為白色
      const data = drawnArea.data;
      const whiteImageData = drawnCtx.createImageData(canvasEl.width, canvasEl.height);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) { // 有繪圖的地方
          whiteImageData.data[i] = 255;     // R = 255
          whiteImageData.data[i + 1] = 255; // G = 255
          whiteImageData.data[i + 2] = 255; // B = 255
          whiteImageData.data[i + 3] = 255; // A = 255
        } else {
          whiteImageData.data[i] = 0;     // 紅色設為 0
          whiteImageData.data[i + 1] = 0; // 綠色設為 0
          whiteImageData.data[i + 2] = 0; // 藍色設為 0
          whiteImageData.data[i + 3] = 255; // Alpha 設為 255（完全不透明）
        }
      }
      drawnCtx.putImageData(whiteImageData, 0, 0);
      // 將 drawnCanvas 轉為 File 和 Blob
      try {
        const { file, blob } = await elementToFileAndBlob(drawnCanvas, {
          format: 'image/png',
          fileName: 'drawn-mask',
        });

        // 將結果存儲到 state 中
        state.maskImageUrl = drawnCanvas.toDataURL('image/png'); // 保留原始的 Data URL
        state.maskFile = file; // 存儲 File 對象
        state.maskBlob = blob; // 存儲 Blob 對象

        console.log('maskImageUrl:', state.maskImageUrl);
        console.log('maskFile:', state.maskFile);
        console.log('maskBlob:', state.maskBlob);
      } catch (error) {
        console.error('轉換為 File 和 Blob 失敗:', error);
        eventMessage('轉換為 File 和 Blob 失敗:'+ error);
      }
}
const extractImageWithDrawing =async (state,maskFileFlag) => {
  
    const imageEl = state.imageEl;
    const canvasEl = state.canvasEl;
    console.log("canvasEl  ",canvasEl.toDataURL('image/png'))
    const ctx =  canvasEl.getContext('2d');
    // const imageEl = image.value;
    // const canvasEl = canvas.value;
    // const ctx = canvasEl.getContext('2d');

    // 创建一个新的 Canvas 来绘制结果
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = canvasEl.width;
    resultCanvas.height = canvasEl.height;
    
    const resultCtx = resultCanvas.getContext('2d', { willReadFrequently: true });
    console.log("imageEl  ",imageEl)
    // 設置黑色背景
    resultCtx.fillStyle = 'black';
    resultCtx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
    // 将图像绘制到新的 Canvas 上
    resultCtx.drawImage(imageEl, 0, 0);
    console.log("resultCtx  ",resultCtx)
    console.log("canvasEl  ",canvasEl)

    // 获取绘制的区域
    const drawnArea = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    const data = drawnArea.data;
    const baseData = resultCtx.getImageData(0, 0, canvasEl.width, canvasEl.height);

    // 创建一个新的 ImageData 对象来存储被绘制到的图像部分
    const extractedImageData = resultCtx.createImageData(canvasEl.width, canvasEl.height);
    if(maskFileFlag == 'noMaskFile'){
      
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          const x = (i / 4) % canvasEl.width
          const y = Math.floor((i / 4) / canvasEl.width)
          const pixel = resultCtx.getImageData(x, y, 1, 1).data
          extractedImageData.data[i] = pixel[0]
          extractedImageData.data[i + 1] = pixel[1]
          extractedImageData.data[i + 2] = pixel[2]
          extractedImageData.data[i + 3] = pixel[3]
        } else {
          // 否則將像素變為透明
          extractedImageData.data[i + 3] = 0; 
        }
      }
    }else{
      for (let i = 0; i < data.length; i += 4) {
      const r = drawnArea.data[i];
      const g = drawnArea.data[i + 1];
      const b = drawnArea.data[i + 2];
      const a = drawnArea.data[i + 3];

      if (r > 200 && g > 200 && b > 200 && a > 0) {
        extractedImageData.data[i] = baseData.data[i];
        extractedImageData.data[i + 1] = baseData.data[i + 1];
        extractedImageData.data[i + 2] = baseData.data[i + 2];
        extractedImageData.data[i + 3] = baseData.data[i + 3];
      }
      else {
        extractedImageData.data[i + 3] = 0;
        }
      }
    }
    // 将提取的图像数据放入新的 Canvas
    resultCtx.putImageData(extractedImageData, 0, 0);

    // 保存提取后的图像
    state.imageWithDrawingUrl = resultCanvas.toDataURL('image/png');
    console.log('imageWithDrawingUrl  :',state.imageWithDrawingUrl)

}
const extractBigImage = async (state, targetWidth) => {
  console.log('extractBigImage called with:', state.imageWithDrawingUrl, targetWidth);

  if (!state.imageWithDrawingUrl) {
    console.warn('imageWithDrawingUrl is empty');
    state.bigImageUrl = null;
    return;
  }

  try {
    // 創建臨時圖片元素並載入 imageWithDrawingUrl
    const tempImg = new Image();
    tempImg.src = state.imageWithDrawingUrl;

    // 等待圖片載入
    await new Promise((resolve, reject) => {
      tempImg.onload = resolve;
      tempImg.onerror = () => reject(new Error('Failed to load imageWithDrawingUrl'));
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = tempImg.width;
    tempCanvas.height = tempImg.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(tempImg, 0, 0);

    // 獲取圖片像素資料
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    // 計算繪圖區域邊界
    let minX = tempCanvas.width, minY = tempCanvas.height, maxX = 0, maxY = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) { // 非透明像素（繪圖區域）
        const x = (i / 4) % tempCanvas.width;
        const y = Math.floor((i / 4) / tempCanvas.width);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    // 如果沒有繪圖，返回空圖片
    if (minX > maxX || minY > maxY) {
      console.warn('No drawing area found');
      state.bigImageUrl = null;
      return;
    }

    // 計算繪圖區域的寬高
    const drawnWidth = maxX - minX + 1;
    const drawnHeight = maxY - minY + 1;

    // 計算目標高度，保持比例
    const targetHeight = Math.round(targetWidth * (drawnHeight / drawnWidth));

    // 創建結果 Canvas
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = targetWidth;
    resultCanvas.height = targetHeight;
    const resultCtx = resultCanvas.getContext('2d');

    // 從 imageWithDrawingUrl 裁剪並放大繪圖區域
    resultCtx.drawImage(
      tempImg,
      minX, minY, drawnWidth, drawnHeight, // 來源區域
      0, 0, targetWidth, targetHeight       // 目標區域（放大）
    );

    // 生成新的 Data URL
    state.bigImageUrl = resultCanvas.toDataURL('image/png');
    console.log('bigImageUrl:', state.bigImageUrl);
  } catch (error) {
    console.error('Error in extractBigImage:', error);
    eventMessage('Error in extractBigImage:'+ error)
    state.bigImageUrl = null;
  }
};

// const isDisabled =computed( (modelString) =>
//   modelComponentGroup[modelString].some(str => modelChooser.value.includes(str))
// )
const isDisabled = (modelString) => {
  // console.log("modelComponentGroup[modelString]  :",modelChooser)
  return !(modelComponentGroup[modelString] || []).some(str => modelChooser.value.includes(str));
};

// 更新滑軌樣式的函數
const updateRangeStyle = (event, slider) => {
  if (!event || !event.target) {
    console.error('Event or event.target is undefined');
    eventMessage('Event or event.target is undefined')
    return;
  }
  const input = event.target;
  const value = slider.rangeValue;
  input.style.setProperty('--value', value);
  input.style.setProperty('--min', slider.min);
  input.style.setProperty('--max', slider.max);
};


//依據視窗大小調整畫布
const handleResize = (state) => {
  if (state.imageEl && state.canvasEl) {
    setupCanvas(state);
  }
}
//初始化canvas，監控視窗大小
onMounted(() => {
  canvasStates[0].canvasEl = canvasRefs.value[0];
  canvasStates[1].canvasEl = canvasRefs.value[1];
  
  window.addEventListener('resize', handleResize(canvasStates[0]))
  window.addEventListener('resize', handleResize(canvasStates[1]))
  
  // 頁面加載時初始化滑軌的 --value
  const updateSliders = () => {
    const inputs = document.querySelectorAll('.custom-range');
    const sliderEntries = Object.entries(currentSliders);
    inputs.forEach((input, index) => {
      const [, slider] = sliderEntries[index];
      input.style.setProperty('--value', slider.rangeValue);
      input.style.setProperty('--min', slider.min);
      input.style.setProperty('--max', slider.max);
    });
  };
  updateSliders();
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize(canvasStates[0]))
  window.removeEventListener('resize', handleResize(canvasStates[1]))
  releaseObjectUrl(outputResultImageUrl.value)
})

const valueToArrayCutPaste = (modelConfigParam,value) =>{
  if(modelChooser.value =='cutPaste'  && cutPasteArrayValue.includes(modelConfigParam)){
    modelConfigs.cutPaste[modelConfigParam]=[value,value]
  }else if(modelChooser.value =='cutPaste'){
    modelConfigs.cutPaste[modelConfigParam]=value

  console.log(" modelConfigs.mode1['maxKernelSize] : ", modelConfigs.mode1)
  console.log("modelConfigsToAPI.geometricShapes_1 :",modelConfigsToAPI.value.geometricShapes_1)
  }
}
const valueToArrayMode1 = (modelConfigParam,value) =>{
  if(modelChooser.value == 'geometricShapes_1' && modelConfigParam.includes('kernelBoundaries')){
    if(modelConfigParam.includes('Left')){
      modelConfigs.mode1['kernelBoundaries'][0] = value;
    }else{
      modelConfigs.mode1['kernelBoundaries'][1] = value;
    }
  }else if(modelChooser.value == 'geometricShapes_1' && modelConfigParam.includes('transformParams')){
    if(modelConfigParam.includes('Left')){
      modelConfigs.mode1['transformParams'][0] = value;
    }else{
      modelConfigs.mode1['transformParams'][1] = value;
    }
  }else if(modelChooser.value == 'geometricShapes_1' && modelConfigParam == 'radRatio'){
    modelConfigs.mode1['maxRadRatio']=value
  }else if(modelChooser.value == 'geometricShapes_1' && modelConfigParam == 'kernelSize'){
    modelConfigs.mode1['maxKernelSize']=value
  }else if(modelChooser.value == 'geometricShapes_1'){
    modelConfigs.mode1[modelConfigParam]=value
  }
}
const valueToArrayMode2 = (modelConfigParam,value) =>{
  if(modelChooser.value == 'geometricShapes_2' && modelConfigParam.includes('kernelBoundaries')){
    if(modelConfigParam.includes('Left')){
      modelConfigs.mode2['kernelBoundaries'][0] = value;
    }else{
      modelConfigs.mode2['kernelBoundaries'][1] = value;
    }
  }else if(modelChooser.value == 'geometricShapes_2' && modelConfigParam.includes('transformParams')){
    if(modelConfigParam.includes('Left')){
      modelConfigs.mode2['transformParams'][0] = value;
    }else{
      modelConfigs.mode2['transformParams'][1] = value;
    }
  }else if(modelChooser.value == 'geometricShapes_2' && modelConfigParam == 'radRatio'){
    modelConfigs.mode2['maxRadRatio']=value
  }else if(modelChooser.value == 'geometricShapes_2' && modelConfigParam == 'kernelSize'){
    modelConfigs.mode2['maxKernelSize']=value
  }else if(modelChooser.value == 'geometricShapes_2'){
    modelConfigs.mode2[modelConfigParam]=value
  }
}
const valueToArrayAnomalyDiffusion = (modelConfigParam,value) =>{
  if(modelChooser.value == 'anomalyDiffusion'){
    modelConfigs.anomalydiffusion[modelConfigParam]=value
  }
  console.log('modelConfigParam :', modelConfigParam)
}
const runWhichOneModel = async(modelName) =>{
  try {
    if(modelName == 'TFIDF'){

    }
    else if(modelName == 'cutPaste'){
      
      isLoading.value = true;
      await generateImage(canvasStates[0]);
      await fetchResultData(resultFolderName.value);
      await fetchImage(resultFolderImage.value[resultFolderImage.value.length-1]);
      // downloadFile(resultFolderName);
    }
    else if(modelName == 'geometricShapes_1'){
      isLoading.value = true;
      await generateShape1(canvasStates[0]);
      console.log("resultFolderName.value :",resultFolderName.value)
      await fetchResultData(resultFolderName.value);

      await fetchImage(resultFolderImage.value[resultFolderImage.value.length-1]);
    }
    else if(modelName == 'geometricShapes_2'){
      isLoading.value = true;
      await generateShape2(canvasStates[0]);
      console.log("resultFolderName.value :",resultFolderName.value)
      await fetchResultData(resultFolderName.value);

      await fetchImage(resultFolderImage.value[resultFolderImage.value.length-1]);
    }
    else if(modelName == 'anomalyDiffusion'){
      isLoading.value = true;
      await loadModel();
      await generate();
      console.log("resultFolderName.value :",resultFolderName.value)
      await fetchResultData(resultFolderName.value);
      await fetchImage(resultFolderImage.value[resultFolderImage.value.length-1]);
    }
  }catch (error) {
    console.error('runWhichOneModel error :' , error)
    eventMessage(error)
  }finally{
    isLoading.value = false;
  }
}

//#region API區

const fetchConfig = async (fileName) => {
  isLoading.value = true;
  error.value = null;
  try {
    configData.value = await getModelYaml(fileName);
    const modelName = fileName.split(".")[0]
    console.log("modelName :", modelName)
    console.log("configData :", configData.value)
    if(modelName == 'cutpaste'){
      downloadModelConfig['cutPaste']=jsYaml.load(configData.value)
      console.log("jsYaml.load(configData.value) :", jsYaml.load(configData.value))
      console.log("downloadModelConfig['cutPaste']) :", downloadModelConfig['cutPaste'])

    }
    else if(modelName == 'mode1'){
      downloadModelConfig['geometricShapes_1']=jsYaml.load(configData.value)
    }
    else if(modelName == 'mode2'){
      downloadModelConfig['geometricShapes_2']=jsYaml.load(configData.value)
    }
    else {
      // modelConfigs[modelName]=jsYaml.load(configData.value)
    }
    console.log('modelConfigs  :',modelConfigs)
  } catch (err) {
    error.value = err.message;
    console.log('error :', error.value)
    eventMessage(error.value)
  } finally {
    isLoading.value = false;
    await sleep(500)
  }
}

const uploadConfig = async () => {
  if (authStore.tokenType == '' || authStore.tokenType == '') {
    error.value = 'Please Login';
    eventMessage(error.value);
    return;
  }
  error.value = null;
  try {
    
    console.log('authStore.tokenType :' ,authStore.tokenType)
    console.log('authStore.accessToken :' ,authStore.accessToken)
    console.log('modelConfigsToAPI[modelChooser] :' ,jsYaml.dump(modelConfigsToAPI.value[modelChooser.value]))
    if(modelChooser.value == 'cutPaste'){
      const response = await editConfig(jsYaml.dump(modelConfigsToAPI.value[modelChooser.value]), 'cutPasteGenerator',authStore.tokenType, authStore.accessToken);
    }
    else if(modelChooser.value == 'geometricShapes_1'){
      const response = await editConfig(jsYaml.dump(modelConfigsToAPI.value[modelChooser.value]), 'shapeGenerator_Model_v1',authStore.tokenType, authStore.accessToken);
    }
    else if(modelChooser.value == 'geometricShapes_2'){
      const response = await editConfig(jsYaml.dump(modelConfigsToAPI.value[modelChooser.value]), 'shapeGenerator_Model_v2',authStore.tokenType, authStore.accessToken);
    }
    else if(modelChooser.value == 'anomalyDiffusion'){
      if (imageUploadFileName.value == null) {
        error.value = 'No Image Upload Filename';
        eventMessage(error.value)
        return;
      }
      await uploadImage(canvasStates[0])
      const response = await editConfig(jsYaml.dump(modelConfigsToAPI.value[modelChooser.value]), 'diffusionGenerator',authStore.tokenType, authStore.accessToken);
      // console.log("modelConfigs :",modelConfigs.anomalydiffusion)
      // console.log("modelConfigsToAPI :",modelConfigsToAPI.value.anomalyDiffusion)
    }
    else if(modelChooser.value == 'TFIDF'){

    }
    eventMessage('Config Update Success');
    // console.log('API 響應:', response);
  } catch (err) {
    error.value = err.message;
    console.log(" error.value :", error.value)
    eventMessage(error.value)
  } finally {
  }
};

// 調用 API 生成圖片
const generateImage = async (state) => {
  if (!state.imageFile) {
    error.value = 'Please Update Image';
    eventMessage(error.value)
    return;
  }
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;
  // result.value = null;
  resultFolderName.value = null;
  try {
    const response = await generateCutPasteImage(
      state.imageFile,
      'false',
      authStore.tokenType,
      authStore.accessToken
    );
    resultFolderName.value = response
    console.log("resultFolderName.value  :",resultFolderName.value)
    // result.value = response;
    eventMessage('Generate Success');
  } catch (err) {
    error.value = err.message;
    eventMessage(error.value)
  } finally {
  }
};

const generateShape1 = async (state) => {
  
  console.log("generateShape ")
  if (!state.imageFile) {
    error.value = 'Please Update Image';
    eventMessage(error.value)
    console.log("Please Update Image :", state)
    return;
  }

  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }
  error.value = null;
  
  console.log("state.imageFile :", state.imageFile)
  try {
    const response = await generateShapeMode1(
      state.imageFile,
      'false',
      authStore.tokenType,
      authStore.accessToken
    );
    
    console.log("generateShape response :", response)
    resultFolderName.value = response; // 存儲返回的結果

    eventMessage('Generate Success');
  } catch (err) {
    error.value = err.message;
    console.log("error :", error.value)
    eventMessage(error.value)
  } finally {
  }
};

// 調用 API 生成 Shape Mode2
const generateShape2 = async (state) => {
  if (!state.imageFile) {
    error.value = 'Please Update Image';
    eventMessage(error.value)
    return;
  }
  if (!state.maskFile) {
    error.value = 'Please Update Mask';
    eventMessage(error.value)
    return;
  }
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;

  try {
    const response = await generateShapeMode2(
      state.imageFile,
      state.maskFile,
      'false',
      authStore.tokenType,
      authStore.accessToken
    );
    resultFolderName.value = response; // 存儲返回的結果
    eventMessage('Generate Success');
  } catch (err) {
    error.value = err.message;
  } finally {
  }
};

const uploadImage = async (state) => {
  if (state.imageFileList.length === 0) {
    error.value = 'Please Update Image';
    eventMessage(error.value)
    return;
  }
  
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;
  isLoading.value = true;

  try {
    const response = await uploadImages(
      state.imageFileList,
      state.maskFileList,
      imageUploadFileName.value,
      authStore.tokenType,
      authStore.accessToken
    );
    uploadId.value = response; // 存儲返回的結果
    console.log("uploadId :", uploadId.value)
    eventMessage('Upload Image Success');
  } catch (err) {
    error.value = err.message;
    console.log('error :',error.value)
    eventMessage(error.value)
  } finally {
    isLoading.value = false;
  }
};

// 調用 API 載入模型
const loadModel = async () => {
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;

  try {
    eventMessage('模型載入中');
    const response = await loadDiffusionModel(authStore.tokenType, authStore.accessToken);
    // result.value = response; // 存儲返回的結果
    eventMessage('模型載入成功');
  } catch (err) {
    error.value = err.message;
    console.log('error :',error.value)
    eventMessage(error.value)
  } finally {
  }
};

// 調用 API 生成數據
const generate = async () => {
  if (!uploadId.value) {
    error.value = 'Upload ID is Empty';
    eventMessage(error.value);
    return;
  }
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;

  try {
    const response= await generateDiffusion(
      'false',
      uploadId.value,
      authStore.tokenType,
      authStore.accessToken
    );
    // result.value = responseData; // 存儲返回的結果
    resultFolderName.value = response; // 存儲返回的結果
    eventMessage('Generate Success');
  } catch (err) {
    error.value = err.message;
    console.log('error :',error.value)
    eventMessage(error.value)
  } finally {
  }
};

// 調用 API 的方法
const fetchResultData = async (folderName) => {
  if (!folderName) {
    error.value = 'No Folder Name';
    eventMessage(error.value)
    return;
  }
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  error.value = null;
  resultFolderImage.value = []; // 清空之前的數據

  try {
    const result = await getResultData(folderName, authStore.tokenType, authStore.accessToken);
    console.log("result  :",result)
    // 提取 img_list
    const imgList = result?.img_list;

    if (!imgList || !Array.isArray(imgList)) {
      throw new Error('無法從響應中提取 img_list');
    }

    // 將 img_list 中的資料添加到 resultFolderImage
    resultFolderImage.value = [...imgList]; // 這裡假設 img_list 有 3 筆資料，直接全部添加
    console.log("resultFolderImage.value  :",resultFolderImage.value)
  } catch (err) {
    error.value = err.message;
    eventMessage(error.value)
  } finally {}
}

const fetchImage = async (imagePath) => {
  
    console.log("imagePath  :",imagePath)
    if (!imagePath) {
      error.value = 'No Image Path';
      eventMessage(error.value)
      return;
    }
    if (!authStore.tokenType || !authStore.accessToken) {
      error.value = 'Please Login';
      eventMessage(error.value)
      return;
    }

    isLoading.value = true;
    error.value = null;
    releaseObjectUrl(outputResultImageUrl.value);
    outputResultImageUrl.value = null;

    try {
      const blob = await reviewResultData(imagePath, authStore.tokenType, authStore.accessToken);
      outputResultImageUrl.value = replaceObjectUrl(outputResultImageUrl.value, blob);
      console.log("outputResultImageUrl.value  :",outputResultImageUrl.value)
    } catch (err) {
      error.value = err.message;
      eventMessage(error.value)
    } finally {
    }
  };

// 下載文件的函數
const downloadFile = async () => {
  if (!resultFolderName.value) {
    error.value = 'No Folder Path';
    eventMessage(error.value)
    return;
  }
  if (!authStore.tokenType || !authStore.accessToken) {
    error.value = 'Please Login';
    eventMessage(error.value)
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { blob, filename } = await downloadResult(resultFolderName.value, authStore.tokenType, authStore.accessToken);
    console.log("filename",filename)
    // 創建下載連結
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // 使用從響應頭提取的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // 釋放臨時 URL
  } catch (err) {
    error.value = err.message;
    eventMessage(error.value)
  } finally {
    isLoading.value = false;
  }
};
//#endregion


const showLoginDialog = () => {
  showDialog.value = true;
  errorMessage.value = ''; // 重置錯誤訊息
  
};

const closeDialog = () => {
  if (!isLoading.value) {
    showDialog.value = false;
    message.value = null;
  }
};

const eventMessage = (event) => {
  message.value = event;
}

</script>

<template>
<div class="container text-center " style= "margin-top:20px;max-width:90%">
  <div class="row align-items-start">
    <!-- 讀取圖片顯示 -->
    <div class="col-8 ">
      <div class="nested-container text-center"> 
        <div class="row align-items-start">
        <div class="col-12 align-items-output">
          <div class="output-container" >
            Output
            <div class="output-image-preview">
              <div v-if="outputResultImageUrl != null"  >
                <img :src="outputResultImageUrl" alt="" class=" output" />
                <!-- 下載按鈕 -->
                <button  class="btn btn-secondary output-download-btn" @click="downloadFile" :disabled="isDownloading || !resultFolderName">
                  <span v-if="isDownloading">Downloading...</span>
                  <span v-else>Download ZIP File</span>
                </button>
              </div>
              <div v-else-if="outputResultImageUrl == null && isLoading == false" class="icon-noImage-output">
                <svg style=" " xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <div v-else-if="outputResultImageUrl == null && isLoading == true" class="spinner-border text-primary spinner " style="" role="status">
                  <span class="visually-hidden ">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-5">
          <div class="output-container" style="">
            Output Download List
            <div class="image-preview">
              <img  src="../../../public/add_new_project.svg" alt="Uploaded Image" class="image-preview-default output" />
              <div class="icon-noImage"></div>
              <img  :src="canvasStates[0].bigImageUrl" alt="Uploaded Image" style="width: 170px; height: 170px;padding: 5%;" />
            </div>
          </div>
        </div> -->
        </div>
      <div class="nested-container text-center">
        <div class="row align-items-center">
        <div class="col-3 align-items-target" style="margin-top: 20px;">
          Processed Target
          <div class="upload-container">
            <div class="image-preview">
              <!-- <img  src="../../../public/add_new_project.svg" alt="Uploaded Image" class="image-preview-default" /> -->
              <svg v-if="canvasStates[0].bigImageUrl==null" :class="{'disabled-svg': isDisabled('needMask')}"  style="padding: 40%;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

              <img v-else :src="canvasStates[0].bigImageUrl" alt="Uploaded Image" style="width: 100%;height:100%; padding: 5%;" class="image-preview-process" />
            </div>
          </div>
        </div>
        <div class="col-3 align-items-target" style="margin-top: 20px;">
          Processed Reference 
          <div class="upload-container">
            <div class="image-preview">
              <!-- <img  src="../../../public/add_new_project.svg" alt="Uploaded Image" class="image-preview-default" /> -->
              <svg v-if="canvasStates[1].maskImageUrl==null" :class="{'disabled-svg': isDisabled('needReference')}" style="padding: 40%;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

              <img v-else :src="canvasStates[1].bigImageUrl" alt="Uploaded Image" style=""  class="image-preview-mask"/>
            </div>
          </div>
        </div>
        <div class="col-3 align-items-target" style="margin-top: 20px;">
          Target Mask
          <div class="upload-container">
            <div class="image-preview">
              <!-- <img  src="../../../public/add_new_project.svg" alt="Uploaded Image" class="image-preview-default" /> -->
              <svg v-if="canvasStates[0].maskImageUrl==null"  :class="{'disabled-svg': isDisabled('needMask')}" style="padding: 40%;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              
              <img v-else :src="canvasStates[0].maskImageUrl" alt="Uploaded Image"  style=""  class="image-preview-mask"/>
            </div>
          </div>
        </div>
        <div class="col-3 align-items-target" style="margin-top: 20px ;">
          Reference Mask
          <div class="upload-container">
            <div class="image-preview">
              <!-- <img  src="../../../public/add_new_project.svg" alt="Uploaded Image" class="image-preview-default" /> -->
              <svg v-if="canvasStates[1].maskImageUrl==null"    :class="{'disabled-svg': isDisabled('needReference')}"   style="padding: 40%;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

              <img v-else :src="canvasStates[1].maskImageUrl" alt="Uploaded Image" style="background-color: black;"  class="image-preview-mask"/>
            </div>
          </div>
        </div>
        </div>
      <div class="nested-container text-center" >
        <div class="row align-items-end ">
        <div class="col-3 align-items-background"  >Background
          <!-- <p style="position:absolute;;left:10px;top:-23px ">Background</p> -->
        <div class="upload-container" >
          <div class="image-preview">
            <div id="canvas-container" class="canvas-preview-default" :style="{display:canvasStates[0].canvasDisplay,cursor:isDisabled('needCanvas') ? 'auto':'crosshair'}" >
              <input type="file" @change="onFileChange(0,$event)" accept="image/*" :hidden="isHiddenInput" class="file-input-background"  :multiple="isMultipleImg"/>
              <canvas id="canvas-area1" :class= "{'disabled-canvas':isDisabled('needCanvas')}" :ref="setCanvasRef(0)" @mousedown="startDrawing(canvasStates[0],$event)" @mousemove="draw(canvasStates[0],$event)" @mouseup="stopDrawing(canvasStates[0])" @mouseleave="stopDrawing(canvasStates[0])" ></canvas>
              <!-- <button id="clearButton" @click="clearCanvas" ></button> -->
              <svg xmlns="http://www.w3.org/2000/svg"  @click="clearCanvas(canvasStates[0])"  width="16" height="16" fill="currentColor" class="bi-arrow-clockwise" :class="{'disabled-canvas':isDisabled('needMask'),'disabled-canvas':isDisabled('needCanvas'),'icon-hover':iconStates.background[0].isHovered,'icon-active':iconStates.background[0].isActive}" @mouseout="iconStates.background[0].isHovered = false" @mouseleave="iconStates.background[0].isHovered = false" @mouseup="iconStates.background[0].isActive = false" @mouseover="iconStates.background[0].isHovered=true" @mousedown="iconStates.background[0].isActive=true" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="runImageExtract(0,canvasStates[0],178)" width="16" height="16" fill="currentColor" class="bi-check2" :class="{'disabled-canvas':isDisabled('needMask'),'disabled-canvas':isDisabled('needCanvas'),'icon-hover':iconStates.background[1].isHovered,'icon-active':iconStates.background[1].isActive}" @mouseleave="iconStates.background[1].isHovered = false" @mouseup="iconStates.background[1].isActive = false" @mouseover="iconStates.background[1].isHovered=true" @mousedown="iconStates.background[1].isActive=true" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="closeCanvas(0)" width="16" height="16" fill="currentColor" class="bi-x" :class="{'icon-hover':iconStates.background[2].isHovered,'icon-active':iconStates.background[2].isActive}" @mouseleave="iconStates.background[2].isHovered = false" @mouseup="iconStates.background[2].isActive = false" @mouseover="iconStates.background[2].isHovered=true" @mousedown="iconStates.background[2].isActive=true" viewBox="0 0 16 16" >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              <!-- <button type="button" class="btn-close" aria-label="Close" @click="closeCanvas(0)"></button> -->
            </div>
              
              <img v-if="canvasStates[0].imageSrc===null" src="../../../public/add_new_project.svg" class="image-preview-default" alt="Uploaded Image" @load="closeCanvas(0)" @click="triggerFileInput(0)"  style="cursor: pointer;"/>
              <img v-else :src="canvasStates[0].imageSrc"  :ref="setImageRef(0)" alt="Uploaded Image" class="image-preview-src" @load="openCanvas(0)" />
          </div>
          <!-- <button @click="triggerFileInput"  class="file-input-button">上傳照片</button> -->
        </div>
        </div>
        <div class="col-3 align-items-background"  >
        Reference
        <div class="upload-container">
          <div class="image-preview">
            <div id="canvas-container" class="canvas-preview-default" :style="{display:canvasStates[1].canvasDisplay }">
              <input type="file" @change="onFileChange(1,$event)" accept="image/*" hidden class="file-input-reference" :disabled="isDisabled('needReference')" />
              <canvas id="canvas-area2"  :ref="setCanvasRef(1)"  @mousedown="startDrawing(canvasStates[1],$event)" @mousemove="draw(canvasStates[1],$event)" @mouseup="stopDrawing(canvasStates[1])" @mouseleave="stopDrawing(canvasStates[1])" ></canvas>
              <!-- <button id="clearButton" @click="clearCanvas" ></button> -->
              <svg xmlns="http://www.w3.org/2000/svg"  @click="clearCanvas(canvasStates[1])"  width="16" height="16" fill="currentColor" class="bi-arrow-clockwise" :class="{'icon-hover':iconStates.reference[0].isHovered,'icon-active':iconStates.reference[0].isActive}" @mouseout="iconStates.reference[0].isHovered = false" @mouseleave="iconStates.reference[0].isHovered = false" @mouseup="iconStates.reference[0].isActive = false" @mouseover="iconStates.reference[0].isHovered=true" @mousedown="iconStates.reference[0].isActive=true" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="runImageExtract(1,canvasStates[1],178)" width="16" height="16" fill="currentColor" class="bi-check2" :class="{'icon-hover':iconStates.reference[1].isHovered,'icon-active':iconStates.reference[1].isActive}" @mouseleave="iconStates.reference[1].isHovered = false" @mouseup="iconStates.reference[1].isActive = false" @mouseover="iconStates.reference[1].isHovered=true" @mousedown="iconStates.reference[1].isActive=true" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="closeCanvas(1)" width="16" height="16" fill="currentColor" class="bi-x" :class="{'icon-hover':iconStates.reference[2].isHovered,'icon-active':iconStates.reference[2].isActive}" @mouseleave="iconStates.reference[2].isHovered = false" @mouseup="iconStates.reference[2].isActive = false" @mouseover="iconStates.reference[2].isHovered=true" @mousedown="iconStates.reference[2].isActive=true" viewBox="0 0 16 16" >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              <!-- <button type="button" class="btn-close" aria-label="Close" @click="closeCanvas(0)"></button> -->
            </div>
              
              <img v-if="canvasStates[1].imageSrc===null" src="../../../public/add_new_project.svg" class="image-preview-default"  alt="Uploaded Image" @load="closeCanvas(1)" @click="triggerFileInput(1)" :class="{ 'disabled-image': isDisabled('needReference') }" style="cursor: pointer;"/>
              <img v-else :src="canvasStates[1].imageSrc" :ref="setImageRef(1)" alt="Uploaded Image" class="image-preview-src" @load="openCanvas(1)" />
          </div>
          <!-- <button @click="triggerFileInput"  class="file-input-button">上傳照片</button> -->
        </div>
        </div>
        <div class="col-3 align-items-background">
        Background Mask
        <div class="upload-container">
          <div class="image-preview">
            
            <div id="canvas-container" class="canvas-preview-default" :style="{display:maskCanvasStates[0].maskCanvasDisplay }">
              <input type="file" @change="onFileChangeMask(0,$event)" accept="image/*"  :hidden="isHiddenInput" :multiple="isMultipleImg" class="file-input-background-mask" :disabled="isDisabled('needMask')" />
              <canvas id="canvas-area3"  ref="backgroundMaskCanvasRef" style=""></canvas>
            </div>

              
              <img v-if="maskCanvasStates[0].maskImageUrl===null " src="../../../public/add_new_project.svg" class="image-preview-default" alt="Uploaded Image" @click="triggerMaskFileInput(0)" :class="{ 'disabled-image': isDisabled('needMask') }" style="cursor: pointer;"/>
              <div v-else>
                <img :src="maskCanvasStates[0].maskImageUrl"  ref="backgroundMaskImageRef" alt="Uploaded Image" class="image-preview-src" @load="setMaskImageToCanvas(0)" />
                <svg xmlns="http://www.w3.org/2000/svg" @click="closeMaskCanvas(0)" width="16" height="16" fill="currentColor" class="bi-x" :class="{'icon-hover':iconStates.backgroundMask[0].isHovered,'icon-active':iconStates.backgroundMask[0].isActive}" @mouseleave="iconStates.backgroundMask[0].isHovered = false" @mouseup="iconStates.backgroundMask[0].isActive = false" @mouseover="iconStates.backgroundMask[0].isHovered=true" @mousedown="iconStates.backgroundMask[0].isActive=true" viewBox="0 0 16 16" >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
          </div>
        </div>
        </div>
        <div class="col-3 align-items-background">
        Reference Mask
        <div class="upload-container">
          <div class="image-preview">
            <div id="canvas-container" class="canvas-preview-default" style="display:none;" >
              <input type="file" @change="onFileChangeMask(1,$event)" accept="image/*" hidden class="file-input-reference-mask" :disabled="isDisabled('needReference')"/>
              <canvas id="canvas-area4"  ref="referenceMaskCanvasRef" ></canvas>
              
            </div>
              
              <img v-if="maskCanvasStates[1].maskImageUrl===null" src="../../../public/add_new_project.svg" class="image-preview-default" alt="Uploaded Image" @click="triggerMaskFileInput(1)" :class="{'disabled-image': isDisabled('needReference')}" style="cursor: pointer;"/>
              <div v-else>
                <img :src="maskCanvasStates[1].maskImageUrl" ref="referenceMaskImageRef" alt="Uploaded Image" class="image-preview-src" @load="setMaskImageToCanvas(1)" />
                <svg xmlns="http://www.w3.org/2000/svg" @click="closeMaskCanvas(1)" width="16" height="16" fill="currentColor" class="bi-x" :class="{'icon-hover':iconStates.referenceMask[0].isHovered,'icon-active':iconStates.referenceMask[0].isActive}" @mouseleave="iconStates.referenceMask[0].isHovered = false" @mouseup="iconStates.referenceMask[0].isActive = false" @mouseover="iconStates.referenceMask[0].isHovered=true" @mousedown="iconStates.referenceMask[0].isActive=true" viewBox="0 0 16 16" >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
          </div>
        </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
    <!-- 參數區 -->
    <div class="col-4 border" style="position:sticky; right:-20%;top:0">
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item" >
          <a class="nav-link" :class="{ active: modelChooser === 'TFIDG'}" @click="chooseModel('TFIDG')" href="#">TFIDG</a>
        </li>
        <li class="nav-item" >
          <a class="nav-link" :class="{ active: modelChooser === 'cutPaste' }" @click="chooseModel('cutPaste')" href="#">CutPaste</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: modelChooser === 'geometricShapes_1' }" @click="chooseModel('geometricShapes_1')" href="#">GeometricShapes(I)</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: modelChooser === 'geometricShapes_2' }" @click="chooseModel('geometricShapes_2')" href="#">GeometricShapes(II)</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: modelChooser === 'anomalyDiffusion' }" @click="chooseModel('anomalyDiffusion')" href="#">AnomalyDiffusion</a>
        </li>
      </ul>
      <div v-if="modelChooser === 'TFIDG'" class="param-setting" >
      <!-- <p v-if="display=='none'" @click="closeParamBlock">Adviced Option<img class="angle" src="../../assets/images/icons/toleft.svg" style= "width:20px;transform: rotate(0deg);"></p>
      <p v-else @click="closeParamBlock">Adviced Option<img class="angle" src="../../assets/images/icon/toleft.svg" style= "width:20px;transform: rotate(-90deg);"></p>   -->
      <div class="param-title-noshow-area" :style="{display}" >
          <div class="params-section" style="width: 100%;">
            <label style="width: 100%;text-indent: 1.5em;">Predicted Samples Directory
              <textarea data-testid="textbox" class="form-control" aria-label="With textarea" dir="ltr" placeholder rows="1" style="overflow-y: scroll; "></textarea>
            </label>
          </div>
          
          <div class="params-section" style="width: 100%;text-align: left; ">
            <label for="range_id_0" style="width: 100%;text-indent: 1.5em; ">Control Strength</label>
            <input id="range_id_0" class="control-strength-number" data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.controlStrenthNumber" min="0" max="2">
            <input type="range" class="form-range control-strength-range" min="0" max="2" step="0.01" id="range_id_0" v-model="modelConfigs.TFIDG.controlStrenthNumber">
            
          </div>
          <div class="params-section"  style="width: 100%;text-align: left;">
            <label for="range_id_1" style="width: 100%;text-indent: 1.5em;">Steps</label>
            <input id="range_id_1" class="steps-number" data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.stepsNumber" min="1" max="100">
            <input class="form-range steps-range" type="range" step="1" v-model="modelConfigs.TFIDG.stepsNumber" min="1" max="100">
          </div>

          <div class="params-section" style="width: 100%;">
            <label for="range_id_2" style="width: 100%;text-align: left;text-indent: 1.5em;">Guidance Scale</label>
            <input id="range_id_2" class="guidance-scale-number" data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.guidanceScaleNumber" min="0" max="30">
            <input class="form-range guidance-scale-range" type="range" step="0.1" v-model="modelConfigs.TFIDG.guidanceScaleNumber" min="0" max="30">
            
          </div>
          <div class="params-section" style="width: 100%;">
            <label for="range_id_3" style="width: 100%;text-indent: 1.5em;">Seed</label>
            <input id="range_id_3" class="seed-number" data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.seedNumber" min="-1" max="999999999">
            <input class="form-range seed-range" type="range" step="1" v-model="modelConfigs.TFIDG.seedNumber" min="-1" max="999999999">
            
          </div>
          <div class="params-section" style="width: 100%;">
            <label for="range_id_4" style="width: 100%;text-indent: 1.5em;">Share Attention Step</label>
            <input id="range_id_4" class="share-attention-step-number" data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.shareAttentionStepNumber" min="4" max="50">
            <input class="form-range share-attention-step-range" type="range" step="0.1" v-model="modelConfigs.TFIDG.shareAttentionStepNumber" min="4" max="50">
            
          </div>
          <div class="params-section" style="width: 100%;">
            <label for="range_id_5" style="width: 100%;text-indent: 1.5em;">Adain Weight</label>
            <input id="range_id_5" class="adain-weight-number " data-testid="number-input" type="number" v-model="modelConfigs.TFIDG.adainWeightNumber" min="0" max="1">
            <input class="form-range adain-weight-range " type="range" step="0.1" v-model="modelConfigs.TFIDG.adainWeightNumber" min="0" max="1">
            
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_0" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.referenceMaskRefine">
            <label for="checkbox_id_0" class="form-check-label">Reference Mask Refine
            </label>
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_1" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.enableShapeControl">
            <label for="checkbox_id_1" class="form-check-label">Enable Shape Control
            </label>
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_2" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.useInpainting">
            <label for="checkbox_id_2" class="form-check-label">Use Inpainting(Without Modules)
            </label>
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_3" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.shareAttention">
            <label for="checkbox_id_3" class="form-check-label">Share Attention
            </label>
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_4" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.energyFunction">
            <label for="checkbox_id_4" class="form-check-label">Energy Function
            </label>
          </div>
          <div class="form-check params-section" style="text-align:left;">
            <input id="checkbox_id_5" class="form-check-input" data-testid="checkbox-input" type="checkbox" v-model="modelConfigs.TFIDG.adaptiveMask">
            <label for="checkbox_id_5" class="form-check-label">Adaptive Mask
            </label>
          </div>
          <button type="button" class="btn btn-success params-section" @click="showchoose" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button>
          <button type="button" class="btn btn-danger params-section" style="position: absolute; width: 47%;text-align: center;right: 0;margin-top: 3%">Run</button>
      </div>
    </div>
    <div v-if="isInitialized">
    <div v-if="modelChooser === 'cutPaste'" class="param-setting" >
      <div class="container param-setting">
        <!-- <div class="params-section" style="width: 100%;">
            <label style="width: 100%;text-indent: 1.5em;">Image Upload Filename
              <textarea data-testid="textbox" class="form-control" aria-label="With textarea" dir="ltr" placeholder rows="1" style="overflow-y: scroll;" v-model="imageUploadFileName"></textarea>
            </label>
          </div> -->
        <div class="params-section" style="width: 100%; text-align: left;" v-for="(slider, key) in modelSliders[modelChooser]" :key="key" >
          <label :for="`range_id_${slider.id}`" style="width: 100%; text-indent: 1.5em;"> {{ slider.label }}</label>
          <input type="number" :id="`range_id_${slider.id}`" :class="[`${key}-number`,'cutpaste-number']" data-testid="number-input" v-model="slider.rangeValue" :min="slider.min" :max="slider.max"/>
          <input type="range" :class="['form-range', `${key}-range`,'cutpaste-range' , 'custom-range']" :min="slider.min" :max="slider.max" :step="slider.step" v-model="slider.rangeValue" @change="valueToArrayCutPaste(key,slider.rangeValue)" @input="updateRangeStyle($event, slider)"
            :style="`--value: ${slider.rangeValue}; --max: ${slider.max}; --min: ${slider.min}`"
          />
    </div>
    <button type="button" class="btn btn-success params-section" @click="uploadConfig" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button>
    <button type="button" class="btn btn-danger params-section" @click="runWhichOneModel(modelChooser)" style="position: absolute; width: 47%;text-align: center;right: 0;margin-top: 3%">Run</button>
  </div>
    </div>
  </div>
    <div v-if="modelChooser === 'geometricShapes_1'" class="param-setting" >
      <div class="container param-setting">
        <!-- <div class="params-section" style="width: 100%;">
            <label style="width: 100%;text-indent: 1.5em;">Image Upload Filename
              <textarea data-testid="textbox" class="form-control" aria-label="With textarea" dir="ltr" placeholder rows="1" style="overflow-y: scroll;" v-model="imageUploadFileName"></textarea>
            </label>
          </div> -->
        <div class="params-section" style="width: 100%; text-align: left;" v-for="(slider, key) in modelSliders[modelChooser]" :key="key" >
          <label :for="`range_id_${slider.id}`" style="width: 100%; text-indent: 1.5em;"> {{ slider.label }}</label>
          <input type="number" :id="`range_id_${slider.id}`" :class="[`${key}-number`,'mode1-number']" data-testid="number-input" v-model="slider.rangeValue" :min="slider.min" :max="slider.max"/>
          <input type="range" :class="['form-range', `${key}-range`,'mode1-range' , 'custom-range']" :min="slider.min" :max="slider.max" :step="slider.step" v-model="slider.rangeValue" @change="valueToArrayMode1(key,slider.rangeValue)" @input="updateRangeStyle($event, slider)"
            :style="`--value: ${slider.rangeValue}; --max: ${slider.max}; --min: ${slider.min}`"
          />
        </div>
        <button type="button" class="btn btn-success params-section" @click="uploadConfig" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button>
        <button type="button" class="btn btn-danger params-section" @click="runWhichOneModel(modelChooser)" style="position: absolute; width: 47%;text-align: center;right: 0;margin-top: 3%">Run</button>
      </div>
    </div>
    <div v-if="modelChooser === 'geometricShapes_2'" class="param-setting" >
      <div class="container param-setting">
        <!-- <div class="params-section" style="width: 100%;">
            <label style="width: 100%;text-indent: 1.5em;">Image Upload Filename
              <textarea data-testid="textbox" class="form-control" aria-label="With textarea" dir="ltr" placeholder rows="1" style="overflow-y: scroll;" v-model="imageUploadFileName"></textarea>
            </label>
          </div> -->
        <div class="params-section" style="width: 100%; text-align: left;" v-for="(slider, key) in modelSliders[modelChooser]" :key="key" >
          <label :for="`range_id_${slider.id}`" style="width: 100%; text-indent: 1.5em;"> {{ slider.label }}</label>
          <input type="number" :id="`range_id_${slider.id}`" :class="[`${key}-number`,'mode2-number']" data-testid="number-input" v-model="slider.rangeValue" :min="slider.min" :max="slider.max"/>
          <input type="range" :class="['form-range', `${key}-range`,'mode2-range' , 'custom-range']" :min="slider.min" :max="slider.max" :step="slider.step" v-model="slider.rangeValue" @change="valueToArrayMode2(key,slider.rangeValue)" @input="updateRangeStyle($event, slider)"
            :style="`--value: ${slider.rangeValue}; --max: ${slider.max}; --min: ${slider.min}`"
          />
        </div>
        <button type="button" class="btn btn-success params-section" @click="uploadConfig" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button>
        <button type="button" class="btn btn-danger params-section" @click="runWhichOneModel(modelChooser)" style="position: absolute; width: 47%;text-align: center;right: 0;margin-top: 3%">Run</button>
      </div>
    </div>
    <div v-if="modelChooser === 'anomalyDiffusion'" class="param-setting" >
      <div class="params-section" style="width: 100%;">
        <label style="width: 100%;text-indent: 1.5em;">Image Upload Filename
          <textarea data-testid="textbox" class="form-control" aria-label="With textarea" dir="ltr" placeholder rows="1" style="overflow-y: scroll;" v-model="imageUploadFileName"></textarea>
        </label>
      </div>
      <div class="params-section" style="width: 100%; text-align: left;" v-for="(slider, key) in modelSliders[modelChooser]" :key="key" >
          <label :for="`range_id_${slider.id}`" style="width: 100%; text-indent: 1.5em;"> {{ slider.label }}</label>
          <input type="number" :id="`range_id_${slider.id}`" :class="[`${key}-number`,'anomalydiffusion-number']" data-testid="number-input" v-model="slider.rangeValue" :min="slider.min" :max="slider.max"/>
          <input type="range" :class="['form-range', `${key}-range`,'anomalydiffusion-range' , 'custom-range']" :min="slider.min" :max="slider.max" :step="slider.step" v-model="slider.rangeValue" @change="valueToArrayAnomalyDiffusion(key,slider.rangeValue)" @input="updateRangeStyle($event, slider)"
            :style="`--value: ${slider.rangeValue}; --max: ${slider.max}; --min: ${slider.min}`"
          />
    </div>
    <div class="params-section" style="width: 100%; text-align: left;"  >
      <label for="sampleName" class="form-label" style="width: 100%;text-indent: 1.5em;">Sample Name:</label>
        <select id="sampleName" class="form-select" v-model="modelConfigs.anomalydiffusion.sampleName" @change="valueToArrayAnomalyDiffusion">
          <option value="" disabled></option>
          <option v-for="sample in sampleOptions" :key="sample" :value="sample">
            {{ sample }}
          </option>
        </select>
    </div>
    <div class="params-section" style="width: 100%; text-align: left;"  >
      <label for="anomalyName" class="form-label" style="width: 100%;text-indent: 1.5em;">Anomaly Name:</label>
      <select id="anomalyName" class="form-select" v-model="modelConfigs.anomalydiffusion.anomalyName"  @change="valueToArrayAnomalyDiffusion">
        <option value="" disabled></option>
        <option v-for="anomaly in availableAnomalyOptions" :key="anomaly" :value="anomaly">
          {{ anomaly }}
        </option>
      </select>
    </div>
    <div class="form-check params-section" style="text-align:left;">
      <input id="checkbox_id_0" class="form-check-input" data-testid="checkbox-input" type="checkbox" @change="valueToArrayAnomalyDiffusion" v-model="modelConfigs.anomalydiffusion.adaptiveMask">
      <label for="checkbox_id_0" class="form-check-label">Adaptive Mask
      </label>
    </div>
        <button type="button" class="btn btn-success params-section" @click="uploadConfig" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button>
        <!-- <button type="button" class="btn btn-success params-section" @click="showLoginDialog" style="position: absolute; width: 47%;text-align: center;left:0;margin-top: 3%;">Save</button> -->
        <button type="button" class="btn btn-danger params-section" @click="runWhichOneModel(modelChooser)" style="position: absolute; width: 47%;text-align: center;right: 0;margin-top: 3%">Run</button>
    </div>
  </div>
</div>
</div>
<!-- 灰背景與輸入框 -->

<div class="model-overlay-all">
  <div v-if="message !== null" class="modal-overlay">
    <div class="login-area-bar" style="position: relative;"> 
      <div v-if="isLoading == true" class="spinner-border text-primary spinner-sub " style="position: absolute;" role="status">
        <span class="visually-hidden ">Loading...</span>
      </div>
    </div>
   
    <div class="login-area" >
      <p class="message" >{{ message }}</p>
      <!-- <label for="username" class="login-username" >
        Username&nbsp;&nbsp;  <input type="text" id="username" v-model="username" placeholder="輸入使用者名稱" >
      </label><br>
      <label for="password" class="login-password">
        Password&nbsp;&nbsp; <input type="password" id="password" v-model="password" placeholder="輸入密碼" >
      </label> -->
      <div class="button-group">
        <!-- <button class="button-check" @click="handleLogin" :disabled="authStore.isLoading" >確定</button> -->
        <button class="btn btn-primary button-cancel" @click="closeDialog" :disabled="isLoading">取消</button>
      </div>
    </div>
  </div>
</div>



</template>

<style scoped>
.border{
  border: 2px solid rgb(214, 223, 223);
  border-radius: 5px;
  background-color: rgba(231, 233, 231, 0.267);
}
.nav-link.active {
  background-color: #007bff;
  color: white;
  
}

.param-setting{
  /* display: inline-block; */
  /* vertical-align: top;   */
  /* margin: 10px; */
  padding: 5px;
  width: 100%;
  position: relative;
  margin-top:10px;
  
}

.params-section{
  margin-top: 8px;
  text-align: left;
  padding-top:3px;
  border-radius: 5px;
}

.control-strength-number,
.steps-number,
.guidance-scale-number,
.seed-number,
.share-attention-step-number,
.adain-weight-number,
.cutpaste-number,
.mode1-number,
.mode2-number,
.anomalydiffusion-number
{
  position: absolute;
  margin-top: 1px;
  right: 0;
  margin-right: 5px;
  border-radius: 5px;
  border: 2px solid rgb(166, 168, 168);
  box-shadow: 3px;
  /* top: 50%;
  transform: translateY(100%); */
}

.control-strength-range,
.steps-range,
.guidance-scale-range,
.seed-range,
.share-attention-step-range,
.adain-weight-range,
.cutpaste-range,
.mode1-range,
.mode2-range,
.anomalydiffusion-range
{
  width: 100%;
  margin-top: 5px;
  margin-right: 5px;
}

.reference-mask-refine,
.enable-shape-control,
.use-inpainting,
.share-attention,
.energy-function,
.adaptive-mask
{
  margin-top:10px;
  margin-right:10px;
}

.nested-container {
  margin-bottom: 40px;
  /* margin-top: 10px; */
  /* position: relative; */
}


.align-items-center,
.align-items-end
{
  display: flex;
  justify-content: space-between; /* 圖片間平均分佈 */
  align-items: center; /* 垂直置中 */
  flex-wrap: wrap; /* 若空間不足，允許換行 */
}
.align-items-target{
  /* position:absolute; */
  width: 25%;
  height: 25%;
}
.align-items-output{
  
  position: relative;
  max-height: 100%;
  display: flex;
  align-items: center; 
  justify-content: center; 
  /* border: 2px solid rgb(30, 133, 76); */
}

.align-items-background{
  
  position: relative;
  /* position:absolute; */
  /* border: 2px solid rgb(30, 133, 76); */
  /* min-width: 25%; */
  /* min-height: 25%; */
  margin-top: 20px;
  
  max-height: 500px;
}

.output-container{
  
  position: relative;
  width: 70%;
  min-height: 400px;
  /* display: flex; */
  /* justify-content: center;  */
  /* align-items: center;  */
  border: 2px solid rgb(214, 223, 223);
  border-radius: 5px; 
  background-color: rgba(231, 233, 231, 0.267);
  
}
.output-image-preview{
  /* position:absolute; */
  /* padding: 40%; */
  /* width: 100%;
  height: 100%; */
  padding:0 5% 5% 5%;
  /* border: 2px solid rgb(30, 133, 76); */
  
}

.output-image-preview img{
  width: 100%;
  height: 100%;
  object-fit:cover;
  /* border: 2px solid rgb(224, 20, 47); */
}

.output-download-btn{
  position: absolute;
  top:95%;
  left:37%;
  height: 5%;
  display: flex;
  justify-content:center;
  align-items:center;
}

.spinner{
  left:48%;
  top:37%;
  position: absolute; 
  padding:2%;
}

.icon-noImage-output
{
  padding:46.5%;
  left:0;
  top:-50% ;
  position: absolute;
}

.upload-container {
  position: relative;
  /* position:absolute; */
  /* width: 100%;
  height: 100%; */
  /* width: 13vw; */
  height: 30vh;
  /* margin-top: 10px; */
  /* padding: 5px; */
  border: 2px solid rgb(214, 223, 223);
  border-radius: 5px; 
  background-color: rgba(231, 233, 231, 0.267);
  /* display: inline-block; */
}

.image-preview {
  /* border: 2px solid rgb(222, 20, 70); */
  /* position: relative; */
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 防止圖片溢出 */
  position:absolute;
}

.image-preview-default {
  /* border: 2px solid #e6b908; */
  padding: 40%;
  width: 100%;
  height: 100%;

}

.image-preview-src {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  /* position:absolute; */
  z-index: 3;
}

.image-preview-process{}
.image-preview-mask{
  width: 100%;
  height: 100%;
  /* object-fit:; */
  /* position:absolute; */
  z-index: 3;
}

.image-preview .output {
  /* border: 2px solid #e6b908; */
  /* padding: 40%;
  min-width: 100%;
  max-height: 100%; */
  /* display: flex; */
  /* position:absolute; */

}

.align-items-processed-target{
  
}
.canvas-preview-default{
  width: 100%;
  height: 100%;
  /* width: 178px;  */
  /* height: 178px; 固定高度 */
  /* margin: 10px; */
  /* border: 2px solid rgb(0, 223, 223); */
  display:flex;
  /* cursor: crosshair; */
  top: 0;
  left: 0;
  /* object-fit: cover; */
  position:absolute;
  z-index: 6;

}

#canvas-area1{
  position:absolute;
  /* border: 2px solid rgb(37, 13, 133); */
  display:flex;
  max-width: 100%;
  max-height: 100%; 
  object-fit: cover;
  /* width: 178px; */
}
#canvas-area2{
  position:absolute;
  border: 2px solid rgb(37, 13, 133);
  display:flex;
  /* min-width: 100%;
  min-height: 100%; */
  object-fit: cover;
  /* width: 178px; */
}
#canvas-area3{
  position:absolute;
  /* border: 2px solid rgb(37, 13, 133); */
  display:flex;
  /* min-width: 100%;
  min-height: 100%; */
  object-fit: cover;
  cursor:auto;
  /* width: 178px; */
}



.file-input-button{
  margin-top: 7px;
  position:absolute;
  top: 1;
  left: 50%;
  transform: translate(-50%);
  z-index: 7;
}
#clearButton
{
  
  position:absolute;
  z-index:7;
}
#saveButton{
  position:absolute;
  right:0;
  z-index:7;
}

.disabled-image{
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

.disabled-svg{
  opacity: 0.3 !important;
}

.disabled-canvas{
  display: none !important;
}
/* .model-choose{
  cursor: pointer;
}
.model-unchoose{
  opacity: 0.1;
} */

.icon-hover{
  stroke: #115bf6; /* 描邊替代 border */
  stroke-width: 2px;
  transform: scale(0.9);
  /* border: 3px solid #115bf6; */
}

.icon-active{
  /* stroke: #ff4500; */
  stroke-width: 3px;
  transform: scale(0.8);
}


.bi-x{
  position:absolute;
  border: 2px solid #115bf6;
  border-radius: 5px;
  stroke:#115bf6;
  width: 10%;
  height: 10%;
  right:1%;
  top:1%;
  cursor: pointer;
  z-index: 100;
  /* padding-left:5px; */
}

.bi-arrow-clockwise{
  position:absolute;
  border: 2px solid #115bf6;
  border-radius: 5px;
  stroke:#115bf6;
  width: 10%;
  height: 10%;
  right:1%;
  top:13%;
  cursor: pointer;
  padding:1px;
}

.bi-check2{
  position:absolute;
  border: 2px solid #115bf6;
  border-radius: 5px;
  stroke:#115bf6;
  width: 10%;
  height: 10%;
  right:1%;
  top:25%;
  cursor: pointer;
}

/* 滑軌包裹容器 */
/* .params-section {
  margin-bottom: 20px;
} */

/* 自訂 range 滑塊樣式 */
.custom-range {
  width: 100%;
  --track-color: #ddd; /* 未填充部分的顏色 */
  --progress-color: #0d6efd; /* 已填充部分的顏色（藍色） */
}

/* Webkit 瀏覽器（如 Chrome, Safari） */
.custom-range::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    var(--progress-color) 0%,
    var(--progress-color) calc(((var(--value) - var(--min)) / (var(--max) - var(--min))) * 100%),
    var(--track-color) calc(((var(--value) - var(--min)) / (var(--max) - var(--min))) * 100%),
    var(--track-color) 100%
  );
}

.custom-range::-webkit-slider-thumb {
  background: #0d6efd; /* 實心藍色 */
  border: none; /* 移除邊框 */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-top: -5px;
  box-shadow: none; /* 移除陰影 */
  -webkit-appearance: none;
}

/* 移除 Webkit 瀏覽器中滑塊的 focus 或 active 狀態陰影 */
.custom-range::-webkit-slider-thumb:focus,
.custom-range::-webkit-slider-thumb:active {
  box-shadow: none; /* 移除聚焦或點擊時的陰影 */
}

/* Firefox 瀏覽器 */
.custom-range::-moz-range-track {
  background: var(--track-color);
  height: 6px;
  border-radius: 5px;
}

.custom-range::-moz-range-progress {
  background: var(--progress-color); /* 已拖過部分變藍 */
  height: 6px;
  border-radius: 5px;
}

.custom-range::-moz-range-thumb {
  background: #0d6efd; /* 實心藍色 */
  border: none; /* 移除邊框 */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  cursor: pointer;
  box-shadow: none; /* 移除陰影 */
}

/* 移除 Firefox 瀏覽器中滑塊的 focus 或 active 狀態陰影 */
.custom-range::-moz-range-thumb:focus,
.custom-range::-moz-range-thumb:active {
  box-shadow: none; /* 移除聚焦或點擊時的陰影 */
}

/* 確保外層容器背景不變色 */
.container {
  /* 固定背景顏色 */
  /* background-color: #fff;  */
}

/* 調整數字輸入框樣式（可選） */
input[type="number"] {
  width: 100px;
  margin-right: 10px;
}



/* 灰背景與訊息提示框 */
.model-overlay-all{

}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* border-top-right-radius: 10px;
  border-top-left-radius: 10px; */
  background: rgba(0, 0, 0, 0.3);
  /* background: #0052efcc; */
  /* background-color:  #0052efcc; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff1f;
  z-index: 99;
}
.button-login {
  background: transparent;
  border: none;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  /* border-radius: 50%; */
}
.login-area{
  
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 25%;
  width: 23%;
  margin-top: 3%;
  position: fixed;
  background-color:#ffffff;
  z-index: 100;
}
.login-area-bar{
  width: 23%;
  height: 29%;
  background: #0052efcc;
  border-radius: 10px;
}

.message{
  top: 0;
  left:5%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 150%;
}
.login-password{
  top: 0;
  left:5%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 5px;
}
.button-group{
  display: flex;
  margin-top: 20%;
  justify-content:center;
  z-index: 101;
}
.button-check,.button-cancel{
  /* color: black;
  background-color:  #f0f0f0;
  border-radius: 5px; */


}
.spinner-sub{
  display: flex;
  justify-content: center;
  align-items: center;
  right: 47%;
  top:50%;
  z-index: 105;
  
}

.button:disabled{
  background-color: #ccc;
  cursor: not-allowed;
}


</style>
