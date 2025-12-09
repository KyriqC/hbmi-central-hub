<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchSongs } from '../services/sheets'

const songs = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedArtist = ref('All')

onMounted(async () => {
  try {
    const data = await fetchSongs()
    songs.value = data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const artists = computed(() => {
  const unique = new Set(songs.value.map(s => s.artist).filter(Boolean))
  return ['All', ...Array.from(unique).sort()]
})

const filteredSongs = computed(() => {
  let result = songs.value
  if (selectedArtist.value !== 'All') {
    result = result.filter(s => s.artist === selectedArtist.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(song => song.title.toLowerCase().includes(query))
  }
  return result
})
</script>

<template>
  <div class="w-full">
    
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search for a song..." 
        class="flex-1 bg-card-bg border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-celtics-green focus:ring-1 focus:ring-celtics-green transition-all"
      >
      
      <select v-model="selectedArtist" class="md:w-64 bg-card-bg border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-celtics-green focus:ring-1 focus:ring-celtics-green transition-all">
        <option v-for="artist in artists" :key="artist" :value="artist">
          {{ artist }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400 font-bold animate-pulse">
      LOADING LIBRARY...
    </div>

    <div v-else-if="filteredSongs.length === 0" class="text-center py-12 text-gray-500">
      No songs found matching your criteria.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(song, index) in filteredSongs" :key="index" class="bg-card-bg p-6 rounded-xl border border-gray-800 flex items-center gap-4 hover:border-celtics-green hover:-translate-y-1 transition-all duration-200 group">
        
        <div class="w-12 h-12 rounded-full bg-[#0a2010] flex items-center justify-center text-xl group-hover:bg-celtics-green group-hover:text-white transition-colors">
          🎵
        </div>
        
        <div class="overflow-hidden">
          <h3 class="text-white font-bold truncate group-hover:text-celtics-green transition-colors">{{ song.title }}</h3>
          <p class="text-sm text-gray-500 truncate">{{ song.artist }}</p>
        </div>
      </div>
    </div>

  </div>
</template>