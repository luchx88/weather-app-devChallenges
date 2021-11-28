<template>
  <div class="card-container">
    <p class="date">{{ date }}</p>
    <img
      src="../assets/imgs/Clear.png"
      v-if="imgSrc === 'clear'"
      alt=""
      class="main-weather-img"
    />
    <img
      src="../assets/imgs/LightCloud.png"
      v-if="imgSrc === 'clouds'"
      alt=""
      class="main-weather-img"
    />
    <img
      src="../assets/imgs/LightRain.png"
      v-if="imgSrc === 'light rain'"
      alt=""
      class="main-weather-img"
    />
    <img
      src="../assets/imgs/heavy-clouds.svg"
      v-if="imgSrc === 'mist'"
      alt=""
      class="main-weather-img"
    />
    <img
      src="../assets/imgs/Snow.png"
      v-if="imgSrc === 'snow'"
      alt=""
      class="main-weather-img"
    />
    <div class="temps-container">
      <p class="max-temp">{{ maxTemp }}°C</p>
      <p class="min-temp">{{ minTemp }}°C</p>
    </div>
  </div>
</template>

<script>
import dateConverter from "../utils/dateConverter";
import tempConverter from "../utils/tempConverter";

export default {
  props: ["data"],
  computed: {
    date() {
      return dateConverter(this.data.dt);
    },
    maxTemp() {
      return tempConverter(this.data.main.temp_max);
    },
    minTemp() {
      return tempConverter(this.data.main.temp_min);
    },
    imgSrc() {
      const weather = this.data.weather[0].description;
      if (weather === "clear sky") {
        return "clear";
      } else if (
        weather === "overcast clouds" ||
        weather === "scattered clouds" ||
        weather === "few clouds" ||
        weather === "broken clouds"
      ) {
        return "clouds";
      } else if (
        weather ===
        ("light rain" || "light intensity drizzle" || "moderate rain")
      ) {
        return "light rain";
      } else if (weather === "light snow" || weather === "snow") {
        return "snow";
      } else if (weather === "mist") {
        return "mist";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  color: #e7e7eb;
  width: 120px;
  height: 180px;
  text-align: center;
  font-weight: 500;
  background: #1e213a;
}
.date {
  margin: 15px 0 15px;
}
.main-weather-img {
  max-width: 75px;
  height: 75px;
  object-fit: contain;
}
.temps-container {
  position: relative;
  width: 70%;
  bottom: -15px;
  margin: 0 auto 0;
  display: flex;
  justify-content: space-between;
}
</style>
