<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="climate && coord"
      class="w-full max-w-xs min-w-64 p-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700 gap-4"
    >
      <h5 class="text-2xl font-medium text-gray-500 dark:text-gray-400">
        Clima agora em:
      </h5>

      <h5
        class="text-2xl font-bold text-gray-800 dark:text-gray-400 text-center"
        v-if="coord.state !== 'Estado não encontrado'"
      >
        {{ coord.name }} - {{ FormateNameState(coord.state) }}
      </h5>

      <h5
        class="text-2xl font-bold text-gray-800 dark:text-gray-400 text-center"
        v-else
      >
        {{ coord.name }} - {{ coord.country}}
      </h5>
      <div class="flex items-center text-gray-900 dark:text-white gap-1">
        <font-awesome-icon icon="cloud-sun" class="text-3xl" />
        <span class="text-5xl font-extrabold tracking-tight">{{
          Math.round(climate.temp)
        }}</span>
        <span class="ms-1 text-5xl font-bold text-gray-900 dark:text-gray-400"
          >°</span
        >
      </div>
      <div class="flex gap-1 items-center">
        <font-awesome-icon icon="wind" class="text-medium text-gray-500" />
        <span class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">
          Sensação {{ Math.round(climate.feels_like) }} °
        </span>
      </div>

      <div
        class="flex gap-1 items-center border-t-2 w-full justify-between p-3"
      >
        <span class="ms-1 text-md font-medium text-gray-700 dark:text-gray-400">
          <font-awesome-icon icon="bookmark" class="text-md text-red-400" />
          Max
        </span>

        <span class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">
          {{ Math.round(climate.temp_max) }} °
        </span>
      </div>

      <div
        class="flex gap-1 items-center border-t-2 w-full justify-between p-3"
      >
        <span class="ms-1 text-md font-medium text-gray-700 dark:text-gray-400">
          <font-awesome-icon icon="bookmark" class="text-md text-blue-400" />
          Min
        </span>

        <span class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">
          {{ Math.round(climate.temp_min) }} °
        </span>
      </div>

      <div
        class="flex gap-1 items-center border-t-2 w-full justify-between p-3"
      >
        <span class="ms-1 text-md font-medium text-gray-700 dark:text-gray-400">
          <font-awesome-icon icon="bookmark" class="text-md text-emerald-600" />
          Umidade
        </span>

        <span class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">
          {{ climate.humidity }} %
        </span>
      </div>
    </div>

    <div v-else>
      <CardTempSkeleton />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { FormateNameState } from "@/utils/formatedItems";
import CardTempSkeleton from "./cardTempSkeleton.vue";

const props = defineProps({
  coord: {
    type: Object,
    required: true
  },
  climate: {
    type: Object,
    required: true
  }
}); 


</script>
