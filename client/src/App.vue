<template>
  <div id="app">
    <!-- Laddar Vue-component för innehållet, funktionaliteten -->
    <PostComponent />
    <h6>&copy; Malin Lind</h6>
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";

export default {
  name: "App",
  components: {
    PostComponent
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital@0;1&display=swap");
body {
  font-family: "Raleway", sans-serif;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h6 {
  margin-top: 4em;
}

@media screen and (max-width: 1024px) {
  body {
    background-color: #dae6e2;
  }
}
</style>
