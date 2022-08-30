<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>등록일시</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in list" :key="idx">
        <td>{{ row.id }}</td>
        <td><a v-on:click="fnView(`${row.id}`)">{{ row.postName }}</a></td>
        <td>{{ row.content }}</td>
        <td>{{ row.user.email}}</td>
        <td>{{ row.createdDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      token : localStorage.getItem("authorization")
    };
  },


  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.requestBody = { // 데이터 전송
        keyword: this.keyword,
        page: this.page,
        size: this.size,
      }

      this.$axios.get(this.$serverUrl + "/basic/post", {
        params: this.requestBody,
        headers: {
          "Authorization": this.token
        }
      }).then((res) => {
        console.log(res.data);

        this.list = res.data.list  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(id){
      this.requestBody.id = id
      this.$router.push({
        path: './detail',
        query: this.requestBody,
        headers: {
          "Authorization": this.token
        }
      })
    },
    fnWrite(){
      this.$router.push({
        path: './write'
      })
  },

  },
}
</script>