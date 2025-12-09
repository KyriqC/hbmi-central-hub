<template>
  <nav class="bg-dark-bg border-b-2 border-celtics-green sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <div class="flex-shrink-0 flex items-center">
         <img src="@/assets/logo.png" alt="KYRQ Logo" class="h-12 w-auto object-contain hover:opacity-80 transition-opacity" />
        </div>

        <div class="hidden md:flex space-x-8 items-center">
          <a 
            v-for="item in navItems" 
            :key="item.name" 
            :href="item.path" 
            class="text-gray-300 hover:text-celtics-green font-medium transition-colors duration-200"
          >
            {{ item.name }}
          </a>
          
          <a href="#contact" class="text-celtics-green border border-celtics-green px-4 py-1 rounded hover:bg-celtics-green hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <div class="flex items-center md:hidden">
          <button @click="isOpen = !isOpen" class="text-gray-300 hover:text-white focus:outline-none p-2">
            <span v-if="!isOpen" class="text-3xl">☰</span>
            <span v-else class="text-3xl">✕</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden bg-card-bg border-b-2 border-celtics-green">
      <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
        <a 
          v-for="item in navItems" 
          :key="item.name" 
          :href="item.path" 
          class="block px-3 py-4 rounded-md text-lg font-medium text-gray-300 hover:text-celtics-green hover:bg-gray-800 w-full text-center border-b border-gray-700 last:border-0"
          @click="isOpen = false" 
        >
          {{ item.name }}
        </a>
        <a href="/contact" class="mt-4 mb-2 inline-block text-celtics-green font-bold border border-celtics-green px-6 py-2 rounded hover:bg-celtics-green hover:text-white" @click="isOpen = false">
            Contact
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const navItems = ref([
  { name: 'Home', path: '/' },
  { name: 'Lyric Blitz', path: '/game' }, 
  { name: 'Song Library', path: '/songs' },  
  { name: 'Corner', path: '/blog' },
  { name: 'Empathy EQ', path: '/empathy' }
]);
</script>