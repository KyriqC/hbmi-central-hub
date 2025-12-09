<script setup>
import HeroSection from '../components/HeroSection.vue'
import HomelabStatus from '../components/HomelabStatus.vue'
import SkillsSection from '../components/SkillsSection.vue' 
import ProjectsGrid from '../components/ProjectsGrid.vue'
</script>

<template>
  <div class="min-h-screen bg-dark-bg">
    <HeroSection />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="lab">
      <HomelabStatus />
    </div>

    <SkillsSection />
    <ProjectsGrid />
  </div>
</template>