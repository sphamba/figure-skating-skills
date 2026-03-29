<template>
  <div class="skill-selector card flex-col">
	<h3 class="section-title section-title--primary">Skill selection</h3>
    <div v-if="skills.length">
      <SelectButton
        v-model="selectedSkill"
        :options="skills"
        option-label="label"
        option-value="value"
        :allowEmpty="false"
		class="skill-selection"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="displayTypes.length">
      <SelectButton
        v-model="selectedType"
        :options="displayTypes"
        option-label="label"
        option-value="value"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[0]?.length" >
      <SelectButton
        v-model="selectedVariant0"
        :options="skillConfig.variants[0]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[1]?.length">
      <SelectButton
        v-model="selectedVariant1"
        :options="skillConfig.variants[1]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[2]?.length">
      <SelectButton
        v-model="selectedVariant2"
        :options="skillConfig.variants[2]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="skillConfig?.variants?.[3]?.length">
      <SelectButton
        v-model="selectedVariant3"
        :options="skillConfig.variants[3]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="selectedTypeObj?.variants?.[0]?.length">
      <SelectButton
        v-model="selectedOption0"
        :options="selectedTypeObj.variants[0]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="selectedTypeObj?.variants?.[1]?.length">
      <SelectButton
        v-model="selectedOption1"
        :options="selectedTypeObj.variants[1]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="selectedTypeObj?.variants?.[2]?.length">
      <SelectButton
        v-model="selectedOption2"
        :options="selectedTypeObj.variants[2]"
		size="small"
        :allowEmpty="false"
        @change="onSelectionChange"
      />
    </div>

    <div v-if="selectedTypeObj?.variants?.[3]?.length">
      <SelectButton
        v-model="selectedOption3"
        :options="selectedTypeObj.variants[3]"
		size="small"
        :allowEmpty="false"
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
const selectedOption2 = ref(null)
const selectedOption3 = ref(null)

function selectFirstIfEmpty(refObj, options) {
  if (!refObj.value && options && options.length > 0) {
    refObj.value = options[0].value || options[0]
  }
}

watch(skills, (newSkills) => {
  selectFirstIfEmpty(selectedSkill, newSkills)
  if (selectedSkill.value) {
    onSelectionChange()
  }
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
  selectedOption2.value = null
  selectedOption3.value = null
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
    selectFirstIfEmpty(selectedOption2, selectedTypeObj.value?.variants?.[2])
    selectFirstIfEmpty(selectedOption3, selectedTypeObj.value?.variants?.[3])
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
    variants: variants.length ? variants : [],
    options: []
  }

  if (selectedOption0.value !== null) path.options.push(selectedOption0.value)
  if (selectedOption1.value !== null) path.options.push(selectedOption1.value)
  if (selectedOption2.value !== null) path.options.push(selectedOption2.value)
  if (selectedOption3.value !== null) path.options.push(selectedOption3.value)

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
    selectedOption2.value = skillsStore.selectedPath.options?.[2] || null
    selectedOption3.value = skillsStore.selectedPath.options?.[3] || null
    onSelectionChange()
  }
})
</script>

<style scoped>
:deep(.skill-selection .p-togglebutton-label) {
  font-weight: bold !important;
}

:deep(.p-selectbutton) {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 100%;
  padding: 0.25rem 0;
  scrollbar-width: thin;
}

:deep(.p-selectbutton .p-togglebutton) {
  flex: none;
}
</style>
