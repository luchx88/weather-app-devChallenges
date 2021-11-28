<template>
  <section class="highligths-container">
    <div class="card primary wind-container">
      <p class="title">Wind Status</p>
      <p class="content">{{ todaysData.wind.speed }}<span>m/s</span></p>
      <div class="wind-direction foot">
        <span :style="`transform: rotate(${windDirArrow}deg)`"></span>
        <p>{{ windDirStr }}</p>
      </div>
    </div>
    <div class="card primary humidity-container">
      <p class="title">Humidity</p>
      <p class="content">{{ todaysData.main.humidity }}<span>%</span></p>
      <div class="humidity-bar-container foot">
        <div class="humidity-scale-container">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div class="humidity-bar">
          <span>
            <span :style="`width: ${todaysData.main.humidity}%`"></span>
          </span>
        </div>
        <div class="humidity-percentage-container">
          <span>%</span>
        </div>
      </div>
    </div>
    <div class="card secondary visibility-container">
      <p class="title">Visibility</p>
      <p class="content">{{ visibility }}<span>km</span></p>
    </div>
    <div class="card secondary air-pressure-container">
      <p class="title">Air Pressure</p>
      <p class="content">{{ todaysData.main.pressure }}<span>hPa</span></p>
    </div>
  </section>
</template>

<script>
const windDirection = (deg) => {
  if ((deg <= 10 && deg >= 0) || (deg >= 350 && deg <= 360)) return "N";
  if (deg <= 100 && deg >= 80) return "E";
  if (deg <= 190 && deg >= 170) return "E";
  if (deg <= 280 && deg >= 270) return "E";
  if (deg > 0 && deg <= 90) {
    return "ENE";
  }
  if (deg > 90 && deg <= 180) {
    return "ESE";
  }
  if (deg > 180 && deg <= 270) {
    return "WSW";
  }
  if (deg > 270 && deg <= 360) {
    return "WNW";
  }
};

export default {
  props: ["todaysData"],
  computed: {
    visibility() {
      return this.todaysData.visibility / 1000;
    },
    windDirArrow() {
      return -this.todaysData.wind.deg + 90;
    },
    windDirStr() {
      return windDirection(this.todaysData.wind.deg);
    },
  },
};
</script>

<style scoped>
.highligths-container {
  display: grid;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 300px;
  gap: 20px;
  margin-bottom: 100px;
}
.card {
  background: #1e213a;
  color: #e7e7eb;
  width: 300px;
  text-align: center;
}
.primary {
  height: 200px;
}
.secondary {
  height: 160px;
}
.title {
  margin: 20px 0 10px;
  font-size: 1rem;
}
.content {
  font-size: 4rem;
  font-weight: 600;
}
.content span {
  font-size: 2rem;
  font-weight: 500;
}
.foot {
  margin-top: 20px;
  font-size: 0.9rem;
}
.wind-direction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wind-direction span {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-image: url("../assets/icons/arrow.svg");
}
.humidity-bar-container {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.7rem;
  font-weight: 300;
}
.humidity-scale-container {
  display: flex;
  justify-content: space-between;
}
.humidity-percentage-container {
  display: flex;
  justify-content: flex-end;
}
.humidity-bar {
  width: 100%;
}
.humidity-bar > span {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 8px;
  background: #e7e7eb;
  border-radius: 10px;
  overflow: hidden;
}
.humidity-bar > span > span {
  position: absolute;
  left: 0;
  display: inline-block;
  height: 8px;
  background: #ffec65;
}
@media (min-width: 700px) {
  .highligths-container {
    grid-template-columns: 300px 300px;
  }
}
</style>
