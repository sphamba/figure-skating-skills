<template>
  <div class="skill-selector">
    <div class="selector-row">
      <label>Skill</label>
      <Dropdown
        v-model="selectedSkill"
        :options="skills"
        option-label="label"
        option-value="value"
        placeholder="Select a skill"
        class="w-full"
        @change="onSkillChange"
      />
    </div>

    <div v-if="skillConfig" class="selector-row">
      <label>Direction</label>
      <Dropdown
        v-if="skillConfig.variants[0]"
        v-model="selectedVariant0"
        :options="skillConfig.variants[0]"
        placeholder="Select direction"
        class="w-full"
        @change="onVariantChange(0)"
      />
    </div>

    <div v-if="skillConfig?.variants[1]" class="selector-row">
      <label>Edge</label>
      <Dropdown
        v-model="selectedVariant1"
        :options="skillConfig.variants[1]"
        placeholder="Select edge"
        class="w-full"
        @change="onVariantChange(1)"
      />
    </div>

    <div v-if="skillConfig?.variants[2]" class="selector-row">
      <label>Additional</label>
      <Dropdown
        v-model="selectedVariant2"
        :options="skillConfig.variants[2]"
        placeholder="Select additional"
        class="w-full"
        @change="onVariantChange(2)"
      />
    </div>

    <div v-if="skillConfig?.variants[3]" class="selector-row">
      <label>Style</label>
      <Dropdown
        v-model="selectedVariant3"
        :options="skillConfig.variants[3]"
        placeholder="Select style"
        class="w-full"
        @change="onVariantChange(3)"
      />
    </div>

    <div class="selector-row">
      <label>Type</label>
      <Dropdown
        v-model="selectedType"
        :options="displayTypes"
        option-label="label"
        option-value="value"
        placeholder="Select type"
        class="w-full"
        @change="onTypeChange"
      />
    </div>

    <div v-if="selectedTypeObj?.variants" class="selector-row">
      <label>Rotations</label>
      <Dropdown
        v-model="selectedOption0"
        :options="selectedTypeObj.variants[0]"
        placeholder="Select rotations"
        class="w-full"
        @change="onOptionChange(0)"
      />
    </div>

    <div v-if="selectedTypeObj?.variants?.[1]" class="selector-row">
      <label>Additional Option</label>
      <Dropdown
        v-model="selectedOption1"
        :options="selectedTypeObj.variants[1]"
        placeholder="Select additional option"
        class="w-full"
        @change="onOptionChange(1)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSkillsStore } from '../stores/skills'
import Dropdown from 'primevue/dropdown'

const skillsStore = useSkillsStore()

const skills = computed(() =>
  skillsStore.skills.map(name => ({ label: name, value: name }))
)

const skillConfig = computed(() => {
  if (!selectedSkill.value) return null
  return skillsStore.getSkillConfig(selectedSkill.value)
})

const selectedSkill = ref(null)
const selectedVariant0 = ref(null)
const selectedVariant1 = ref(null)
const selectedVariant2 = ref(null)
const selectedVariant3 = ref(null)
const selectedType = ref(null)
const selectedOption0 = ref(null)
const selectedOption1 = ref(null)

const displayTypes = computed(() => {
  if (!skillConfig.value) return []
  return skillConfig.value.types.map(type => ({
    label: typeof type === 'string' ? type : type.name,
    value: type
  }))
})

const selectedTypeObj = computed(() => {
  return selectedType.value
})

function onSkillChange() {
  selectedVariant0.value = null
  selectedVariant1.value = null
  selectedVariant2.value = null
  selectedVariant3.value = null
  selectedType.value = null
  selectedOption0.value = null
  selectedOption1.value = null
  updateSelectedPath()
}

function onVariantChange(index) {
  updateSelectedPath()
}

function onTypeChange() {
  selectedOption0.value = null
  selectedOption1.value = null
  updateSelectedPath()
}

function onOptionChange(index) {
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
    variants: variants,
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
    selectedVariant0.value = skillsStore.selectedPath.variants[0] || null
    selectedVariant1.value = skillsStore.selectedPath.variants[1] || null
    selectedVariant2.value = skillsStore.selectedPath.variants[2] || null
    selectedVariant3.value = skillsStore.selectedPath.variants[3] || null
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

.selector-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selector-row label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
}
</style>
