<template>
    <div class="article">
        <a-list
            item-layout="vertical"
            :data-source="searchList"
            :pagination="paginationProps"
        >
            <template #renderItem="{ item }">
                <router-link :to="'/article/' + item.article_id">
                    <a-list-item key="item.title">
                        <a-list-item-meta>
                            <template #title>
                                <div
                                    class="itemTitle"
                                    v-html="item.title"
                                ></div>
                            </template>
                        </a-list-item-meta>
                        <div style="color: #999aaa">
                            {{ contentRemove(item.content) }}
                        </div>
                        <template #actions>
                            <span>
                                <field-time-outlined
                                    style="margin-right: 8px"
                                />
                                <span>{{ formatDate(item.date) }}</span>
                            </span>
                            <span style="margin-left: 250px">
                                <EyeOutlined style="margin-right: 8px" />
                                <span>{{ item.views }}</span>
                            </span>
                            <span>
                                <LikeOutlined style="margin-right: 8px" />
                                <span>{{ item.likes }}</span>
                            </span>
                            <span>
                                <MessageOutlined style="margin-right: 8px" />
                                <span>{{ item.comments }}</span>
                            </span>
                        </template>
                    </a-list-item>
                </router-link>
            </template>
        </a-list>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from 'vue'

import {
    LikeOutlined,
    EyeOutlined,
    MessageOutlined,
    FieldTimeOutlined
} from '@ant-design/icons-vue'
// import { IArticleList } from '../config/home-config'
import { formatDate } from '@/utils/time'
import { contentRemove } from '@/utils/contentRemove'
import { useStore } from 'vuex'

export default defineComponent({
    components: {
        LikeOutlined,
        EyeOutlined,
        MessageOutlined,
        FieldTimeOutlined
    },
    setup() {
        const store = useStore()

        //从vuex获取搜索文章列表
        const searchList: ComputedRef = computed(() => {
            return store.state.article.searchList
        })

        const searchValue: ComputedRef = computed(() => {
            return store.state.article.searchValue
        })

        //List列表分页属性
        const paginationProps: ComputedRef = computed(() => {
            return {
                showQuickJumper: true,
                pageSize: 10,
                total: store.state.article.searchList.length,
                hideOnSinglePage: true,
                onChange() {
                    window.scroll(0, 0)
                }
            }
        })

        //获取文章列表
        const getArticleList = (): void => {
            store.dispatch('article/searchAction', '')
        }

        onMounted(() => {
            getArticleList()
        })

        return {
            paginationProps,
            searchList,
            searchValue,
            formatDate,
            contentRemove
        }
    }
})
</script>

<style scoped lang="less">
.article {
    padding: 10px 5%;
    height: 100%;
    margin-bottom: 50px;
    .itemTitle {
        &:hover {
            color: rgb(135, 184, 228);
        }
    }
}
:deep .ant-list-pagination {
    text-align: center;
}
</style>
