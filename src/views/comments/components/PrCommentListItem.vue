<!--//PrCommentListItem 댓글 속성 정의-->
<template>
  <div class="commentItem">
    <div>{{ name }}</div>
    <div>{{ created_at }}</div>
    <input type="text" v-model="comment">
    <button @click="updateComment">수정</button>
    <button @click="deleteComment">삭제</button>
  </div>
</template>

<script>
export default {
  name:"PrCommentListItem",
  props:{
    postId: Number,
    commentItem:Object,  // //[{"id":7,"comment":"aa","createdDate":"2022.07.15 10:17","modifiedDate":"2022.07.15 10:17","user":null,"post":null,"nickname":"admin","email":"admin"},{"id":8,"comment":"111","createdDate":"2022.07.15 10:20","modifiedDate":"2022.07.15 10:20","user":null,"post":null,"nickname":"admin","email":"admin"},{"id":9,"comment":"11","createdDate":"2022.07.15 10:20","modifiedDate":"2022.07.15 10:20","user":null,"post":null,"nickname":"admin","email":"admin"}]
    reload:Function
  },
  data(){
    return{
      commentId: '',
      name:'',
      comment:'',
      created_at:'',
      token : localStorage.getItem("authorization"),

    }
  },
  created(){
    this.commentId = this.commentItem.id
    this.name = this.commentItem.nickname
    this.comment= this.commentItem.comment
    this.created_at=this.commentItem.createdDate

  },
  methods:{
    updateComment(){
        this.$axios.put(this.$serverUrl + '/basic/post/' + this.postId + '/comments/',{
          id: this.commentId,
          comment: this.comment
        },{
          headers: {
            "Authorization": this.token
          }
        })
            .then((res) => {
              alert('댓글수정완료')
              this.reload();
            }).catch((err) => {
          alert('ERR발생')
          this.reload();
        })

    },
    deleteComment(){
      this.$axios.delete(this.$serverUrl + '/basic/post/' + this.postId + '/comments/'+this.commentId, {
        headers: {
          "Authorization": this.token
        }
      })
          .then((res) => {
            alert('댓글삭제완료')
            this.reload();

          }).catch((err) => {
        alert('ERR발생')
        this.reload();
      })
    }
  }

}
</script>
<style>
.commentItem{
  border:1px solid #000;
  margin-bottom:10px;
  padding:10px;
}
</style>
