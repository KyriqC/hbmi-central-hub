<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchPosts } from '../services/sheets'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  const postId = route.params.id
  try {
    const allPosts = await fetchPosts()
    post.value = allPosts.find(p => p.id === postId)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container section">
    <div class="max-w-3xl mx-auto w-full text-left">
      <RouterLink to="/blog" class="text-gray-500 hover:text-white mb-8 inline-block">&larr; Back to Corner</RouterLink>

      <div v-if="loading" class="animate-pulse text-gray-400">Loading...</div>

      <div v-else-if="!post" class="text-red-500">Post not found.</div>

      <article v-else>
  <header class="mb-10 border-b border-[#333] pb-10">
    <div v-if="post.image" class="mb-8 rounded-xl overflow-hidden shadow-lg">
      <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover max-h-[500px]" />
    </div>
    <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4">{{ post.title }}</h1>
    <div class="text-gray-500">{{ post.date }}</div>
  </header>
  <div class="prose prose-invert text-gray-300" v-html="post.content"></div>
</article>
    </div>
  </div>
</template>