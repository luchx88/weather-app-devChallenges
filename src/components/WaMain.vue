<template>
  <main class="main-container">
    <section class="main-section">
      <wa-search-menu
        @send-search-location="searchLocation"
        @go-to-hist-location="goToHistory"
        :enable-search="enableSearch"
        :search-history="searchHistory"
        :search-error="searchError"
      ></wa-search-menu>
      <wa-todays
        v-if="Object.entries(todaysData).length !== 0 && enableSearch === false"
        :todaysData="todaysData"
      ></wa-todays>
    </section>
    <section class="secondary-section">
      <div class="conversion-buttons-container">
        <button>°C</button>
        <button>°F</button>
      </div>
      <div class="forecast-container">
        <wa-forecast-card
          v-for="d in dataArr"
          :key="d.dt"
          :data="d"
        ></wa-forecast-card>
      </div>
      <div
        v-if="Object.entries(todaysData).length !== 0"
        class="highlights-container"
      >
        <h2>Today's Highlights</h2>
        <wa-todays-highlights :todaysData="todaysData"></wa-todays-highlights>
      </div>
      <footer>created by @lucianocavallo8 - devChallenges.io</footer>
    </section>
  </main>
</template>

<script>
import WaSearchMenu from "@/components/WaSearchMenu.vue";
import WaTodays from "@/components/WaTodays.vue";
import WaForecastCard from "@/components/WaForecastCard.vue";
import WaTodaysHighlights from "@/components/WaTodaysHighlights.vue";
import fetchApi from "../utils/fetchApi";

export default {
  name: "Main",
  components: { WaSearchMenu, WaTodays, WaForecastCard, WaTodaysHighlights },
  data() {
    return {
      location: "",
      todaysData: {},
      dataArr: [],
      enableSearch: false,
      searchHistory: [],
      searchError: false,
    };
  },
  methods: {
    async searchLocation(locationInput) {
      if (!this.enableSearch) {
        this.enableSearch = !this.EnableSearch;
      }
      this.dataArr = [];
      this.location = locationInput;
      if (this.location === "") return;
      if (
        this.searchHistory.length > 0 &&
        this.location.toLowerCase() ===
          this.searchHistory[this.searchHistory.length - 1].toLowerCase()
      )
        return;
      // FIXME: Resolver el tema del manejo de errores en las request a la API
      // TODO: Aplicar async/await en las peticiones
      const res = await fetchApi.current(this.location);
      if (res.ok === false) {
        this.searchError = true;
        setTimeout(() => {
          this.searchError = false;
        }, 3000);
        return;
      }
      if (res.ok === true && res.status === 200) {
        console.log("status ok");
        this.enableSearch = !this.enableSearch;
        const data = await res.json();
        this.todaysData = await data;
        this.searchHistory.push(this.todaysData.name);
      }

      const dataForecast = await fetchApi.forecast(this.location);
      for (let i = 7; i < 33; i += 8) {
        this.dataArr.push(dataForecast.list[i]);
      }
    },
    goToHistory(histLocation) {
      this.enableSearch = !this.enableSearch;
      this.dataArr = [];
      this.location = histLocation.toLowerCase();

      fetchApi
        .current(this.location)
        .then((res) => res.json())
        .then((data) => {
          this.todaysData = data;
        });
      fetchApi.forecast(this.location).then((data) => {
        for (let i = 7; i < 33; i += 8) {
          this.dataArr.push(data.list[i]);
        }
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-section {
  background: #1e213a;
  height: 100%;
  min-height: 890px;
  max-height: 100vh;
}
.secondary-section {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
}
.conversion-buttons-container {
  position: absolute;
  top: 25px;
  display: none;
  width: 70%;
  justify-content: flex-end;
}
.conversion-buttons-container button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  border: none;
  margin-left: 5px;
  background: #e7e7eb;
}
.forecast-container {
  width: 85%;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 120px);
  gap: 20px;
}
.highlights-container {
  width: 85%;
  margin: 50px auto 0;
}
.highlights-container h2 {
  color: #e7e7eb;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
footer {
  position: absolute;
  bottom: 0px;
  left: calc(50% - 176.5px);
  color: #e7e7eb;
}
@media (min-width: 1000px) {
  .main-container {
    flex-direction: row;
  }
  .main-section {
    min-width: 360px;
    flex-grow: 1;
  }
  .secondary-section {
    justify-content: center;
    flex-grow: 1;
  }
  .conversion-buttons-container {
    display: flex;
  }
}
@media (min-width: 1100px) {
  .main-section {
    min-width: 450px;
  }
}
</style>
