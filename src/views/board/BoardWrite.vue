<!--id값 있다면, update, 없다면 post생성-->
<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <h2>{{author}}</h2>
      <input type="text" v-model="postName" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
    </div>
    <div class="board-contents">
      <textarea id="" cols="30" rows="10" v-model="content" class="w3-input w3-border" style="resize: none;">
      </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      id: this.$route.query.id,
      token: localStorage.getItem("authorization"),

      postName: '',
      content: '',
      author: '',
      created_at: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.id !== undefined) {
        this.$axios.get(this.$serverUrl + '/basic/post/' + this.id, {
          params: this.requestBody,
          headers: {
            "Authorization":this.token
          }
        }).then((res) => {
          console.log(res.data)
          this.postName = res.data.data.postName
          this.author = res.data.data.user.nickname
          this.content = res.data.data.content
          this.created_at = res.data.data.createdDate
        }).catch((err) => {
          console.log(err)
          alert('ERR발생')
        })
      }
    },
    fnList() {
      delete this.requestBody.id
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView(id) {
      this.requestBody.id = id
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/basic/post'
      this.form = {
        "id": this.id,
        "postName": this.postName,
        "content": this.content,
      }

      if (this.id === undefined) {
        //INSERT
        this.$axios.post(apiUrl,
            this.form,{
              headers: {
                "Authorization": this.token
              }
            })
            .then((res) => {
              alert('글이 저장되었습니다.')
              this.fnView(res.data.data.id)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.put(apiUrl, this.form,{
          headers: {
            "Authorization": this.token
          }
        })
            .then((res) => {
              alert('글이 저장되었습니다.')
              this.fnView(res.data.data.id)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }
    }
  }
}
</script>
<style scoped>

</style>