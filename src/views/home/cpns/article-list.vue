<template>
    <div class="article-list">
        <articleItem />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import articleItem from './article-item.vue'

export default defineComponent({
    components: {
        articleItem
    },
    setup() {
        return {}
    }
})
</script>

<style scoped></style>
