<template>
  <div class="search-container">
    <button
      v-show="!enableSearch"
      @click="sendSearchLocation"
      class="search-places"
    >
      Search for places
    </button>
    <div v-show="enableSearch" class="search-input-container">
      <input
        @keyup.enter="sendSearchLocation"
        v-model="locationInput"
        type="text"
        placeholder="search location"
      />
      <br />
      <button @click="sendSearchLocation">Search</button>
    </div>
    <div class="search-error" v-show="searchError">
      <p>Your search was not found, please try again</p>
    </div>
    <div
      class="search-history-container"
      v-show="searchHistory.length > 0 && enableSearch"
    >
      <button
        class="search-history-item"
        v-for="s in searchHistory"
        :key="s"
        @click="goToHistLocation(s)"
      >
        <p>{{ s }}</p>
        <span></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaSearchBar",
  props: ["enableSearch", "searchHistory", "searchError"],
  data() {
    return {
      locationInput: "",
      searchPlaces: false,
    };
  },
  emits: ["send-search-location", "go-to-hist-location"],
  methods: {
    sendSearchLocation() {
      // this.searchPlaces = !this.searchPlaces;
      this.$emit("send-search-location", this.locationInputLower);
    },
    goToHistLocation(histItem) {
      this.$emit("go-to-hist-location", histItem);
    },
  },
  computed: {
    locationInputLower() {
      return this.locationInput.toLowerCase();
    },
  },
};
</script>

<style scoped>
.search-places {
  width: 140px;
  height: 35px;
  margin: 20px 0 65px 20px;
  background: #6e707a;
  border: none;
}
.search-input-container {
  padding: 40px 0;
  margin: 0 auto;
  width: 320px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.search-input-container button {
  width: 75px;
  font-weight: 600;
  background: #3c47e9;
  border: none;
}
.search-input-container input {
  width: 230px;
  outline: none;
  font-weight: 500;
  padding-left: 10px;
  border: 1px solid #e7e7eb;
  background: transparent;
  color: white;
}
button,
input {
  font-family: "Raleway", sans-serif;
  color: #e7e7eb;
}
button {
  cursor: pointer;
}
.search-history-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
  width: 320px;
  height: 55px;
  background: transparent;
  color: #e7e7eb;
  font-size: 1rem;
  border: 1px solid transparent;
}
.search-history-item:hover {
  border: 1px solid #e7e7eb;
}
.search-history-item > span {
  display: inline-block;
  background-image: url("../assets/imgs/arrow.png");
  width: 15px;
  height: 15px;
  background-size: contain;
  background-position: center;
}
.search-error {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -35px;
  width: 320px;
  height: 40px;
  margin: 0 auto;
  font-size: 0.9rem;
  text-align: center;
  background: #b34848;
  opacity: 1;
  color: #e7e7eb;
}
</style>
