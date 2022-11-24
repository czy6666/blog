<template>
    <div class="Home">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    components: {},
    setup() {
        return {}
    }
})
</script>

<style scoped lang="less">
.Home {
    margin-left: 50px;
}
</style>
