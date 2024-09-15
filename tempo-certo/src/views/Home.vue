<template>
  <div>
    <div
      class="flex bg-[url('./src/assets/images/backgrounds/bg-sol.jpg')] bg-cover bg-left-top justify-center items-center py-4 w-full flex-col gap-4"
    >
      <div class="flex-1 flex justify-around gap-2">
        <div class="flex items-center gap-2 w-full">
          <div class="relative w-full max-w-sm min-w-sm">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              @keyup.enter="searchCity"
              v-model="city"
              id="default-search"
              class="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Busque uma cidade"
              required
            />
          </div>
        </div>
      </div>
      <cardTemp :coord="coord" :climate="climate" />
    </div>
    <containerFiveDaysTemp :nextFiveDays="nextFiveDays" :coord="coord"/>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from "vue";
import cardTemp from "@/components/home/cardTemp.vue";
import containerFiveDaysTemp from "@/components/home/containerFiveDaysTemp.vue";
import { getTemp, getCoordinates, getTempNextFiveDays } from "@/api/api";

const coord = ref(null);
const climate = ref(null);
const nextFiveDays = ref(null)
const city = ref("");


onMounted(async () => {
  try {
    const data = await getCoordinates("São Paulo");
    coord.value = data;

    if (coord.value) {
      const weatherData = await getTemp(coord.value.lat, coord.value.lon)
      const fiveDaysData = await getTempNextFiveDays(coord.value.lat, coord.value.lon)
      nextFiveDays.value = fiveDaysData
      climate.value = weatherData
    }
  } catch (error) {
    console.error("Erro durante a obtenção dos dados:", error);
  }
});

const searchCity = async () => {
  try {
    const data = await getCoordinates(city.value);
    city.value = "";
    coord.value = data;

    if (coord.value) {
      const weatherData = await getTemp(coord.value.lat, coord.value.lon);
      climate.value = weatherData;
      const fiveDaysData = await getTempNextFiveDays(coord.value.lat, coord.value.lon)
      nextFiveDays.value = fiveDaysData
    }
  } catch (error) {
    console.error("Erro durante a obtenção dos dados:", error);
  }
};
</script>
