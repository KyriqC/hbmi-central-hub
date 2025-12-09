<script setup>
defineProps({
  title: { type: String, default: "Something went wrong" },
  message: { type: String, default: "We couldn't load this content. Please try again." },
  showRetry: { type: Boolean, default: true }
})
defineEmits(['retry'])
</script>

<template>
  <div class="text-center py-20 px-4">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-red-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    </div>
    
    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ title }}</h2>
    <p class="text-gray-600 mb-8 max-w-md mx-auto">{{ message }}</p>
    
    <div class="flex gap-4 justify-center">
      <router-link to="/" class="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Go Home
      </router-link>
      
      <button 
        v-if="showRetry"
        @click="$emit('retry')"
        class="px-6 py-2 bg-[#1e40af] text-white rounded-lg font-medium hover:bg-blue-900 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
</template>