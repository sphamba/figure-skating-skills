<template>
  <footer class="app-footer">
    <div class="footer-content">
      <span class="footer-text">Figure Skating Skills Tracker</span>
      <span class="footer-text">Progress saved automatically</span>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 1rem;
  background: var(--surface-card);
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
