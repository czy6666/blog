<template>
    <div class="login-account">
        <el-form
            :rules="rules"
            :model="account"
            ref="formRef"
            status-icon
            class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="name">
                <el-input
                    v-model="account.name"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="account.password"
                    type="password"
                    autocomplete="off"
                    show-password
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { useStore } from 'vuex'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
    setup() {
        const store = useStore()

        const account = reactive({
            name: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })

        const formRef = ref<InstanceType<typeof ElForm>>()

        const loginAction = (iskeepPassword: boolean) => {
            formRef.value?.validate((valid) => {
                if (valid) {
                    //1、判断是否需要记住密码
                    if (iskeepPassword) {
                        //本地缓存
                        localCache.setCache('name', account.name)
                        localCache.setCache('password', account.password)
                    } else {
                        localCache.deleteCache('name')
                        localCache.deleteCache('password')
                    }

                    //2、开始进行登录验证
                    store.dispatch('login/accountLoginAction', { ...account })
                }
            })
        }

        return {
            account,
            rules,
            formRef,
            loginAction
        }
    }
})
</script>

<style scoped></style>
