<template>
    <div class="archive">
        <h1>归档</h1>
        <el-timeline class="timeline">
            <el-timeline-item
                v-for="(article, index) in articleList"
                :key="index"
                :timestamp="utctobeijing(article.date)"
                type="primary"
                hollow
            >
                <router-link :to="'/article/' + article.article_id">
                    {{ article.title }}
                </router-link>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { articleListRequest } from '@/service/article/article'
import { IArticleList } from './config/archive-config'
import { utctobeijing } from '@/utils/time'

export default defineComponent({
    setup() {
        const articleList: IArticleList[] = reactive([])

        const getArticles = async () => {
            const { data } = await articleListRequest()
            articleList.push(...data)
            articleList.sort((a: IArticleList, b: IArticleList) =>
                a.date < b.date ? 1 : -1
            )
        }

        onMounted(() => {
            getArticles()
        })

        return { articleList, utctobeijing }
    }
})
</script>

<style scoped lang="less">
.archive {
    margin-left: 30px;
    .timeline {
        padding-top: 20px;
        :deep(.el-timeline-item__content a) {
            color: rgb(108, 179, 238);
            font-size: 16px;
        }
    }
}
</style>
