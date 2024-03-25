<template>
  <div class="login-container">
    <div class="login-form" v-if="mode === 'login'">
      <h1>Hello!</h1>
      <h2>欢迎来到 Vue Admin TS!</h2>
      <el-form :model="form" ref="ruleFormRef" :rules="rules">
        <el-form-item label="" prop="name">
          <el-input v-model="form.name" :prefix-icon="User" size="large" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="form.password" :prefix-icon="Lock" size="large" placeholder="密码" show-password clearable />
        </el-form-item>
        <el-button :loading="submitting" :loading-icon="Eleme" size="large" type="primary" style="width: 50%"
          @click="confirm(ruleFormRef)">登录</el-button>
      </el-form>
      <div>
        <el-link type="primary" @click="switchMode('register')">没有账号？去注册</el-link>
      </div>
    </div>
    <div class="login-form" v-if="mode === 'register'">
      <h1>注册账号</h1>
      <h2>速度超快，注册账号后免费试用!</h2>
      <el-form :model="registerForm" ref="registerFormRef" :rules="rules">
        <el-form-item label="" prop="name">
          <el-input v-model="registerForm.name" :prefix-icon="User" size="large" placeholder="用户名" clearable />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="registerForm.password" :prefix-icon="Lock" size="large" placeholder="密码" show-password
            clearable />
        </el-form-item>
        <el-form-item label="" prop="confirm_password">
          <el-input v-model="registerForm.confirm_password" :prefix-icon="Lock" size="large" placeholder="确认密码"
            show-password clearable />
        </el-form-item>
        <el-button size="large" type="primary" style="width: 50%" @click="submit">提交</el-button>
      </el-form>
      <div>
        <el-link type="primary" @click="switchMode('login')">去登录</el-link>
      </div>
    </div>
    <VatFooter theme="dark" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import VatFooter from '@/components/VatFooter.vue'
import { User, Lock, Eleme } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const form = reactive({
  name: '',
  password: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入' }],
  password: [{ required: true, message: '请输入' }],
  confirm_password: [
    { required: true, message: '请输入' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error("两次输入的密码不匹配！"))
        } else {
          callback()
        }
      }
    }
  ]
})

const router = useRouter()
const submitting = ref(false)
function confirm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        submitting.value = false
        router.push({ path: '/' })
        ElNotification({
          title: '欢迎登录 VAT!',
          message: '',
          type: 'success',
          showClose: false
        })
      } catch (e) {
        submitting.value = false
      }
    }
  })
}

document.onkeydown = function (event) {
  if (event.key === 'Enter') {
    confirm(ruleFormRef.value)
  }
}

const mode = ref('login')
function switchMode(val: string) {
  mode.value = val
}

const registerForm = reactive({
  name: '',
  password: '',
  confirm_password: '',
})
const registerFormRef = ref<FormInstance>()
function submit() {
  registerFormRef.value?.validate(async (valid) => {
    if (valid) {
      ElMessage.success('注册成功！')
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  background-image: url(@/assets/login-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;

  .login-form {
    position: fixed;
    top: 50%;
    right: 100px;
    background-color: rgb(102, 51, 153, 0.4);
    height: 70%;
    overflow-y: scroll;
    width: 28%;
    transform: translateY(-50%);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #fff;

    h1 {
      font-size: 50px;
    }
  }

  .login-form::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 480px) {
  .login-form {
    width: 90% !important;
    right: 5% !important;
  }
}
</style>
