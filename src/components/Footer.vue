<template>
  <footer class="app-footer card">
    <div class="footer-content">
      <a class="github-link" href="https://github.com/sphamba/figure-skating-skills" target="_blank" rel="noopener noreferrer">
        <i class="pi pi-github github-icon"></i>
        <span>GitHub</span>
      </a>
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

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: #909090;
  text-decoration: none;
}

.github-link:hover {
  color: #b0b0b0;
}

.github-icon {
  font-size: 1rem;
  color: #909090;
}

.footer-text {
  font-size: 0.875rem;
  color: #909090;
}

@media (max-width: 640px) {
  .footer-content {
    justify-content: center;
    text-align: center;
  }
}
</style>
