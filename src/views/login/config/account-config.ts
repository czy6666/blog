export const rules = {
    name: [
        {
            required: true,
            message: '必须输入账号',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{5,10}$/,
            message: '用户名必须是5-10个数字或字母',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '必须输入密码',
            trigger: 'blur'
        },
        {
            pattern: /^[a-z0-9]{3,}$/,
            message: '必须是三位以上的数字或字母',
            trigger: 'blur'
        }
    ]
}
