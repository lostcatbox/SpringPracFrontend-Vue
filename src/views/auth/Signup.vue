<template>
  <form @submit.prevent="handleSubmit">
    <label>Email :</label>
    <input type="username" name="username" v-model="email" required>

    <label>Password :</label>
    <input type="password" name="password" v-model="password" required>

    <label>Nickname :</label>
    <input type="nickname" name="nickname" v-model="nickname" required>
    <br>
    <label>Auth :</label>
    <input type="radio" name="auth" value="ROLE_ADMIN,ROLE_USER" v-model="auth"> admin
    <input type="radio" name="auth" value="ROLE_USER" checked="checked" v-model="auth"> user <br>


    <div class="button">
      <button class="submit" type="submit">Sign up here</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      email: '',
      password: '',
      nickname: '',
      passwordError: '',
      auth: 'ROLE_USER' //default
    }
  },
  methods:{
    handleSubmit(){
      //validate password field length
      this.passwordError = this.password.length < 5 ?
          '': "password should be longer than 5";

      if (!this.passwordError) {
        console.log(this.email);
        console.log(this.password);
        console.log(this.nickname);
        console.log(this.auth);
        alert("password should be longer than 6");
      } else {
        axios.post('/signup',
            {
              "email": this.email,
              "password": this.password,
              "nickname": this.nickname,
              "auth": this.auth
            })
            .then((res) => {
              console.log(res);
              alert('회원가입 성공하였습니다.');
              this.$router.push({
                path: './login'
              })
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        });
      }
      },
  }
}
</script>
