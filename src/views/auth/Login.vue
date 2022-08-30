<template>
  <form @submit.prevent="handleSubmit">
    <h3>로그인</h3>
    <input placeholder="Email" name="email" v-model="email">
    <input type="password" placeholder="Password" name="password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">로그인</button>
    <button v-if="isPending" disable>Loading</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin' //js 파일안에 userLogin
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const{ error, login, isPending } = useLogin()
    const store = new useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      //사용자 로그인 처리
      await login(email.value, password.value)

      if (store.state.auth.status.loggedIn) {
        router.push({ name: 'BoardList' })
      }
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>

<style>

</style>