<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark-bg text-white font-sans">
    <NavBar />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition 
          enter-active-class="transition opacity-100 ease-out duration-200"
          leave-active-class="transition opacity-0 ease-in duration-150"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>