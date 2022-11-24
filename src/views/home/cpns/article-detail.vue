<template>
    <div class="articleDetail">
        <div class="main-content">
            <h1 class="title">{{ article.title }}</h1>
            <!--中间文章内容-->
            <div
                class="content markdown-body"
                v-html="article.content"
                ref="article-content"
            ></div>
        </div>
        <!--标签部分-->
        <div class="tag">
            <tags-outlined class="tagStyle" :style="{ fontSize: '20px' }" />
            <a-checkable-tag v-for="(tag, index) in tagList" :key="index">
                <router-link :to="'/label/' + tag.tagName">
                    {{ tag.tagName }}
                </router-link>
            </a-checkable-tag>
        </div>
        <div class="classify">
            <folder-open-outlined :style="{ fontSize: '20px' }" />
            <span class="cl" v-for="(cl, index) in classifyList" :key="index">
                {{ cl.classifyName }}</span
            >
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive
} from 'vue'
import { Router, useRouter } from 'vue-router'
import { getArticleById } from '@/service/article/article'
import { getTagsById } from '@/service/label/label'
import { getClassifyById } from '@/service/classify/classify'
import { IArticleList, ITagName, IClassifyName } from '../config/home-config'
import { TagsOutlined, FolderOpenOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
    components: { TagsOutlined, FolderOpenOutlined },
    setup() {
        const store = useStore()

        const router: Router = useRouter()

        //文章内容
        let article = reactive<IArticleList>({} as IArticleList)

        //获取文章内容
        const getArticleDetail = async () => {
            const article_id = router.currentRoute.value.params.article_id
            store.dispatch('article/articleIdAction', article_id)
            const { data } = await getArticleById(article_id)
            article.article_id = data.article_id
            article.title = data.title
            article.date = data.date
            article.content = data.content.replace(/\\n/g, '<br>')
            article.views = data.views
            article.likes = data.likes
            article.comments = data.comments
        }

        //标签列表
        const tagList: ITagName[] = reactive([])

        //获取标签列表
        const getTagNamesById = async () => {
            const article_id = router.currentRoute.value.params.article_id
            const { data } = await getTagsById(article_id)
            tagList.push(...data)
        }

        //分类列表
        const classifyList: IClassifyName[] = reactive([])
        const getClassifyNameById = async () => {
            const article_id = router.currentRoute.value.params.article_id
            const { data } = await getClassifyById(article_id)
            classifyList.push(...data)
        }

        onMounted(() => {
            store.commit('article/anchorShow', true)
            getArticleDetail()
            getTagNamesById()
            getClassifyNameById()
        })

        onUnmounted(() => {
            store.dispatch('article/anchorShowAction', false)
            store.dispatch('article/articleIdAction', '')
        })

        return { article, tagList, classifyList }
    }
})
</script>

<style scoped lang="less">
.articleDetail {
    .tag {
        margin-top: 150px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .tagStyle {
            margin-right: 20px;
        }
        :deep(.ant-tag) {
            background: rgb(227, 222, 222);
        }
    }
    .classify {
        display: flex;
        align-items: center;
        .cl {
            text-decoration: underline;
            cursor: pointer;
            margin-left: 20px;
        }
    }
}
</style>
