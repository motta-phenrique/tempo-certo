<template>
  <div class="p-4 flex gap-4 flex-col" v-if="coord">
    <h5 class="text-2xl font-bold text-gray-500 dark:text-gray-400 text-center">
      Próximos 5 dias em: 
      <span class="text-xl text-gray-800" v-if="coord.state">
        
        {{ coord.name }} - {{ FormateNameState(coord.state) }}
      </span>
      <span class="text-xl text-gray-800" v-else>
        {{ coord.name }} - {{ coord.country }}
      </span>
    </h5>
    <div v-if="nextFiveDays" class="flex gap-6 justify-center flex-wrap">
      <div
        v-for="(day, index) in nextFiveDays"
        :key="index"
        class="max-w-sm min-w-64 p-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700 gap-4"
      >
        <div class="flex items-center text-gray-900 dark:text-white gap-1">
          <font-awesome-icon icon="cloud-sun" class="text-3xl" />
          <span class="text-5xl font-extrabold tracking-tight">{{
            Math.round(day.temp_max)
          }}</span>
          <span class="ms-1 text-5xl font-bold text-gray-900 dark:text-gray-400"
            >°</span
          >
        </div>
        <div class="flex gap-1 items-center">
          <font-awesome-icon icon="wind" class="text-medium text-gray-500" />
          <span
            class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400"
          >
            Dia: {{ formatedDate(day.date) }}
          </span>
        </div>

        <div
          class="flex gap-1 items-center border-t-2 w-full justify-between p-3"
        >
          <span
            class="ms-1 text-md font-medium text-gray-700 dark:text-gray-400"
          >
            <font-awesome-icon icon="bookmark" class="text-md text-blue-400" />
            Min
          </span>

          <span
            class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400"
          >
           {{ Math.round(day.temp_min) }} °
          </span>
        </div>
      </div>
    </div>

    <div v-else class="flex gap-6 justify-center flex-wrap">
      <div
        v-for="index in 5"
        :key="index"
        class="max-w-sm min-w-64 p-4 flex flex-col items-center bg-gray-200 animate-pulse border border-gray-300 rounded-lg shadow sm:p-4 gap-4"
      >
        <div class="flex items-center gap-1">
          <div class="h-12 w-12 bg-gray-300 rounded-full"></div>
          <div class="h-10 w-24 bg-gray-300 rounded"></div>
        </div>
        <div class="flex gap-1 items-center">
          <div class="h-4 w-20 bg-gray-300 rounded"></div>
        </div>

        <div
          class="flex gap-1 items-center border-t-2 w-full justify-between p-3"
        >
          <div class="h-4 w-12 bg-gray-300 rounded"></div>
          <div class="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatedDate } from "@/utils/formatedItems";
import {FormateNameState  } from "@/utils/formatedItems"

const props = defineProps({
  nextFiveDays: {
    type: Object,
    Required: true,
  },

  coord: {
    type: Object, 
    Required: true
  }
});
</script>
