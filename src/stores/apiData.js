import { defineStore } from 'pinia';
import { ref,reactive,computed } from 'vue';
import jsYaml from 'js-yaml';
export const useApiData = defineStore('apiData', () => {
    const imageUploadFileName = ref(null)
    const modelChooser = ref('TFIDG')
    const cutPasteArrayValue = ['width', 'height' ,'rotation' ,'areaRatio']
    const downloadModelConfig = {
        TFIDG:{},
        cutPaste:{
          output_dir: 'result/cutpaste_outputDir',
          data_dir: '/work/r10922154/syntheticgeometry/data/cutpaste',
          generation:{
            num_images: '3',
            random_seed: '0',
            params:{
              cutpaste_normal:{
                area_ratio: ['0.05', '0.05'],
                aspect_ratio: '0.3'
              },
              cutpaste_scar:{
                width: ['6', '6'],
                height: ['15', '15'],
                rotation: ['5', '5']
              }
            }
          },
          drawing_primitives:'cutpaste_scar'
        },
        geometricShapes_1:{},
        geometricShapes_2:{},
        anomalyDiffusion:{}
    }
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
          outputDir: downloadModelConfig.cutPaste.output_dir, //固定
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
        mode1:{},
        mode2:{},
        anomalydiffusion:{}
        }
    )
    const modelConfigsToAPI = computed(() => {
        console.log('Computing modelConfigsToAPI with modelConfigs.cutPaste:', JSON.stringify(modelConfigs.cutPaste, null, 2));
        return {
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
                output_dir: modelConfigs.cutPaste.outputDir,
                // output_dir:cutPasteConfig.value.cutPaste.outputDir,
                data_dir: modelConfigs.cutPaste.dataDir,
                generation:{
                num_images: modelConfigs.cutPaste.numImages,
                random_seed: modelConfigs.cutPaste.randomSeed
                },
                params:{
                cutpaste_normal:{
                    area_ratio: modelConfigs.cutPaste.areaRatio,
                    aspect_ratio:modelConfigs.cutPaste.aspectRatio,
                }
                },
                cutpaste_scar:{
                    width: modelConfigs.cutPaste.width,
                    height: modelConfigs.cutPaste.height,
                    rotation: modelConfigs.cutPaste.rotation
                },
                drawing_primitives: modelConfigs.cutPaste.drawingPrimitives
            },
            geometricShapes_1:{},
            geometricShapes_2:{},
            anomalyDiffusion:{}
        }
        }
    )
    const valueToArray = (modelConfigParam,value) =>{
        if(modelChooser.value =='cutPaste'  && cutPasteArrayValue.includes(modelConfigParam)){
          modelConfigs.cutPaste[modelConfigParam]=[value,value]
          console.log('modelConfigsToAPI.cutpaste. '+jsYaml.dump(modelConfigsToAPI.value.cutPaste))
        }else{
          modelConfigs.cutPaste[modelConfigParam]=value
          console.log('modelConfigs.cutPaste. '+ modelConfigParam +' : '  +modelConfigs.cutPaste[modelConfigParam])
        }
    
      }
      const setModelChooser = (newValue) => {
        modelChooser.value = newValue;
        console.log('modelChooser.value  ', modelChooser.value)
      };
  return { modelConfigsToAPI,imageUploadFileName,modelConfigs,downloadModelConfig,valueToArray,modelChooser,setModelChooser};
});