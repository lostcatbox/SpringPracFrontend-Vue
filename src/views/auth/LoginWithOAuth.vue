<template>
  <h2>Loginning~~</h2>
</template>
<script>

export default {
  created () {
    // 컴포넌트 렌더링이 되었을 때,

    // 쿼리스트링으로부터 토큰을 획득
    const token = this.$route.query.token
    console.log('token', token)

    // 토큰이 존재하는 경우, localStorage에 저장후 board/list로 이동 //없다면 login페이지로 이동
    if (token) {
      localStorage.setItem('authorization', token);
      this.$router.replace('/board/list');
    } else {
        this.$router.replace('/login')
    }

  },
}
</script>