import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from '@/components/Category/index.vue'
const allGloablComponent = { SvgIcon,Category  }
export default {
    install(app:any) {
        Object.keys(allGloablComponent).forEach(key => {
            app.component(key,allGloablComponent[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component)
}
    }
    
}