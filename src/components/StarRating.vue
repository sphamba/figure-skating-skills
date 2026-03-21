<template>
  <div class="star-rating">
    <div
      v-for="starNum in 6"
      :key="starNum"
      class="star-row"
      :class="{ 'selected': rating === starNum - 1 }"
      @click="$emit('update:modelValue', starNum - 1)"
    >
      <div class="star-icon">
        <i v-if="starNum === 1" class="pi pi-times-circle" />
        <i v-else-if="starNum <= rating + 1" class="pi pi-star-fill" />
        <i v-else class="pi pi-star" />
      </div>
      <div class="star-label">
        <span class="star-number">{{ starNum - 1 }}</span>
        <span class="star-description">{{ getRatingDescription(starNum - 1) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

defineEmits(['update:modelValue'])

function getRatingDescription(rating) {
  const descriptions = [
    'Never attempted',
    'Attempted',
    'Can do consistently',
    'Clean',
    'Can do within a sequence',
    'Mastered'
  ]
  return descriptions[rating] || ''
}
</script>

<style scoped>
.star-rating {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.star-row:hover {
  background-color: var(--surface-hover);
}

.star-row.selected {
  background-color: var(--primary-color);
  color: var(--primary-contrast-color);
}

.star-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.star-row.selected .star-icon {
  color: var(--primary-contrast-color);
}

.star-row:not(.selected) .star-icon {
  color: var(--text-color);
}

.star-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.star-number {
  font-size: 1.25rem;
  font-weight: 700;
}

.star-description {
  font-size: 0.875rem;
  opacity: 0.9;
}
</style>
