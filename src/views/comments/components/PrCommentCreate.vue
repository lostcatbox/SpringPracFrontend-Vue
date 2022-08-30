<template>
  <div class="commentItem">
    <textarea
        placeholder="20자 이내로 댓글을 입력하세요"
        v-model="comment"
    ></textarea>
    <button @click="createComment">댓글달기</button>
  </div>
</template>

<script>
export default {
  name: "PrCommentCreate",
  props: {
    postId: Number,
    reload: Function
  },
  data() {
    return {
      comment: '',
      token : localStorage.getItem("authorization")
    }
  },
  methods: {
    createComment() {
      this.$axios.post(this.$serverUrl + '/basic/post/' + this.postId + '/comments/', {
        comment: this.comment
      }, {
        headers: {
          "Authorization": this.token
        }
      })
          .then((res) => {
            console.log(res)
            alert('댓글이 저장됨')
            this.reload();
          }).catch((res) => {
        console.log(res)
        alert('ERR발생')
        this.reload();
      })

    },

  },


};
</script>