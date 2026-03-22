<template>
  <div class="skill-selector card flex-col">
	<h3 class="section-title section-title--primary">Skill selection</h3>
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

    <div v-if="skillConfig?.variants?.[0]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant0"
        :options="skillConfig.variants[0]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[1]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant1"
        :options="skillConfig.variants[1]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[2]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant2"
        :options="skillConfig.variants[2]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[3]?.length" class="option-category">
      <SelectButton
        v-model="selectedVariant3"
        :options="skillConfig.variants[3]"
        allowEmpty
        @change="onSelectionChange"
      />
    </div>

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
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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
    label: skillsStore.getTypeName(type),
    value: type
  }))
})

const selectedTypeObj = computed(() => selectedType.value)

const selectedSkill = ref(null)
const selectedType = ref(null)
const selectedVariant0 = ref(null)
const selectedVariant1 = ref(null)
const selectedVariant2 = ref(null)
const selectedVariant3 = ref(null)
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

watch(selectedSkill, () => {
  selectedType.value = null
  selectedVariant0.value = null
  selectedVariant1.value = null
  selectedVariant2.value = null
  selectedVariant3.value = null
  selectedOption0.value = null
  selectedOption1.value = null
})

watch(selectedType, () => {
  selectedOption0.value = null
  selectedOption1.value = null
})

// Variant/type auto-selection is handled in onSelectionChange with nextTick

async function onSelectionChange() {
  await nextTick()
  if (selectedSkill.value) {
    selectFirstIfEmpty(selectedType, displayTypes.value)
    selectFirstIfEmpty(selectedVariant0, skillConfig.value?.variants?.[0])
    selectFirstIfEmpty(selectedVariant1, skillConfig.value?.variants?.[1])
    selectFirstIfEmpty(selectedVariant2, skillConfig.value?.variants?.[2])
    selectFirstIfEmpty(selectedVariant3, skillConfig.value?.variants?.[3])
    selectFirstIfEmpty(selectedOption0, selectedTypeObj.value?.variants?.[0])
    selectFirstIfEmpty(selectedOption1, selectedTypeObj.value?.variants?.[1])
  }
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
    type: selectedType.value,
    variants: variants.length ? variants : null,
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
.option-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

:deep(.p-selectbutton) {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
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

:deep(.p-selectbutton .p-togglebutton) {
  flex: 0 0 auto;
  white-space: nowrap;
  overflow: visible;
}

:deep(.p-selectbutton .p-togglebutton .p-togglebutton-label) {
  white-space: nowrap;
  overflow: visible;
}

:deep(.p-selectbutton) {
  border: none;
  background: transparent;
}

:deep(.p-selectbutton .p-togglebutton) {
  border: none;
  border-radius: var(--border-radius, 6px);
  padding: 0.25rem 0.5rem;
  background: var(--surface-100);
  color: var(--surface-600);
  transition: background 0.2s, color 0.2s;
}

:deep(.p-selectbutton .p-togglebutton:hover) {
  background: var(--surface-200);
}

:deep(.p-selectbutton .p-togglebutton[aria-pressed="true"]) {
  background: var(--primary-color);
  color: var(--surface-0);
}

:deep(.p-selectbutton .p-togglebutton:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-0), 0 0 0 4px var(--primary-color);
}

@media (max-width: 768px) {
  .skill-selector {
    gap: 0rem;
  }

  :deep(.p-selectbutton .p-togglebutton) {
    padding: 0.5rem 0.75rem;
    min-height: 32px;
  }
}

@media (max-width: 480px) {
  :deep(.p-selectbutton .p-togglebutton) {
    padding: 0;
    font-size: 0.875rem;
  }
}


</style>
