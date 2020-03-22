  <template>
      <!-- När uppdatera blivit klickad så triggas denna component som hanterar uppdateringen -->
  <div class="update-container" v-if="updateTrigger">
    <div class="input-group mb-3">
    <input type="text" id="update-post" v-model="text" class="form-control" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
      <div class="input-group-append" id="button-addon4">
            <!-- Knappar med onClick-funktioner som antingen avbryter och stänger denna component eller sparar den uppdaterade datan i databasen  -->
        <button class="btn btn-outline-success shadow-none" v-on:click="updatePost(postID)" type="button"><i class="fas fa-check-square"></i></button>
        <button class="btn btn-outline-danger shadow-none" v-on:click="closeUpdate" type="button"><i class="fas fa-window-close"></i></button>
        <p class="error" v-if="updateError">{{ updateError }}</p>
      </div>
  </div>
  </div>
  </template>

<script>
import PostService from "../PostService";

export default {
  name: "UpdatePostComponent",
  props: ["updateTrigger", "postID"],
  data() {
    return {
      text: "",
      updateError: ""
    };
  },
  methods: {
    async updatePost(id) {
      await PostService.updatePost(this.text, id);
      this.$emit("update-post");
      this.updateError = "";
      this.text = "";
    },
    updateItem(text) {
      this.text = text;
    },
    closeUpdate() {
      this.$emit("hide-update");
    }
  }
};
</script>

<style scoped>
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
.post {
  background: #cecece;
  padding: 1em;
  border-bottom: 1px solid black;
}
</style>
