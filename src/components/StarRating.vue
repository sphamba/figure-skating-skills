<template>
  <div class="star-rating">
    <div
      v-for="starNum in 6"
      :key="starNum"
      class="star-row"
      @click="$emit('update:modelValue', starNum - 1)"
    >
      <div class="star-icon" :class="getIconColorClass(starNum, modelValue)">
        <i v-if="starNum === 1" class="pi pi-times-circle" />
        <i v-else-if="starNum <= modelValue + 1" class="pi pi-star-fill" />
        <i v-else class="pi pi-star" />
      </div>
      <div class="star-label">
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

function getIconColorClass(starNum, rating) {
  // starNum is 1-6 representing ratings 0-5
  if (rating === 0 && starNum === 1) {
    return 'red'
  }
  if (rating >= 1 && starNum >= 2 && starNum <= rating + 1) {
    return 'yellow'
  }
  return ''
}
</script>

<style scoped>
.star-rating {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.25rem;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.star-row:hover {
  background-color: var(--surface-hover);
}

.star-icon {
  font-size: 1.3rem;
  width: 2rem;
  text-align: center;
  color: var(--text-color);
}

.star-rating .star-row .star-icon.red {
  color: #dc3545 !important;
}

.star-rating .star-row .star-icon.yellow {
  color: #ffc107 !important;
}

.star-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.star-description {
  font-size: 0.875rem;
  opacity: 0.9;
}
</style>
