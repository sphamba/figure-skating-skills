<template>
  <div class="reset-section">
    <div class="reset-container">
      <Button
        label="Reset Progress"
        severity="danger"
        icon="pi pi-trash"
        @click="confirmReset"
        class="reset-button"
      />
    </div>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { useSkillsStore } from '../stores/skills'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'

const skillsStore = useSkillsStore()
const confirm = useConfirm()

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
  padding: 1rem;
}

.reset-button {
  min-width: 160px;
}
</style>