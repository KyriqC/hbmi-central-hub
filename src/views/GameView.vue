<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { fetchSongs } from '../services/sheets'

// --------------------
// State
// --------------------
const allSongs         = ref([])   // full DB from Sheets
const gameQueue        = ref([])   // shuffled subset for this game
const isPlaying        = ref(false)
const isGameOver       = ref(false)
const score            = ref(0)
const timeLeft         = ref(60)
const selectedTime     = ref(60)
const currentSongIndex = ref(0)
const userGuess        = ref('')
const feedbackMessage  = ref('')
const feedbackColor    = ref('')
const selectedArtist   = ref('All')
const currentSnippet   = ref('')
const gameHistory      = ref([])
const hasUsedHint      = ref(false)

let timerInterval = null

// --------------------
// Lifecycle
// --------------------
onMounted(async () => {
  try {
    const songs = await fetchSongs()

    if (songs && songs.length > 0) {
      allSongs.value = songs
    } else {
      feedbackMessage.value = 'Database empty. Check Google Sheet.'
    }
  } catch (err) {
    console.error('Failed to load songs:', err)
    feedbackMessage.value = 'Error connecting to Google Sheets.'
    feedbackColor.value = 'text-red-500'
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

// --------------------
// Computed helpers
// --------------------
const artists = computed(() => {
  const unique = new Set(allSongs.value.map(s => s.artist).filter(Boolean))
  return ['All', ...Array.from(unique).sort()]
})

const currentSong = computed(() => gameQueue.value[currentSongIndex.value] || null)

const gameStatus = computed(() => {
  if (score.value >= 100) return { text: 'LEGENDARY!', class: 'text-purple-500 animate-pulse' }
  if (score.value >= 50)  return { text: 'On Fire!',    class: 'text-orange-500' }
  if (score.value > 0)    return { text: 'Heating Up...', class: 'text-blue-500' }
  return { text: 'Warming Up', class: 'text-gray-500' }
})

// Whenever the current song changes, generate a new snippet
watch(currentSong, (song) => {
  if (!song) return
  currentSnippet.value = generateSnippet(song.lyrics, 3)
})

// --------------------
// Utility functions
// --------------------
const generateSnippet = (fullLyrics, lineCount = 3) => {
  if (!fullLyrics || typeof fullLyrics !== 'string') {
    return 'Lyrics not found'
  }

  const lines = fullLyrics
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  if (lines.length === 0) return 'Lyrics not found'
  if (lines.length <= lineCount) return lines.join('\n')

  const maxStartIndex = lines.length - lineCount
  const startIndex = Math.floor(Math.random() * (maxStartIndex + 1))
  return lines.slice(startIndex, startIndex + lineCount).join('\n')
}

const resetTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--
    else endGame()
  }, 1000)
}

// --------------------
// Game flow
// --------------------
const startGame = () => {
  // Filter by artist
  const filtered =
    selectedArtist.value === 'All'
      ? [...allSongs.value]
      : allSongs.value.filter(s => s.artist === selectedArtist.value)

  if (filtered.length === 0) {
    feedbackMessage.value = `No songs found for artist '${selectedArtist.value}'!`
    feedbackColor.value = 'text-red-500'
    return
  }

  // Shuffle the songs
  filtered.sort(() => Math.random() - 0.5)

  gameQueue.value        = filtered
  score.value            = 0
  timeLeft.value         = selectedTime.value
  currentSongIndex.value = 0
  isGameOver.value       = false
  isPlaying.value        = true
  gameHistory.value      = []
  userGuess.value        = ''
  feedbackMessage.value  = ''
  feedbackColor.value    = ''
  hasUsedHint.value      = false

  if (currentSong.value) {
    currentSnippet.value = generateSnippet(currentSong.value.lyrics, 3)
  }

  resetTimer()
}

