<template>
  <div>
    <!-- 댓글 데이터를 불러와 반복문으로 돌려 컴포넌트에 각각 들어가도록 한다.-->
    <div v-for="item in commentObj" :key="item.id">
      <PrCommentListItem :post-id="this.id" :commentItem="item" :reload="reload"/>
    </div>
    <!-- 댓글 쓰기 창도 아래 컴포넌트에 따로 생성.-->
    <div>
      <PrCommentCreate :post-id="this.id" :reload="reload"/>
    </div>
  </div>
</template>
<script>
import PrCommentListItem from "@/views/comments/components/PrCommentListItem";
import PrCommentCreate from "@/views/comments/components/PrCommentCreate";


export default {
  name:"PrCommentList",
  components:{
    PrCommentListItem,
    PrCommentCreate
  },
  props:{
    postId:Number
  },
  data(){
    return{
      commentObj: null,
      requestBody: this.$route.query,
      id: this.postId,
      token : localStorage.getItem("authorization"),
    }
  },
  mounted() {
    this.getCommentList()
  },
  methods:{
    getCommentList(){
      this.$axios.get(this.$serverUrl +"/basic/post/"+this.id+"/comments/",
          {
            params: this.requestBody,
            headers: {
              "Authorization": this.token,
            },
          }).then((res)=> {
            console.log(res.data)
        this.commentObj = res.data.list  //[{"id":7,"comment":"aa","createdDate":"2022.07.15 10:17","modifiedDate":"2022.07.15 10:17","user":null,"post":null,"nickname":"admin","email":"admin"},{"id":8,"comment":"111","createdDate":"2022.07.15 10:20","modifiedDate":"2022.07.15 10:20","user":null,"post":null,"nickname":"admin","email":"admin"},{"id":9,"comment":"11","createdDate":"2022.07.15 10:20","modifiedDate":"2022.07.15 10:20","user":null,"post":null,"nickname":"admin","email":"admin"}]
      })
    },
    reload(){
      this.$router.go();
    }


  }
}
</script>