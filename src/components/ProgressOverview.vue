<template>
  <div class="progress-overview">
    <Accordion :multiple="false" value="0">
      <AccordionPanel value="0">
        <AccordionHeader>Progress Overview</AccordionHeader>
        <AccordionContent>
          <!-- Toggle for including never attempted -->
          <div class="toggle-section surface-50 border-radius">
            <div class="toggle-container">
              <InputSwitch v-model="includeNeverAttempted" />
              <span class="toggle-label">Include never attempted elements</span>
            </div>
          </div>
          
          <!-- Main Categories Section -->
          <div class="section">
            <h4 class="section-title section-title--border">Main Categories</h4>
            <div class="category-grid">
              <div 
                v-for="category in categories" 
                :key="category.key"
                class="category-row card flex-center gap-0.75 padding-0.75"
              >
                <span class="category-label">{{ category.label }}</span>
                <StarDisplay :average="category.average" />
              </div>
            </div>
          </div>
          
          <!-- Variant Groups Section -->
          <div class="section">
            <h4 class="section-title section-title--border">Variant Groups</h4>
            <div class="variant-grid">
              <div 
                v-for="variant in variantGroups" 
                :key="variant.key"
                class="variant-row card flex-center gap-0.75 padding-0.75"
              >
                <span class="variant-label">{{ variant.label }}</span>
                <StarDisplay :average="variant.average" />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSkillsStore } from '../stores/skills'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import InputSwitch from 'primevue/inputswitch'
import StarDisplay from './StarDisplay.vue'

const skillsStore = useSkillsStore()

// Load persisted toggle from localStorage
const includeNeverAttempted = ref(false)
const saved = localStorage.getItem('includeNeverAttempted')
if (saved !== null) {
  includeNeverAttempted.value = saved === 'true'
}

watch(includeNeverAttempted, (val) => {
  localStorage.setItem('includeNeverAttempted', val)
})



// Compute averages for main categories
const categories = computed(() => {
  const cats = [
    { key: 'one-foot turns', label: 'One-foot turns' },
    { key: 'two-feet turns', label: 'Two-feet turns' },
    { key: 'jumps', label: 'Jumps' },
    { key: 'spins', label: 'Spins' }
  ]
  
  return cats.map(cat => {
    // Filter paths belonging to this category
    const paths = skillsStore.allPaths.filter(p => p.skill === cat.key)
    
    // Filter by includeNeverAttempted
    const filteredPaths = includeNeverAttempted.value 
      ? paths 
      : paths.filter(p => skillsStore.getRating(p) !== 0)
    
    // Calculate average
    if (filteredPaths.length === 0) {
      return { ...cat, average: 0 }
    }
    
    const sum = filteredPaths.reduce((acc, p) => acc + skillsStore.getRating(p), 0)
    const avg = sum / filteredPaths.length
    return { ...cat, average: Math.round(avg) }
  })
})

// Compute averages for variant groups
const variantGroups = computed(() => {
  const groups = [
    { key: 'left', label: 'Left' },
    { key: 'right', label: 'Right' },
    { key: 'forward', label: 'Forward' },
    { key: 'backward', label: 'Backward' },
    { key: 'inside', label: 'Inside' },
    { key: 'outside', label: 'Outside' }
  ]
  
  return groups.map(group => {
    // Filter paths that include this variant
    const paths = skillsStore.allPaths.filter(p => p.variants.includes(group.key))
    
    // Filter by includeNeverAttempted
    const filteredPaths = includeNeverAttempted.value 
      ? paths 
      : paths.filter(p => skillsStore.getRating(p) !== 0)
    
    // Calculate average
    if (filteredPaths.length === 0) {
      return { ...group, average: 0 }
    }
    
    const sum = filteredPaths.reduce((acc, p) => acc + skillsStore.getRating(p), 0)
    const avg = sum / filteredPaths.length
    return { ...group, average: Math.round(avg) }
  })
})
</script>

<style scoped>
.progress-overview {
  margin-top: 1rem;
}

:deep(.p-accordioncontent-content) {
  padding: 1rem;
  margin: 0;
}

:deep(.p-accordionheader) {
  margin-top: -1rem;
}

.toggle-section {
  padding: 0.5rem;
  margin-bottom: 1.5rem;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.toggle-label {
  color: var(--text-color);
}

.toggle-hint {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin: 0;
}

.section {
  margin-bottom: 1.5rem;
}

.category-grid,
.variant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.category-label,
.variant-label {
  flex: 1;
  font-weight: 500;
  color: var(--text-color);
}
</style>
