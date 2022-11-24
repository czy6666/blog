<template>
    <div class="classify">
        <h1>分类</h1>
        <a-collapse v-model:activeKey="activeKey" expand-icon-position="right">
            <a-collapse-panel
                v-for="(value, key, index) in classify[0]"
                :key="index"
                :header="key"
            >
                <div class="title" v-for="(c, index) in value" :key="index">
                    <router-link :to="'/article/' + c.article_id">
                        {{ c.title }}
                    </router-link>
                </div>
                <template #extra><folder-outlined /></template>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { FolderOutlined } from '@ant-design/icons-vue'
import { getAllClassifies } from '@/service/classify/classify'

export default defineComponent({
    components: { FolderOutlined },

    setup() {
        const activeKey = ref(['0'])

        const classify: any[] = reactive([])

        const getClassifies = async () => {
            const { data } = await getAllClassifies()
            classify.push(...data)
        }

        onMounted(() => {
            getClassifies()
        })

        return { activeKey, classify }
    }
})
</script>

<style scoped lang="less">
.classify {
    margin-left: 30px;
    :deep(.ant-collapse-item) {
        position: relative;
    }
    .title {
        color: rgb(132, 175, 248);
        margin-left: 10px;
        padding: 8px;
    }
}
</style>
