<template>
    <div class="layout">
        <sider />
        <div class="headNav">
            <headNav />
        </div>
        <div class="view">
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-aside width="400px">
                    <div class="title">
                        <a-card title="全部分类" style="width: 300px">
                            <template #extra>
                                <router-link class="more" to="/classify">
                                    更多
                                </router-link>
                            </template>
                            <a-checkable-tag
                                v-for="(cl, index) in classifyList"
                                :key="index"
                            >
                                <router-link to="/classify">
                                    {{ cl }}
                                </router-link>
                            </a-checkable-tag>
                        </a-card>
                    </div>
                    <div class="tag">
                        <a-card title="热门标签" style="width: 300px">
                            <template #extra>
                                <router-link class="more" to="/label">
                                    更多
                                </router-link>
                            </template>
                            <a-checkable-tag
                                v-for="(tag, index) in tagsList"
                                :key="index"
                            >
                                <router-link :to="'/label/' + tag">
                                    {{ tag }}
                                </router-link>
                            </a-checkable-tag>
                        </a-card>
                    </div>
                    <div
                        v-if="isAnchorShow"
                        :class="isShowAnthor ? 'anchor' : 'anchorNotShow'"
                    >
                        <a-anchor :affix="false">
                            <a-anchor-link
                                v-for="(t, index) in titleList"
                                :key="index"
                                :href="`#${t}`"
                                :title="t"
                            />
                        </a-anchor>
                    </div>
                </el-aside>
            </el-container>
        </div>
        <a-back-top />
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    watch
} from 'vue'
import sider from './sider.vue'
import headNav from './head-nav.vue'
import { getHotTags } from '@/service/label/label'
import { getClassifies } from '@/service/classify/classify'
import { IClassifyName } from '@/service/classify/type'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getTitleChild } from '@/service/article/article'

export default defineComponent({
    components: { sider, headNav },
    setup() {
        const store = useStore()
        const isAnchorShow = computed(() => {
            return store.state.article.isAnchorShow
        })

        //滚动条滚动距离
        let scrollTop = ref<number>(0)

        //锚点是否固定定位
        let isShowAnthor = ref<boolean>(false)

        //热门列表数据
        const tagsList: string[] = reactive([])

        const getTags = async () => {
            const { data } = await getHotTags()
            tagsList.push(...data)
        }

        //全部标签数据
        const classifyList: IClassifyName[] = reactive([])

        const getClassify = async () => {
            const { data } = await getClassifies()
            classifyList.push(...data)
        }

        //设置滚动距离
        const handleScroll = () => {
            scrollTop.value =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop
        }

        watch(scrollTop, () => {
            if (scrollTop.value >= 400) {
                isShowAnthor.value = true
            } else isShowAnthor.value = false
        })

        //获取文章子标题
        let titleList: string[] = reactive([])
        const getTitle = async () => {
            const article_id = store.state.article.article_id
            const { data } = await getTitleChild(article_id)
            setTimeout(() => {
                titleList.push(...data.titleChild)
            }, 10)
        }
        watch(isAnchorShow, (newValue) => {
            if (newValue == true) {
                getTitle()
            } else {
                titleList.length = 0
            }
        })

        onMounted(() => {
            window.addEventListener('scroll', handleScroll, true)
            getTags()
            getClassify()
        })

        const router = useRouter()
        const turnClassify = () => {
            router.push('/classify')
        }
        const turnTag = () => {
            router.push('/label')
        }

        return {
            scrollTop,
            isShowAnthor,
            tagsList,
            classifyList,
            isAnchorShow,
            titleList,
            turnClassify,
            turnTag
        }
    }
})
</script>

<style scoped lang="less">
.layout {
    width: 100%;
    height: 100%;
    background: url('../assets/img/login-bg.svg') no-repeat;
    .view {
        padding-left: 260px;
        padding-top: 70px;
        padding-right: 5%;
        .tag,
        .title {
            margin-top: 40px;
            margin-left: 100px;
            margin-bottom: 40px;
            :deep(.ant-tag) {
                margin: 7px;
                padding: 0 10px;
                background: rgb(246, 243, 243);
            }
            :deep(.ant-card-bordered) {
                border-left: 2px solid #f0f0f0;
            }
            .more {
                color: #1890ff;
                cursor: pointer;
            }
        }
    }
    .anchor {
        margin-left: 100px;
        position: fixed;
        top: 76px;
    }
    .anchorNotShow {
        margin-left: 100px;
        top: 100px;
    }
    :deep(.ant-back-top-content) {
        background: linear-gradient(-30deg, #2cd1eb, #2d7ec5);
    }
}
</style>
