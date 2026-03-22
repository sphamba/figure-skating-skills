<template>
  <Toolbar class="header-toolbar card">
    <template #start>
      <div class="header-left">
        <i class="pi pi-skateboard header-icon" />
        <span class="header-title">Figure Skating Skills Tracker</span>
      </div>
    </template>
    
    <template #end>
      <Button
        :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
        text
        @click="toggleDarkMode"
        class="theme-toggle"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

const isDarkMode = ref(false)

function updateDarkMode() {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
}

function applyTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  applyTheme()
}

watch(isDarkMode, applyTheme)

onMounted(() => {
  updateDarkMode()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDarkMode)
})
</script>

<style scoped>
.header-toolbar {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border: none;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.theme-toggle {
  color: var(--text-color);
}

.theme-toggle:hover {
  background-color: var(--surface-hover);
}
</style>