const useHint = () => {
  if (hasUsedHint.value || !currentSong.value) return

  hasUsedHint.value     = true
  currentSnippet.value  = generateSnippet(currentSong.value.lyrics, 6)
  feedbackMessage.value = 'Hint used! (Max 5 pts)'
  feedbackColor.value   = 'text-yellow-500'
}

const checkAnswer = () => {
  if (!currentSong.value || !userGuess.value) return

  const guess  = userGuess.value.toLowerCase().trim()
  const answer = currentSong.value.title.toLowerCase().trim()

  if (guess === answer) {
    const points = hasUsedHint.value ? 5 : 10
    score.value += points

    feedbackMessage.value = `Correct! +${points} Points`
    feedbackColor.value   = 'text-celtics-green'

    gameHistory.value.push({
      title:  currentSong.value.title,
      artist: currentSong.value.artist,
      status: hasUsedHint.value ? 'Correct (Hint)' : 'Correct',
      class:  'text-celtics-green font-bold'
    })

    nextSong()
  } else {
    feedbackMessage.value = 'Nope, try again!'
    feedbackColor.value   = 'text-red-500'
  }
}

const skipSong = () => {
  if (!currentSong.value) return

  feedbackMessage.value = 'Skipped! (0 Points)'
  feedbackColor.value   = 'text-gray-500'

  gameHistory.value.push({
    title:  currentSong.value.title,
    artist: currentSong.value.artist,
    status: 'Skipped',
    class:  'text-gray-500 italic'
  })

  nextSong()
}

const nextSong = () => {
  userGuess.value   = ''
  hasUsedHint.value = false

  if (currentSongIndex.value < gameQueue.value.length - 1) {
    currentSongIndex.value++
    if (currentSong.value) {
      currentSnippet.value = generateSnippet(currentSong.value.lyrics, 3)
    }
  } else {
    endGame()
  }
}

const endGame = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  isPlaying.value = false
  isGameOver.value = true
}
</script>

