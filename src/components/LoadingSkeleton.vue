<template>
  <div class="animate-pulse space-y-8">
    <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-2xl border border-gray-100">
      
      <div class="flex gap-4 mb-4">
        <div class="h-4 w-24 bg-gray-200 rounded"></div>
        <div class="h-4 w-16 bg-gray-200 rounded"></div>
        <div class="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      
      <div class="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
      
      <div class="space-y-2 mb-6">
        <div class="h-4 w-full bg-gray-200 rounded"></div>
        <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
      
      <div class="h-5 w-32 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>