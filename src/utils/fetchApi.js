// "https://api.openweathermap.org/data/2.5/forecast?q=rosario&appid=0afbb77c8e062a32014294883b826aeb"
const baseForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
const baseCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=0afbb77c8e062a32014294883b826aeb";

let forecast = async (location) => {
  const res = await fetch(`${baseForecastUrl}${location}${apiKey}`);
  const data = await res.json();
  return data;

};

let current = async (location) => {
  const res = await fetch(`${baseCurrentUrl}${location}${apiKey}`);
  return res;
  // const data = await res.json();
  // return data;
};

export default { forecast, current };

// let dataObj = {}
// dataObj = JSON.parse(dataObj)

// console.log(dataObj)
// console.log(dataObj.list.length)

// let array = []

// for (let i = 2; i < 40; i += 8) {
//   array.push(dataObj.list[i])
// }

// // let dataListExtract = [0, 8, 16, 24, 32]

// array.forEach(el => {
//   const fecha = new Date(el.dt * 1000)
//   console.log(fecha)
// })
// "https://api.openweathermap.org/data/2.5/weather?q=rosario&appid=0afbb77c8e062a32014294883b826aeb"