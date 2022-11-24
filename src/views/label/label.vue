<template>
    <div class="label">
        <h1>标签</h1>
        <div class="tagList">
            <router-link
                :to="'/label/' + tag"
                v-for="(tag, index) in tagsList"
                :key="index"
            >
                <div class="tag">{{ tag }}</div>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { getAllTags } from '@/service/label/label'

export default defineComponent({
    setup() {
        //热门列表数据
        const tagsList: string[] = reactive([])

        const getTags = async () => {
            const { data } = await getAllTags()
            tagsList.push(...data)
        }

        onMounted(() => {
            getTags()
        })

        return { tagsList }
    }
})
</script>

<style scoped lang="less">
.label {
    margin-left: 30px;
    margin-top: 0;
    .tagList {
        display: flex;
        .tag {
            border-radius: 0.7em;
            padding: 0 8px;
            margin-right: 20px;
            line-height: 3rem;
            letter-spacing: 0;
            border: 1px solid #dee2e6 !important;
            box-shadow: 0 0 3px 0 #e9ecef;
            color: #0a356e;
            cursor: pointer;
            &:hover {
                color: #3487f3;
                background-color: rgb(227, 239, 247);
            }
        }
    }
}
</style>
