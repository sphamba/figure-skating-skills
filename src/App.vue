<template>
  <div :class="['app-container', { 'dark-theme': isDarkMode }]">
    <Header />
    
    <main class="main-content">
      <div class="content-wrapper">
        <div class="left-panel">
          <Card>
            <template #content>
              <SkillSelector />
            </template>
          </Card>
        </div>

        <div class="right-panel">
          <Card>
            <template #content>
              <ProgressDisplay />
            </template>
          </Card>
        </div>
      </div>

      <div class="stats-section">
        <Card>
          <template #content>
            <ProgressOverview />
          </template>
        </Card>
      </div>

      <ResetButton />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSkillsStore } from './stores/skills'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SkillSelector from './components/SkillSelector.vue'
import ProgressDisplay from './components/ProgressDisplay.vue'
import ProgressOverview from './components/ProgressOverview.vue'
import ResetButton from './components/ResetButton.vue'
import Card from 'primevue/card'

const skillsStore = useSkillsStore()
const isDarkMode = ref(false)

function updateDarkMode() {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (isDarkMode.value) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
}

watch(isDarkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
})

onMounted(() => {
  updateDarkMode()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDarkMode)
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-ground);
}

.main-content {
  flex: 1;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 960px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

.left-panel,
.right-panel {
  min-width: 0;
}

.stats-section {
  margin-top: 1rem;
}
.stats-section :deep(.p-card-body) {
  padding: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin-top: 0.25rem;
}
</style>
