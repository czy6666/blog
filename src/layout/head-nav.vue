<template>
    <div class="head">
        <span class="title">主页</span>
        <div class="input">
            <el-input
                v-model="searchValue"
                placeholder="请输入搜索内容"
                clearable
                maxlength="15"
                @change="searchArticle"
            >
                <template #prefix>
                    <search-outlined style="color: #333333" />
                </template>
            </el-input>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
    components: { SearchOutlined },
    setup() {
        let searchValue = ref('')

        const store = useStore()

        const searchArticle = () => {
            store.dispatch('article/searchAction', searchValue.value)
        }

        return { searchValue, searchArticle }
    }
})
</script>

<style scoped lang="less">
.head {
    width: calc(100% - 260px);
    height: 70px;
    position: fixed;
    top: 0;
    left: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    z-index: 10;
    .title {
        margin-left: 50px;
    }
    .input {
        width: 300px;
        margin-right: 100px;
    }
}
</style>
