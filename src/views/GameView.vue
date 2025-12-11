<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { fetchSongs } from '../services/sheets'

// --------------------
// State
// --------------------
const allSongs          = ref([])      // full DB from Sheets
const gameQueue         = ref([])      // shuffled subset used this run
const isPlaying         = ref(false)
const isGameOver        = ref(false)
const score             = ref(0)
const timeLeft          = ref(60)
const selectedTime      = ref(60)
const currentSongIndex  = ref(0)
const userGuess         = ref('')
const feedbackMessage   = ref('')
const feedbackColor     = ref('')
const selectedArtist    = ref('All')
const currentSnippet    = ref('')
const gameHistory       = ref([])
const hasUsedHint       = ref(false)

let timerInterval= null

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
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// --------------------
// Computed helpers
// --------------------
const artists = computed(() => {
  const unique = new Set(allSongs.value.map(s => s.artist).filter(Boolean))
  return ['All', ...unique].sort()
})

const currentSong = computed(() => gameQueue.value[currentSongIndex.value] ?? null)

const gameStatus = computed(() => {
  if (score.value >= 100) return { text: 'LEGENDARY!', class: 'text-purple-500 animate-pulse' }
  if (score.value >= 50)  return { text: 'On Fire!',    class: 'text-orange-500' }
  if (score.value > 0)    return { text: 'Heating Up...', class: 'text-blue-500' }
  return { text: 'Warming Up', class: 'text-gray-500' }
})

// When the current song changes, regenerate a snippet
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
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = window.setInterval(() => {
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
    feedbackMessage.value = 'No songs found for this artist!'
    feedbackColor.value = 'text-red-500'
    return
  }

  // Shuffle
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

  hasUsedHint.value    = true
  currentSnippet.value = generateSnippet(currentSong.value.lyrics, 6)
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
  if (timerInterval) clearInterval(timerInterval)
  isPlaying.value = false
  isGameOver.value = true
}
</script>
