<script setup>
import SongList from '../components/SongList.vue'
</script>

<template>
  <div class="py-20 min-h-screen bg-dark-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 class="text-4xl font-black text-white uppercase mb-2">Song Library</h1>
          <p class="text-gray-400 text-lg">Explore the tracks powering Lyric Blitz.</p>
        </div>
        
        <router-link 
          to="/game" 
          class="inline-block px-8 py-3 bg-celtics-green text-white font-bold rounded-lg hover:bg-[#00632a] transition-transform hover:-translate-y-1 text-center"
        >
          Play Game &rarr;
        </router-link>
      </div>

      <SongList />
      
    </div>
  </div>
</template>