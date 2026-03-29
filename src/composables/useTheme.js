import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme-mode'

const isDarkMode = ref(false)
let initialized = false

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
}

function initTheme() {
  if (initialized) return
  initialized = true

  isDarkMode.value = getInitialTheme()
  applyTheme()

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme()
    }
  })
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem(STORAGE_KEY, isDarkMode.value ? 'dark' : 'light')
  applyTheme()
}

watch(isDarkMode, applyTheme)

export function useTheme() {
  initTheme()
  return {
    isDarkMode,
    toggleDarkMode
  }
}
