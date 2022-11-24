<template>
    <div class="sider">
        <div class="siteInfo">
            <el-image
                class="infoImg"
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
            />
            <h3>ZZZ's Den</h3>
            <LogoutOutlined />
        </div>
        <div class="menuList">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="none"
                text-color="white"
                active-text-color="black"
                router
            >
                <el-menu-item
                    v-for="(menu, index) in menuList"
                    :key="index"
                    :index="menu.route"
                >
                    <el-icon><location /></el-icon>
                    <span>{{ menu.title }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="blogLinks">
            <div class="item" v-for="(link, index) in linkList" :key="index">
                <el-popover
                    placement="top"
                    :title="link.title"
                    :width="150"
                    trigger="hover"
                    :content="link.desc"
                >
                    <template #reference>
                        <component
                            :is="link.type"
                            style="
                                font-size: 22px;
                                color: #ffffff;
                                cursor: pointer;
                            "
                        />
                    </template>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    GithubOutlined,
    ZhihuOutlined,
    WeiboOutlined,
    WechatOutlined,
    QqOutlined,
    LogoutOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
    components: {
        GithubOutlined,
        ZhihuOutlined,
        WeiboOutlined,
        WechatOutlined,
        QqOutlined,
        LogoutOutlined
    },
    setup() {
        const menuList = [
            { title: '主页', route: '/home' },
            { title: '分类', route: '/classify' },
            { title: '标签', route: '/label' },
            { title: '归档', route: '/archive' },
            { title: '关于', route: '/about' }
        ]

        const linkList = [
            {
                type: 'GithubOutlined',
                url: 'https://github.com/czy6666',
                title: 'github',
                desc: 'https://github.com/czy6666'
            },
            {
                type: 'ZhihuOutlined',
                url: 'https://www.zhihu.com/people/tujindong',
                title: '知乎',
                desc: '暂无'
            },
            {
                type: 'WechatOutlined',
                url: '',
                title: '微信',
                desc: '1152925688'
            },
            {
                type: 'QqOutlined',
                url: '',
                title: 'QQ',
                desc: '1152925688'
            },
            {
                type: 'WeiboOutlined',
                url: 'https://weibo.com/u/2394837023',
                title: '微博',
                desc: '暂无'
            }
        ]

        return {
            menuList,
            linkList
        }
    }
})
</script>

<style scoped lang="less">
.sider {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    z-index: 100;
    height: 100%;
    opacity: 0.5;
    background: linear-gradient(-30deg, #2cd1eb, #2d7ec5);
    transition: transform 0.4s ease;
    -webkit-transition: transform 0.4s ease;
    .siteInfo {
        margin-top: 50px;
        width: 100px;
        height: 180px;
        text-align: center;
        .infoImg {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 10px;
        }
    }
    .blogLinks {
        margin-top: 120px;
        width: 200px;
        display: flex;
        justify-content: space-between;
    }
}
</style>
