<template>
  <section class="todays-container__weather">
    <div class="clouds-bg">
      <img src="@/assets/imgs/Cloud-background.png" alt="" />
      <div class="clouds-bg--filter">a</div>
    </div>
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
    <div class="main-weather-data">
      <h1 class="todays-temperature">{{ temp }}<span>°C</span></h1>
      <h2 class="todays-climate">{{ todaysData.weather[0].main }}</h2>
      <h4 class="todays-date">Today - {{ date }}</h4>
      <h4 class="todays-location">
        <span></span>{{ todaysData.name }}, {{ todaysData.sys.country }}
      </h4>
    </div>
  </section>
</template>

<script>
import dateConverter from "../utils/dateConverter";
import tempConverter from "../utils/tempConverter";

export default {
  props: ["todaysData"],
  data() {
    return {};
  },
  computed: {
    date() {
      return dateConverter(this.todaysData.dt);
    },
    temp() {
      return tempConverter(this.todaysData.main.temp);
    },
    imgSrc() {
      const weather = this.todaysData.weather[0].description;
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
        weather === "light rain" ||
        weather === "light intensity drizzle" ||
        weather === "moderate rain" ||
        weather === "drizzle"
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
.todays-container__weather {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.clouds-bg {
  position: relative;
  width: 550px;
  height: 303px;
  left: calc(50% - 275px);
}
.clouds-bg > img {
  width: 550px;
  object-fit: cover;
}
.clouds-bg--filter {
  position: relative;
  top: -302px;
  width: 100%;
  height: 302px;
  background: #1e213a;
  opacity: 0.3;
}
.main-weather-img {
  position: absolute;
  width: 190px;
  top: 50px;
  left: calc(50% - 95px);
}
.main-weather-data {
  text-align: center;
  margin-bottom: 120px;
}
.todays-temperature {
  margin-bottom: 25px;
  font-size: 9rem;
  font-weight: 500;
  color: #e7e7eb;
}
.todays-temperature > span {
  font-size: 3.2rem;
  color: #a09fb1;
}
.todays-climate {
  margin-bottom: 50px;
  font-size: 2.4rem;
  font-weight: 600;
  color: #a09fb1;
}
.todays-date,
.todays-location {
  color: #88869d;
  font-size: 1.2rem;
  font-weight: 500;
}
.todays-date {
  margin-bottom: 33px;
}
.todays-location {
  display: flex;
  align-items: center;
  justify-content: center;
}
.todays-location span {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(../assets/icons/location.svg);
  background-size: contain;
}
</style>
