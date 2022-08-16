<!-- PageHeader.vue -->
<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/board/list">게시판</router-link> |
      <router-link to="/login">로그인</router-link> |
      <router-link  to="/signup">회원가입</router-link> |
      <strong v-on:click="fnLogout">로그아웃</strong> |
<!--      구글 OAuth2 설정-->
      <a href="http://localhost:8080/oauth2/authorization/google" class="btn btn-success active" role="button">Google Login</a>

    </div>
  </header>
  <hr/>
</template>

<script>

export default {
  data() {
    return{
    loginstatus: ''
    }
  },

  methods:{
  fnLogout() {
    localStorage.removeItem('authorization')
    localStorage.removeItem('user')
    alert("로그아웃 되었습니다")
  },
  }
}
</script>

<style scoped>

</style>