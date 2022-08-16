<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <h3>{{ title }}</h3>
      <div>
        <strong class="w3-large">{{ author }}</strong>
        <br>
        <span>{{ created_at }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ contents }}</span>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
  <div>
    <h2>해당 게시글 댓글 목록</h2>
    <Comments :post-id="Number(this.id)"/>
  </div>
</template>

<script>
import Comments from "@/views/comments/Comments";

export default {
  name: "BoardDetail",
  components:{
    Comments
  },
  data() { //변수생성
    return {
      requestBody: this.$route.query, //boardlist에서 push한것 대한 쿼리 값!
      id: this.$route.query.id,
      token: localStorage.getItem("authorization"),

      title: '',
      author: '',
      contents: '',
      created_at: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      this.$axios.get(this.$serverUrl + '/basic/post/' + this.id, {
        params: this.requestBody,
        headers: {
          "Authorization": this.token
        }
      }).then((res) => {
        console.log(res.data)
        this.title = res.data.data.postName
        this.author = res.data.data.user.nickname
        this.contents = res.data.data.content
        this.created_at = res.data.data.createdDate
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.id
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnUpdate() {
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    fnDelete() {
      if (!confirm("삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/basic/post/' + this.id, {
        headers: {
          "Authorization": this.token
        }
      })
          .then(() => {
            alert('삭제되었습니다.')
            this.fnList();
          }).catch((err) => {
        console.log(err);
        alert('ERR발생')
      })
    }
  }
}
</script>
<style scoped>


</style>