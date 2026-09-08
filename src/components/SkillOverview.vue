<template>
  <div class="skill-overview flex-col gap-0.75">
    <h3 class="section-title section-title--primary">Skill overview</h3>

    <div v-if="!selectedSkill" class="empty-state text-secondary">
      Select a skill to see its levels.
    </div>

    <div v-else class="overview-context">
      <Tag :value="typeDisplayName" severity="info" />
    </div>

    <div v-if="selectedSkill && leafSkills.length" class="overview-list">
      <div
        v-for="(leaf, index) in leafSkills"
        :key="index"
        class="overview-row"
        :class="{ 'overview-row--selected': leaf.isSelected }"
      >
        <div class="row-tags">
          <Tag
            v-for="(part, i) in leaf.parts"
            :key="i"
            :value="part"
            severity="secondary"
            size="small"
          />
        </div>
        <div class="row-rating">
          <StarDisplay :average="leaf.rating" />
        </div>
      </div>
    </div>

    <div v-else class="empty-state text-secondary">
      No levels found for the selected skill.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSkillsStore } from '../stores/skills'
import Tag from 'primevue/tag'
import StarDisplay from './StarDisplay.vue'

const skillsStore = useSkillsStore()

const selectedPath = computed(() => skillsStore.selectedPath)
const selectedSkill = computed(() => selectedPath.value?.skill || '')
const typeDisplayName = computed(() =>
  selectedPath.value?.type
    ? skillsStore.getTypeDisplayName(selectedPath.value.type)
    : ''
)

const leafSkills = computed(() => {
  const sp = selectedPath.value
  if (!sp || !sp.skill) return []

  const typeName = skillsStore.getTypeName(sp.type)

  const matches = skillsStore.allPaths.filter(
    p => p.skill === sp.skill && skillsStore.getTypeName(p.type) === typeName
  )

  const selectedKey = skillKey(sp)

  return matches.map(p => {
    const parts = [...(p.variants || []), ...(p.options || [])]
    return {
      parts: parts.length ? parts.map(capitalize) : [getTypeDisplayName(p.type)],
      rating: skillsStore.getRating(p),
      isSelected: skillKey(p) === selectedKey
    }
  })
})

function skillKey(path) {
  const typeName = skillsStore.getTypeName(path.type)
  const parts = [path.skill, ...(path.variants || []), typeName]
  if (path.options) parts.push(...path.options)
  return parts.join('|')
}

function getTypeDisplayName(type) {
  return skillsStore.getTypeDisplayName(type)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
.skill-overview {
  min-width: 0;
}

.overview-context {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.375rem;
}

.overview-list {
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
}

.overview-row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.125rem 0.25rem;
  border-radius: var(--border-radius);
}

.overview-row--selected {
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  box-shadow: inset 2px 0 0 0 var(--primary-color);
}

.row-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1875rem;
  min-width: 0;
}

:deep(.overview-row) {
  font-size: 0.8125rem;
}

:deep(.overview-row .p-tag) {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
}

:deep(.overview-row .star-icon) {
  font-size: 1rem;
}

:deep(.overview-row .star-display) {
  gap: 0;
}

.row-rating {
  flex: none;
}
</style>
