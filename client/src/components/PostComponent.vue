<template>
    <!-- Rubriker -->

  <div class="container">
    <h1>Shoppinglista</h1>
    <h4>Vad behöver du handla idag?</h4>
    <h5>Håll koll på handlingen i realtid!</h5>

    <!-- Lägg till produkt -->
  <div class="input-group mb-3">
      <input type="text" v-model="text" class="form-control"  placeholder="Vad vill du lägga till?">
        <div class="input-group-append">
          <button v-on:click="createPost" class="btn btn-outline-success shadow-none" type="button" id="button-addon2"><i class="fas fa-plus"></i></button>
        </div>
  </div>
    <p class="error" v-if="error">{{ error }}</p>
    <!-- Slut på lägg till post -->

    <!-- Uppdaterings-component -->

       <UpdatePostComponent 
       ref="UpdatePost" 
       v-bind:updateTrigger="showUpdate"
       v-bind:postID="thisID"
      @update-post="showGoods"
      @hide-update="hideInput"
       
       />
    <!-- Läs in varor -->
     <div class="table-responsive-lg">
         <!-- Table med vue-for-loop så data lagrad i APIt läses ut -->

     <table class="table table-borderless table-hover">
        <tbody v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id">
          <tr>
              <td> {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth() + 1}/${post.createdAt.getFullYear()}` }} </td>
                  <!-- Klicka på en produkt så stryks den över i listan -->
              <td class="w-75" @click.self="e => e.target.classList.toggle('is-complete')"> {{ post.text }} </td>
              <td>         
                  <!-- knappar för delete och update som skickar med funktioner-->
                <button class="btn btn-warning" v-on:click="updatePost(post._id, post.text)"><i class="fas fa-pen"></i></button>
                <button class="btn btn-danger" v-on:click="deletePost(post._id)"><i class="fas fa-trash"></i></button>
              </td>
          </tr>
        </tbody>
    </table>
     </div>

  </div>
</template>

<script>
//Läser in Klasser och componenter
import PostService from "../PostService";
import UpdatePostComponent from "./UpdatePostComponent";

export default {
  name: "PostComponent",

  components: { UpdatePostComponent },
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      showUpdate: false,
      thisID: 0
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async updatePost(id, text) {
      this.showUpdate = !this.showUpdate;
      this.thisID = id;
      this.$refs.UpdatePost.updateItem(text);
    },
    async showGoods() {
      this.posts = await PostService.getPosts();
      this.showUpdate = false;
    },
    hideInput() {
      this.showUpdate = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4,
h5 {
  font-style: italic;
}

.container {
  background-color: #dae6e2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 2em;
}
table {
  color: #f8f8ff;
}
.is-complete {
  text-decoration: line-through;
  font-style: italic;
}

.btn-warning {
  margin-right: 0.3em;
}

.btn-outline-success,
.btn-outline-success:active:focus,
.btn-outline-success:active,
.btn-outline-success:focus {
  border-color: #237277 !important;
  color: #237277 !important;
}
.btn-outline-success:hover {
  color: #fff !important;
  background-color: #237277 !important;
}

.table-responsive-lg {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #70a3a6;
}

tr {
  border-bottom: 1px solid gray;
}

.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #237277;
  color: #fff;
}

@media screen and (max-width: 1024px) {
  .container {
    box-shadow: none;
  }

  .btn-warning {
    margin-bottom: 0.3em;
    margin-right: 0;
  }
}
</style>