<template>
  <div class="container mx-auto px-4 py-16 text-center max-w-4xl min-h-screen">
    <div v-if="allSongs.length === 0" class="text-gray-400 animate-pulse font-bold text-xl">
      {{ feedbackMessage || 'Loading Song Database...' }}
    </div>

    <div v-else-if="!isPlaying && !isGameOver" class="space-y-8">
      <div>
        <h1 class="text-5xl md:text-6xl font-extrabold text-celtics-green mb-4 drop-shadow-lg">
          Lyric Blitz
        </h1>
        <p class="text-xl text-gray-400">
          Guess the <span class="font-bold text-white">Song Title</span> from the lyrics.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto bg-card-bg p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div class="text-left">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Artist Pack
          </label>
          <select
            v-model="selectedArtist"
            class="w-full p-3 bg-dark-bg text-white border border-gray-700 rounded-lg outline-none focus:border-celtics-green focus:ring-1 focus:ring-celtics-green transition-all"
          >
            <option v-for="artist in artists" :key="artist" :value="artist">
              {{ artist }}
            </option>
          </select>
        </div>

        <div class="text-left">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Time Limit
          </label>
          <div class="flex gap-2">
            <button
              @click="selectedTime = 60"
              :class="['flex-1 py-2 text-sm font-bold rounded-lg border transition-all duration-200', selectedTime === 60 ? 'bg-celtics-green border-celtics-green text-white shadow-lg transform scale-105' : 'bg-dark-bg border-gray-700 text-gray-400 hover:border-gray-500']"
            >
              60s
            </button>
            <button
              @click="selectedTime = 90"
              :class="['flex-1 py-2 text-sm font-bold rounded-lg border transition-all duration-200', selectedTime === 90 ? 'bg-celtics-green border-celtics-green text-white shadow-lg transform scale-105' : 'bg-dark-bg border-gray-700 text-gray-400 hover:border-gray-500']"
            >
              90s
            </button>
          </div>
        </div>
      </div>

      <button
        @click="startGame"
        class="bg-celtics-green text-white text-xl font-bold py-4 px-12 rounded-xl hover:bg-[#00632a] transform hover:-translate-y-1 transition-all shadow-lg shadow-green-900/20"
      >
        Start Game
      </button>
    </div>

    <div v-else-if="isPlaying" class="space-y-8 max-w-2xl mx-auto">
      <div class="flex justify-between items-end border-b border-gray-800 pb-4">
        <div class="text-left">
          <div class="text-celtics-green text-4xl font-black">
            {{ score }} <span class="text-lg text-white font-medium">pts</span>
          </div>
          <div class="text-xs uppercase tracking-wider font-bold" :class="gameStatus.class">
            {{ gameStatus.text }}
          </div>
        </div>
        <div :class="['text-3xl font-mono font-bold', timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white']">
          {{ timeLeft }}s
        </div>
      </div>

      <div class="bg-card-bg p-10 rounded-2xl border border-gray-800 min-h-[250px] flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
        <div class="absolute top-0 left-0 w-1 h-full bg-celtics-green"></div>
        <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
          Artist Hint: {{ currentSong?.artist }}
        </p>
        <h2 class="text-2xl md:text-4xl font-serif italic text-white leading-relaxed whitespace-pre-line drop-shadow-md">
          "{{ currentSnippet }}"
        </h2>
      </div>

      <div class="space-y-4">
        <input
          v-model="userGuess"
          @keyup.enter="checkAnswer"
          type="text"
          placeholder="Type Song Title..."
          class="w-full px-6 py-4 text-xl bg-dark-bg text-white border-2 border-gray-700 rounded-xl focus:outline-none focus:border-celtics-green focus:shadow-[0_0_15px_rgba(0,122,51,0.3)] text-center transition-all placeholder-gray-600"
          autofocus
        />

        <div class="flex gap-3">
          <button @click="checkAnswer" class="flex-[2] py-4 bg-celtics-green text-white font-bold rounded-xl hover:bg-[#00632a] transition-colors text-lg">
            Submit
          </button>
          <button @click="useHint" :disabled="hasUsedHint" class="flex-1 py-4 font-bold rounded-xl border border-yellow-600 text-yellow-500 hover:bg-yellow-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {{ hasUsedHint ? 'Used' : 'Hint' }}
          </button>
          <button @click="skipSong" class="flex-1 py-4 bg-gray-800 text-gray-400 font-bold rounded-xl hover:bg-gray-700 transition-colors">
            Skip
          </button>
        </div>

        <div class="h-8 font-bold text-lg" :class="feedbackColor">
          {{ feedbackMessage }}
        </div>
      </div>
    </div>

    <div v-else class="max-w-xl mx-auto py-10">
      <h2 class="text-5xl font-black text-white mb-2">Game Over!</h2>

      <div class="bg-gradient-to-br from-celtics-green to-[#004d20] text-white rounded-3xl p-10 my-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div class="text-sm font-medium uppercase tracking-widest opacity-90 mb-2">
          Final Score
        </div>
        <div class="text-8xl font-black leading-none">
          {{ score }}
        </div>
      </div>

      <div v-if="gameHistory.length > 0" class="bg-card-bg rounded-xl p-6 mb-8 text-left max-h-60 overflow-y-auto border border-gray-800">
        <h3 class="text-gray-400 text-sm font-bold uppercase mb-4 border-b border-gray-700 pb-2">
          Round Recap
        </h3>
        <div v-for="(round, idx) in gameHistory" :key="idx" class="flex justify-between py-2 border-b border-gray-800 last:border-0 text-sm">
          <span class="text-white font-medium">{{ round.title }}</span>
          <span :class="round.class">{{ round.status }}</span>
        </div>
      </div>

      <button @click="startGame" class="w-full py-4 bg-white text-dark-bg font-black text-xl rounded-xl hover:bg-gray-200 transition-colors">
        Play Again
      </button>
    </div>
  </div>
</template>