<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="bg-card-bg border-t border-gray-800 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      
      <div class="text-center md:text-left">
        <p class="text-white font-bold text-lg">&copy; {{ currentYear }} Kyriq Cole.</p>
        <p class="text-gray-500 text-sm mt-1">Built with Vue 3 & Deployed on Homelab.</p>
      </div>

      <div class="flex flex-col items-center md:items-end gap-4">
        <div class="flex gap-6 font-medium items-center">
          <a href="https://github.com/KyriqC" target="_blank" class="text-gray-400 hover:text-celtics-green transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/kyriq-cole/" target="_blank" class="text-gray-400 hover:text-celtics-green transition-colors">LinkedIn</a>
          
          <a href="mailto:kecole2@cougarnet.uh.edu" class="text-celtics-green font-bold hover:text-white transition-colors">
            Email Me
          </a>
        </div>
        
        <div class="flex items-center gap-2 px-3 py-1 bg-dark-bg rounded-full border border-gray-800">
          <span class="w-2 h-2 rounded-full bg-celtics-green animate-pulse"></span>
          <span class="text-xs text-celtics-green font-bold tracking-wide uppercase">System Operational</span>
        </div>
      </div>

    </div>
  </footer>
</template>