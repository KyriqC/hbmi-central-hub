<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchPosts } from '../services/sheets' 

const posts = ref([])
const loading = ref(true)
const error = ref(false)

const loadPosts = async () => {
  loading.value = true
  error.value = false
  try {
    const data = await fetchPosts()
    posts.value = data
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)
</script>

<template>
  <div class="py-20 min-h-screen bg-dark-bg">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-16 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
          Kyriq's Corner
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          Deep dives into Homelab architecture, Vue.js development, and the life of a CIS student.
        </p>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-card-bg h-96 rounded-2xl animate-pulse border border-gray-800"></div>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <h2 class="text-red-500 font-bold text-2xl mb-4">Failed to load content</h2>
        <button @click="loadPosts" class="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200">
          Try Again
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="(post, index) in posts" 
          :key="index" 
          class="bg-card-bg rounded-2xl border border-gray-800 overflow-hidden hover:border-celtics-green hover:-translate-y-2 transition-all duration-300 shadow-lg group flex flex-col"
        >
          <div class="h-48 w-full overflow-hidden relative">
            <img 
              :src="post.image" 
              alt="Post Thumbnail" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-60"></div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center justify-between text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">
              <span>{{ post.date }}</span>
              <span class="text-celtics-green">{{ post.author }}</span>
            </div>

            <h2 class="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-celtics-green transition-colors">
              <RouterLink :to="'/blog/' + post.id">
                {{ post.title }}
              </RouterLink>
            </h2>

            <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
              {{ post.excerpt }}
            </p>

            <div class="mt-auto pt-6 border-t border-gray-800 flex items-center justify-between">
              <div class="flex gap-2">
                <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="text-[10px] bg-[#0a2010] text-celtics-green px-2 py-1 rounded border border-green-900">
                  {{ tag }}
                </span>
              </div>
              <RouterLink :to="'/blog/' + post.id" class="text-white font-bold text-sm hover:text-celtics-green flex items-center gap-1 transition-colors">
                Read <span class="text-lg">&rarr;</span>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>