<template>
    <div class="labelItem">
        <tags-outlined class="tagStyle" :style="{ fontSize: '30px' }" />
        <span class="tagName">{{ tagName }}</span>
        <div class="titleList">
            <div class="title" v-for="(title, index) in titleList" :key="index">
                <file-outlined :style="{ fontSize: '20px' }" />
                <router-link
                    class="titleLink"
                    :to="'/article/' + title.article_id"
                >
                    {{ title.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter, Router } from 'vue-router'
import { getArticleByTag } from '@/service/label/label'
import { IGetByTag } from '../config/label-config'
import { TagsOutlined, FileOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    components: { TagsOutlined, FileOutlined },
    setup() {
        const router: Router = useRouter()
        const tagName = router.currentRoute.value.params.labelName

        //标题数组
        const titleList: IGetByTag[] = reactive([])
        const getByTag = async () => {
            const { data } = await getArticleByTag(tagName)
            titleList.push(...data)
        }

        onMounted(() => {
            getByTag()
        })

        return { titleList, tagName }
    }
})
</script>

<style scoped lang="less">
.labelItem {
    margin-left: 30px;
    .tagName {
        font-size: 30px;
        margin-left: 20px;
    }
    .title {
        padding-top: 15px;
        color: rgb(86, 138, 184);
        .titleLink {
            margin-left: 10px;
        }
    }
}
</style>
