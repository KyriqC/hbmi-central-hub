<script setup>
import { ref } from 'vue'

const skills = ref([
  { name: "Python", category: "dev" },
  { name: "Vue.js", category: "dev" },
  { name: "CompTIA Security+", category: "sec" },
  { name: "Linux / Bash", category: "ops" },
  { name: "Docker", category: "ops" },
  { name: "Systems Analysis", category: "biz" },
  { name: "AWS Basics", category: "cloud" }
])
</script>

<template>
  <section class="py-20 bg-dark-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-black text-white uppercase mb-12 border-l-4 border-celtics-green pl-4">
        Technical Arsenal
      </h2>
      
      <div class="flex flex-wrap gap-4">
        <span 
          v-for="skill in skills" 
          :key="skill.name" 
          class="px-6 py-3 bg-card-bg border border-gray-700 rounded-lg text-gray-300 font-bold tracking-wide hover:border-celtics-green hover:text-white hover:shadow-[0_0_15px_rgba(0,122,51,0.3)] transition-all duration-300 cursor-default"
        >
          {{ skill.name }}
        </span>
      </div>
    </div>
  </section>
</template>