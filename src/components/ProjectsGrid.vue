<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    title: "Cloud Order Management System",
    description: "Led a team of 8 to build a Vue.js/Node.js dashboard for a bakery, reducing order errors by 80%. Designed data flow diagrams and managed the SDLC.",
    tags: ["Vue.js", "Systems Analysis", "Team Lead"],
    link: "https://github.com/KyriqC/kyriq-cole-emilybakescakes.git", 
    isFeatured: true 
  },
  {
    title: "Empathy Survey App",
    description: "Full-stack application measuring empathy traits with complex scoring logic and accessibility features.",
    tags: ["Node.js", "EJS", "MongoDB"],
    link: "https://github.com/KyriqC/Empathy-Survey-App",
    isFeatured: false
  },
  {
    title: "Python Automation Bot",
    description: "Automated typing bot using Selenium that interacts with web elements at adjustable human-like speeds.",
    tags: ["Python", "Selenium", "Automation"],
    link: "https://github.com/KyriqC/Typerv1",
    isFeatured: false
  }
])
</script>

<template>
  <section id="projects" class="py-20 bg-[#0f0f0f]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-black text-white uppercase mb-12 border-l-4 border-celtics-green pl-4">
        Featured Projects
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in projects" 
          :key="project.title" 
          class="bg-card-bg p-8 rounded-xl border border-gray-800 hover:border-celtics-green transition-all duration-300 hover:-translate-y-2 group flex flex-col"
          :class="{ 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-card-bg to-[#0a2010]': project.isFeatured }"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-white group-hover:text-celtics-green transition-colors">
              {{ project.title }}
            </h3>
            <a :href="project.link" target="_blank" class="text-gray-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          <p class="text-gray-400 mb-6 flex-grow leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mt-auto">
            <span 
              v-for="tag in project.tags" 
              :key="tag" 
              class="px-3 py-1 bg-dark-bg border border-gray-700 rounded-full text-xs font-medium text-gray-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>