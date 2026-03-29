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
import { useTheme } from '../composables/useTheme'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

const { isDarkMode, toggleDarkMode } = useTheme()
</script>

<style scoped>
.header-toolbar {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border: none;
  align-items: flex-start;
}

.header-toolbar :deep(.p-toolbar-start) {
  min-width: 0;
  flex: 1;
}

.header-left {
  display: flex;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
}

.header-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  flex-shrink: 0;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  overflow: hidden;
  white-space: normal;
}

.theme-toggle {
  color: var(--text-color);
}

.theme-toggle:hover {
  background-color: var(--surface-hover);
}
</style>
