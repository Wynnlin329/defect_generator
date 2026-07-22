import { defineStore } from 'pinia';
import { ref,reactive,computed} from 'vue';
import {getModelYaml} from '../api/index.js'
import { applyDownloadedModelConfig } from './modelConfigMapping'

export const useConfigData = defineStore('configData', () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const configData = ref(null)
    const fetchConfigError = ref(null)
    const modelsFileName = ['cutpaste.yaml','mode1.yaml','mode2.yaml','anomalydiffusion.yaml']
    const downloadModelConfig = reactive ({
        TFIDG:{},
        cutPaste:{
        output_dir: "result/cutpaste_outputDir",
        data_dir: "/work/r10922154/syntheticgeometry/data/cutpaste",
        generation: {
          num_images: 3,
          random_seed: 0,
          params: {
            cutpaste_normal: {
              area_ratio: [0.07, 0.08],
              aspect_ratio: 0.3
            },
            cutpaste_scar: {
              width: [6, 6],
              height: [15, 15],
              rotation: [5, 5]
            }
          }
        },
        drawing_primitives: [
          'cutpaste_scar'
        ]
      },
        geometricShapes_1:{
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
          num_images: 3,
          params: {
            draw_multiple_polygons: {
              kernel_boundaries: [4, 5]
            },
            draw_stripes: {
              transform_params: [0.1, 0.11]
            },
            generate_background: {
              max_kernel_size: 200,
              max_rad_ratio: 0.02,
              min_kernel_size: 200,
              min_rad_ratio: 0.02
            }
          },
          random_seed: 0
        },
        output_dir: 'result/mode1_geometry_outputDir'
        },
        geometricShapes_2:{
            output_dir: 'result/mode2_geometry_outputDir',
            generation: {
                num_images: 3,
                random_seed: 0,
                params: {
                    generate_background: {
                        min_kernel_size: 150,
                        max_kernel_size: 500,
                        min_rad_ratio: 0.02,
                        max_rad_ratio: 0.031
                    },
                    draw_lines: {
                        nb_lines: 3
                    },
                    draw_stripes: {
                        transform_params: [0.1, 0.1]
                    },
                    draw_multiple_polygons: {
                        kernel_boundaries: [50, 100]
                    }
                }
            },
            drawing_primitives: [
                'draw_lines',
                'gaussian_noise'
            ]
        },
        anomalyDiffusion:{
            output_dir: 'result/diffusion_outputDir',
            anomalydiffusion_config: 'lib/anomalydiffusion/configs/latent-diffusion/txt2img-1p4B-finetune-encoder+embedding.yaml',
            actual_resume: 'lib/anomalydiffusion/models/ldm/text2img-large/model.ckpt',
            ckpt: 'lib/anomalydiffusion/logs/anomaly-checkpoints/checkpoints',
            generation: {
                num_images: 3,
                random_seed: 0,
                params: {
                  anomaly_diffusion: {
                    batch_size: 8,
                    sample_name: 'zipper',
                    anomaly_name: 'rough',
                    adaptive_mask: true
                  }
                }
            },
            drawing_primitives: [
                'anomaly_diffusion'
            ]
        }
      })
    
     


    const fetchConfig = async (fileName) => {
        fetchConfigError.value = null;
        try {
          configData.value = await getModelYaml(fileName);
          applyDownloadedModelConfig(downloadModelConfig, fileName, configData.value)
          console.log('downloadModelConfig  :',downloadModelConfig)
        } catch (err) {
            fetchConfigError.value = err.message;
          console.log('error :', fetchConfigError.value)
        } finally {
          await sleep(500)
        }
      }

    //   const initializeConfigs = async () => {
    //     for (let i = 0; i < modelsFileName.length; i++) {
    //       await fetchConfig(modelsFileName[i]);
    //     }
    //   };
    //   initializeConfigs();
      
      const initializePromise = (async () => {
        for (let i = 0; i < modelsFileName.length; i++) {
            await fetchConfig(modelsFileName[i]);
        }
        await sleep(500); // 可選：模擬額外等待，確保數據穩定
      })();


//   console.log('modelConfigs:', modelConfigs.value);
  return { fetchConfigError, downloadModelConfig, initializePromise};
});
