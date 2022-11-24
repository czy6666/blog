import { App } from 'vue'
import {
    List,
    ListItem,
    Avatar,
    ListItemMeta,
    Pagination,
    CheckableTag,
    Anchor,
    AnchorLink,
    Card,
    BackTop,
    Collapse,
    CollapsePanel
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

const components = [
    List,
    ListItem,
    Avatar,
    ListItemMeta,
    Pagination,
    CheckableTag,
    Anchor,
    AnchorLink,
    Card,
    BackTop,
    Collapse,
    CollapsePanel
]

export default function (app: App): void {
    for (const component of components) {
        app.component(component.name, component)
    }
}
