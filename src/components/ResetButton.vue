<template>
  <div class="reset-section">
    <div class="reset-container">
      <Button
        label="Export Progress"
        severity="secondary"
        icon="pi pi-upload"
        class="reset-button"
        @click="exportProgress"
      />
      <Button
        label="Load Progress"
        severity="secondary"
        icon="pi pi-download"
        class="reset-button"
        @click="fileInput.click()"
      />
      <Button
        label="Reset Progress"
        severity="danger"
        icon="pi pi-trash"
        @click="confirmReset"
        class="reset-button"
      />
    </div>
    <input
      ref="fileInput"
      type="file"
      accept=".json,application/json"
      class="hidden-file-input"
      @change="onFileSelected"
    />
    <ConfirmDialog />
    <Dialog
      v-model:visible="errorVisible"
      header="Load Failed"
      :modal="true"
      :closable="true"
    >
      <div class="error-message">
        <i class="pi pi-exclamation-triangle error-icon"></i>
        <span>{{ errorMessage }}</span>
      </div>
      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          class="p-button-danger"
          @click="errorVisible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useSkillsStore } from '../stores/skills'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import Dialog from 'primevue/dialog'

const skillsStore = useSkillsStore()
const confirm = useConfirm()

const fileInput = ref(null)
const errorVisible = ref(false)
const errorMessage = ref('')

function confirmReset() {
  confirm.require({
    message: 'Are you sure you want to reset all progress? This action cannot be undone.',
    header: 'Reset Progress',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      skillsStore.clearProgress()
      skillsStore.resetSelectedPath()
    },
    reject: () => {
      // Optional: Do nothing on cancel
    }
  })
}

function exportProgress() {
  const data = {
    progress: skillsStore.progress,
    notes: skillsStore.notes,
    exportedAt: new Date().toISOString()
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'figure-skating-progress.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function onFileSelected(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result)
      if (!data || typeof data.progress !== 'object') {
        throw new Error('Invalid file format')
      }
      skillsStore.progress = data.progress || {}
      skillsStore.notes = data.notes || {}
    } catch (e) {
      errorMessage.value = 'The file is not a valid progress export.'
      errorVisible.value = true
    } finally {
      fileInput.value.value = ''
    }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.reset-section {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.reset-button {
  min-width: 160px;
}

.hidden-file-input {
  display: none;
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.error-icon {
  margin-top: 0.15rem;
  color: var(--primary-color);
}
</style>
