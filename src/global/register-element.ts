import { App } from 'vue'
import {
    ElButton,
    ElFormItem,
    ElForm,
    ElInput,
    ElTabPane,
    ElTabs,
    ElIcon,
    ElLink,
    ElCheckbox,
    ElImage,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubMenu,
    ElPopover,
    ElContainer,
    ElAside,
    ElMain,
    ElTimeline,
    ElTimelineItem,
    ElCard
} from 'element-plus/lib/index'

import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElTabPane,
    ElTabs,
    ElIcon,
    ElLink,
    ElCheckbox,
    ElImage,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubMenu,
    ElPopover,
    ElContainer,
    ElAside,
    ElMain,
    ElTimeline,
    ElTimelineItem,
    ElCard
]
export default function (app: App): void {
    for (const component of components) {
        app.component(component.name, component)
    }
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}
