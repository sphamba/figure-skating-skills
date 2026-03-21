<template>
  <div class="skill-selector">
    <!-- Skill -->
    <div v-if="skills.length" class="option-category">
      <SelectButton
        v-model="selectedSkill"
        :options="skills"
        option-label="label"
        option-value="value"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Direction -->
    <div v-if="skillConfig?.variants?.[0]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant0"
        :options="skillConfig.variants[0]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Edge -->
    <div v-if="skillConfig?.variants?.[1]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant1"
        :options="skillConfig.variants[1]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Additional -->
    <div v-if="skillConfig?.variants?.[2]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant2"
        :options="skillConfig.variants[2]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Style -->
    <div v-if="skillConfig?.variants?.[3]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant3"
        :options="skillConfig.variants[3]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Type -->
    <div v-if="displayTypes.length" class="option-category">
      <SelectButton
        v-model="selectedType"
        :options="displayTypes"
        option-label="label"
        option-value="value"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Rotations -->
    <div v-if="selectedTypeObj?.variants?.[0]?.length" class="option-category">
      <SelectButton
        v-model="selectedOption0"
        :options="selectedTypeObj.variants[0]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <!-- Additional Option -->
    <div v-if="selectedTypeObj?.variants?.[1]?.length" class="option-category">
      <SelectButton
        v-model="selectedOption1"
        :options="selectedTypeObj.variants[1]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSkillsStore } from '../stores/skills'
import SelectButton from 'primevue/selectbutton'

const skillsStore = useSkillsStore()

const skills = computed(() =>
  skillsStore.skills.map(name => ({ label: name, value: name }))
)

const skillConfig = computed(() => {
  if (!selectedSkill.value) return null
  return skillsStore.getSkillConfig(selectedSkill.value)
})

const displayTypes = computed(() => {
  if (!skillConfig.value) return []
  return skillConfig.value.types.map(type => ({
    label: typeof type === 'string' ? type : type.name,
    value: type
  }))
})

const selectedTypeObj = computed(() => selectedType.value)

const selectedSkill = ref(null)
const selectedVariant0 = ref(null)
const selectedVariant1 = ref(null)
const selectedVariant2 = ref(null)
const selectedVariant3 = ref(null)
const selectedType = ref(null)
const selectedOption0 = ref(null)
const selectedOption1 = ref(null)

function selectFirstIfEmpty(refObj, options) {
  if (!refObj.value && options && options.length > 0) {
    refObj.value = options[0].value || options[0]
  }
}

watch(skills, (newSkills) => {
  selectFirstIfEmpty(selectedSkill, newSkills)
}, { immediate: true })

watch(() => skillConfig.value?.variants?.[0], (options) => {
  selectFirstIfEmpty(selectedVariant0, options)
}, { immediate: true })

watch(() => skillConfig.value?.variants?.[1], (options) => {
  selectFirstIfEmpty(selectedVariant1, options)
}, { immediate: true })

watch(() => skillConfig.value?.variants?.[2], (options) => {
  selectFirstIfEmpty(selectedVariant2, options)
}, { immediate: true })

watch(() => skillConfig.value?.variants?.[3], (options) => {
  selectFirstIfEmpty(selectedVariant3, options)
}, { immediate: true })

watch(displayTypes, (options) => {
  selectFirstIfEmpty(selectedType, options)
}, { immediate: true })

watch(() => selectedTypeObj.value?.variants?.[0], (options) => {
  selectFirstIfEmpty(selectedOption0, options)
}, { immediate: true })

watch(() => selectedTypeObj.value?.variants?.[1], (options) => {
  selectFirstIfEmpty(selectedOption1, options)
}, { immediate: true })

function onSelectionChange() {
  updateSelectedPath()
}

function updateSelectedPath() {
  if (!selectedSkill.value) {
    skillsStore.resetSelectedPath()
    return
  }

  const variants = []
  if (selectedVariant0.value !== null) variants.push(selectedVariant0.value)
  if (selectedVariant1.value !== null) variants.push(selectedVariant1.value)
  if (selectedVariant2.value !== null) variants.push(selectedVariant2.value)
  if (selectedVariant3.value !== null) variants.push(selectedVariant3.value)

  const path = {
    skill: selectedSkill.value,
    variants: variants.length ? variants : null,
    type: selectedType.value,
    options: []
  }

  if (selectedOption0.value !== null) path.options.push(selectedOption0.value)
  if (selectedOption1.value !== null) path.options.push(selectedOption1.value)

  if (path.options.length === 0) path.options = null

  skillsStore.setSelectedPath(path)
}

onMounted(() => {
  if (skillsStore.selectedPath) {
    selectedSkill.value = skillsStore.selectedPath.skill
    selectedVariant0.value = skillsStore.selectedPath.variants?.[0] || null
    selectedVariant1.value = skillsStore.selectedPath.variants?.[1] || null
    selectedVariant2.value = skillsStore.selectedPath.variants?.[2] || null
    selectedVariant3.value = skillsStore.selectedPath.variants?.[3] || null
    selectedType.value = skillsStore.selectedPath.type
    selectedOption0.value = skillsStore.selectedPath.options?.[0] || null
    selectedOption1.value = skillsStore.selectedPath.options?.[1] || null
  }
})
</script>

<style scoped>
.skill-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.option-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:deep(.p-selectbutton) {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.25rem 0;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

:deep(.p-selectbutton::-webkit-scrollbar) {
  height: 6px;
}

:deep(.p-selectbutton::-webkit-scrollbar-thumb) {
  background: var(--surface-border);
  border-radius: 3px;
}

:deep(.p-selectbutton::-webkit-scrollbar-track) {
  background: var(--surface-ground);
}

:deep(.p-selectbutton .p-button) {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .skill-selector {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  :deep(.p-selectbutton .p-button) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    min-height: 44px;
  }
}

@media (max-width: 480px) {
  :deep(.p-selectbutton .p-button) {
    padding: 0.4rem 0.6rem;
    font-size: 0.813rem;
  }
}
</style>
