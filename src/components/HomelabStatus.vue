<script setup>
import { ref, onMounted } from 'vue'

const services = ref([
  { name: 'Portfolio Site', status: 'checking' },
  { name: 'Minecraft Bedrock', status: 'checking' } 
])

const checkStatus = async () => {
  // SIMULATION: Real logic would fetch an API
  setTimeout(() => {
    services.value[0].status = 'online'
    services.value[1].status = 'offline' 
  }, 1500)
}

onMounted(() => {
  checkStatus()
})

// Helper to get Tailwind classes based on status
const getStatusClasses = (status) => {
  if (status === 'online') return 'bg-celtics-green animate-pulse shadow-[0_0_10px_#007A33]'
  if (status === 'offline') return 'bg-red-500'
  return 'bg-yellow-500 animate-bounce'
}
</script>

<template>
  <div class="w-full bg-card-bg border border-gray-800 rounded-xl p-6 mb-12 shadow-lg">
    <h3 class="text-xl font-bold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
      <span class="w-2 h-2 rounded-full bg-celtics-green"></span>
      Live Lab Status
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="service in services" :key="service.name" class="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-gray-800">
        <span class="font-medium text-gray-300">{{ service.name }}</span>
        
        <div class="flex items-center gap-3">
          <span 
            class="w-3 h-3 rounded-full" 
            :class="getStatusClasses(service.status)"
          ></span>
          <span class="text-xs font-bold tracking-wider text-gray-500 uppercase">
            {{ service.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>