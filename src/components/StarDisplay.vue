<template>
  <div class="star-display">
    <i
      v-for="star in 5"
      :key="star"
      :class="starClass(star)"
      class="star-icon"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  average: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5
  }
})

function starClass(starPosition) {
  const value = props.average
  if (value >= starPosition) {
    return 'pi pi-star-fill star-filled'
  } else {
    return 'pi pi-star star-empty'
  }
}
</script>

<style scoped>
.star-display {
  display: inline-flex;
  gap: 0.125rem;
}



.star-filled,
.star-half {
  color: #ffc107; /* yellow */
}

.star-empty {
  color: #6c757d; /* gray */
}
</style>