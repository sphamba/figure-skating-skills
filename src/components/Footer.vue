<template>
  <footer class="app-footer card">
    <div class="footer-content">
      <span class="footer-text">Bend your knees!</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid var(--surface-border);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-text {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

@media (max-width: 640px) {
  .footer-content {
    justify-content: center;
    text-align: center;
  }
}
</style>
