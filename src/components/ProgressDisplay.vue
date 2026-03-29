<template>
  <div class="progress-display card flex-col gap-1.5">
    <div v-if="selectedPath" class="skill-path">
      <h3 class="section-title section-title--primary">Selected Skill</h3>
      <div class="path-items">
        <Tag
          v-for="(variant, index) in selectedPath.variants"
          :key="index"
          :value="variant"
          severity="secondary"
        />
        <Tag
          v-for="(option, index) in selectedPath.options || []"
          :key="index"
          :value="option"
          severity="secondary"
        />
        <Tag
          v-if="selectedPath.type"
          :value="skillsStore.getTypeDisplayName(selectedPath.type)"
          severity="info"
        />
      </div>
    </div>

    <div class="rating-section">
      <h3 class="section-title section-title--primary">Progress Rating</h3>
      <StarRating v-model="currentRating" />
    </div>

    <div class="notes-section">
      <h3 class="section-title section-title--primary">Notes</h3>
      <Textarea
        v-model="currentNotes"
        autoResize
        rows="3"
        placeholder="Add notes about this skill"
        class="notes-textarea"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSkillsStore } from '../stores/skills'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
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

const currentNotes = computed({
  get: () => skillsStore.selectedNotes,
  set: (value) => {
    if (selectedPath.value) {
      skillsStore.setNotes(selectedPath.value, value)
    }
  }
})
</script>

<style scoped>
.progress-display {
  min-width: 300px;
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

.notes-section {
  border-top: 1px solid var(--surface-border);
  padding-top: 1rem;
}

.notes-textarea {
  width: 100%;
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
