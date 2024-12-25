<template>
    <div class="flex items-center gap-x-2">
      {{ colorCode }}
      <div class="h-6 w-6 rounded-full border" :style="`background-color: ${colorCode}`"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{ 
    colorCode: string 
  }>();
  </script>
  
<style scoped></style>
  