import axios from "axios";

const apiKEy = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getTemp(lat, long) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: apiKEy,
          units: "metric",
        },
      }
    );
    return response.data.main;
  } catch (error) {
    console.error("Erro ao obter o clima:", error);
    throw error;
  }
}

export async function getCoordinates(cityName) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: cityName,
          limit: 1,
          appid: apiKEy,
        },
      }
    );

    if (response.data.length > 0) {
      return response.data[0];
    } else {
      console.error("Nenhuma coordenada encontrada para essa cidade.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    throw error;
  }
}

export async function getTempNextFiveDays(lat, lon) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: lat,
          lon: lon,
          appid: apiKEy,
          units: "metric",
        },
      }
    );

    const forecastList = response.data.list;

    const dailyForecasts = {};

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          temps: [],
          date: date
        };
      }
      dailyForecasts[date].temps.push(item.main.temp);
    });

    const fiveDayForecast = Object.values(dailyForecasts).slice(0, 5).map((day) => ({
      date: day.date,
      temp_max: Math.max(...day.temps), // Máxima
      temp_min: Math.min(...day.temps), // Mínima
    }));

    console.log(fiveDayForecast);
    return fiveDayForecast;
  } catch (error) {
    console.error("Erro ao obter o clima:", error);
    throw error;
  }
}
