<script setup lang="ts">
import { onMounted } from 'vue'
import { useExcelStore } from '@/stores/excel'

const store = useExcelStore()

onMounted(() => {
  // initialize store; safe to call in non-Office environments
  store.init()
})
</script>

<template>
  <section id="excel-example" class="excel-example">
    <h2>Excel Interactive Example</h2>

    <div v-if="!store.isOffice">
      <p>
        You are not running inside an Office host. Open this page as an Office add-in to try the
        example.
      </p>
      <p>
        Tip: In development you can still try the UI by running the app and loading the add-in
        manifest into Office.
      </p>
    </div>

    <div v-else>
      <p v-if="!store.ready">Waiting for Office runtime...</p>

      <div v-else>
        <p>
          Host: <strong>{{ store.host ?? 'unknown' }}</strong>
        </p>
        <p>
          Active worksheet: <strong>{{ store.worksheetName ?? 'unknown' }}</strong>
        </p>
        <p>
          Selection: <strong>{{ store.selectedAddress ?? 'none' }}</strong>
        </p>

        <div class="values" v-if="store.selectedValues">
          <h4>Selected values</h4>
          <pre>{{ JSON.stringify(store.selectedValues, null, 2) }}</pre>
        </div>

        <div style="margin-top: 1rem">
          <button class="primary-btn" @click="store.writeSample()">
            Write sample to selection
          </button>
          <button class="secondary-btn" @click="store.updateSelection()">Refresh selection</button>
        </div>

        <p style="margin-top: 0.75rem; color: var(--color-muted)">
          Change the active sheet or selection in Excel to see live updates.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.excel-example {
  border: 1px dashed var(--color-border);
  padding: 1rem;
  margin-top: 1.5rem;
  border-radius: 8px;
}

pre {
  background: var(--color-background);
  padding: 0.5rem;
  overflow: auto;
}

button {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-foreground);
  color: var(--color-text);
}
.primary-btn,
.secondary-btn {
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-foreground);
  color: var(--color-text);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background-color 0.12s ease;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
}
.primary-btn {
  background: linear-gradient(
    180deg,
    var(--color-foreground) 0%,
    color-mix(in srgb, var(--color-foreground) 90%, black 10%)
  );
}
.secondary-btn {
  margin-left: 8px;
  background: transparent;
}
.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.primary-btn:active,
.secondary-btn:active {
  transform: translateY(0);
}
.primary-btn:focus,
.secondary-btn:focus {
  outline: 3px solid color-mix(in srgb, var(--color-foreground) 70%, var(--color-border) 30%);
  outline-offset: 2px;
}
</style>
