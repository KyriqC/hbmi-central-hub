<script setup>
// No script logic needed
</script>

<template>
  <section id="about" class="relative py-20 md:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
      
      <div class="flex-1 text-center md:text-left z-10">
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 uppercase">
          Kyriq Cole
        </h1>
        <h2 class="text-xl md:text-2xl font-bold text-celtics-green mb-6 tracking-wide">
          System Analyst & Homelab Architect
        </h2>
        
        <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
          I am an aspiring Cybersecurity Analyst and CIS Senior at the University of Houston. 
          I believe the best way to learn is by doing, which is why I build enterprise-grade 
          solutions in my home lab. From securing servers to full-stack development, 
          I build things that work.
        </p>

        <div class="flex gap-4 justify-center md:justify-start">
          <a href="#projects" class="px-8 py-3 bg-celtics-green text-white font-bold rounded-lg hover:bg-[#00632a] transition transform hover:-translate-y-1 shadow-lg shadow-green-900/20">
            View My Work
          </a>
          <a href="https://github.com/KyriqC" target="_blank" class="px-8 py-3 border border-gray-600 text-gray-300 font-bold rounded-lg hover:border-white hover:text-white transition">
            GitHub
          </a>
        </div>
      </div>

      <div class="flex-1 flex justify-center z-10">
        <div class="relative w-64 h-64 md:w-80 md:h-80">
          <div class="absolute inset-0 rounded-full border-4 border-celtics-green animate-pulse shadow-[0_0_30px_rgba(0,122,51,0.4)]"></div>
          <img 
            src="@/assets/IMG_1286.png" 
            alt="Kyriq Cole" 
            class="w-full h-full object-cover rounded-full border-4 border-dark-bg relative z-10" 
          />
        </div>
      </div>

    </div>
  </section>
</template>