<template>
  <WaMain />
</template>

<script>
import WaMain from "./components/WaMain.vue";
// import fetchApi from "./utils/fetchApi"

export default {
  name: "App",
  components: { WaMain },
};
</script>

<style>
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
body {
  background: #100e1d;
}
</style>
