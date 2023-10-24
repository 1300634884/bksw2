import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'


export default defineConfig(({ command,mode }) => {
  let env=loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
    }),
      viteMockServe({
      localEnabled: command === 'serve',
      })],
    resolve: {
        alias: {
            "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
        }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
     server: {
    proxy: {
      [env.VITE_APP_BASE_API]:{
        //获取数据的服务器地址的设置
        target: env.VITE_SERVE,
          changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
     },
    }
    
  }
  }
 
})
