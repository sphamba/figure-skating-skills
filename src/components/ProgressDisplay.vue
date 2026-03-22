<template>
  <div class="progress-display">
    <div v-if="selectedPath" class="skill-path">
      <h3 class="section-title">Selected Skill</h3>
      <div class="path-items">
        <Tag v-if="selectedPath.skill" :value="selectedPath.skill" severity="info" />
        <Tag
          v-for="(variant, index) in selectedPath.variants"
          :key="index"
          :value="variant"
          severity="secondary"
        />
        <Tag
          v-if="selectedPath.type"
          :value="typeof selectedPath.type === 'string' ? selectedPath.type : selectedPath.type.name"
          severity="warning"
        />
        <Tag
          v-for="(option, index) in selectedPath.options || []"
          :key="index"
          :value="option"
          severity="success"
        />
      </div>
    </div>

    <div class="rating-section">
      <h3 class="section-title">Progress Rating</h3>
      <StarRating v-model="currentRating" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSkillsStore } from '../stores/skills'
import Tag from 'primevue/tag'
import StarRating from './StarRating.vue'

const skillsStore = useSkillsStore()

const selectedPath = computed(() => skillsStore.selectedPath)
const currentRating = computed({
  get: () => skillsStore.selectedRating,
  set: (value) => {
    if (selectedPath.value) {
      skillsStore.setProgress(selectedPath.value, value)
    }
  }
})
</script>

<style scoped>
.progress-display {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  min-width: 300px;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.skill-path {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.path-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rating-section {
  border-top: 1px solid var(--surface-border);
  padding-top: 1rem;
}

.progress-info {
  border-top: 1px solid var(--surface-border);
  padding-top: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.info-label {
  font-weight: 600;
  color: var(--text-color-secondary);
}

.info-value {
  font-weight: 700;
  color: var(--primary-color);
}
</style>
