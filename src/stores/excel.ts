import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

// Modernized Excel store: exposes reactive state about Office runtime,
// active worksheet and selection and provides a small sample writer.
export const useExcelStore = defineStore('excel', () => {
  const isOffice = ref<boolean>(typeof window.Office !== 'undefined')
  const ready = ref<boolean>(false)
  const host = ref<string | null>(null)
  const worksheetName = ref<string | null>(null)
  const selectedAddress = ref<string | null>(null)
  const selectedValues = ref<Array<Array<unknown>> | null>(null)

  // Initialize the store: attach Office handlers and fetch initial info
  async function init() {
    if (!isOffice.value) {
      ready.value = false
      return
    }

    // Wait for Office runtime to be ready
    await new Promise<void>((resolve) => {
      if (typeof window.Office !== 'undefined' && typeof window.Office.onReady === 'function') {
        window.Office.onReady(() => {
          const h = window.Office.context?.host ?? null
          host.value = h !== null ? String(h) : null
          ready.value = true
          resolve()
        })
      } else {
        // not running inside Office host
        resolve()
      }
    })

    await updateActiveInfo()

    // Attach light-weight event handlers so UI updates when user changes sheet/selection
    try {
      await Excel.run(async (context) => {
        const workbook = context.workbook

        workbook.worksheets.onActivated.add(async () => {
          // update active worksheet name and selection when worksheet changes
          await updateActiveInfo()
          return Promise.resolve()
        })

        const activeSheet = workbook.worksheets.getActiveWorksheet()
        activeSheet.onSelectionChanged.add(async () => {
          await updateSelection()
          return Promise.resolve()
        })
      })
    } catch (e) {
      // non-fatal: continue without live event handling
      console.warn('Could not attach Excel event handlers', e)
    }
  }

  // Refresh active worksheet name and current selection
  async function updateActiveInfo() {
    if (!isOffice.value) return
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet()
        sheet.load('name')
        await context.sync()
        worksheetName.value = sheet.name
        await updateSelection()
      })
    } catch (e) {
      console.error('updateActiveInfo failed', e)
    }
  }

  // Read current selection address and values into reactive store
  async function updateSelection() {
    if (!isOffice.value) return
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange()
        range.load(['address', 'values'])
        await context.sync()
        selectedAddress.value = range.address as string
        selectedValues.value = (range.values as Array<Array<unknown>>) || null
      })
    } catch (e) {
      console.error('updateSelection failed', e)
    }
  }

  // Simple sample action: write a timestamp message into the selected cell (top-left of selection)
  async function writeSample() {
    if (!isOffice.value) return
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange()
        // write a single value into the top-left cell of the selection
        range.values = [[`Updated by add-in at ${new Date().toLocaleTimeString()}`]]
        await context.sync()
        await updateSelection()
      })
    } catch (e) {
      console.error('writeSample failed', e)
    }
  }

  return {
    isOffice,
    ready,
    host,
    worksheetName,
    selectedAddress,
    selectedValues,
    init,
    updateSelection,
    writeSample
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExcelStore, import.meta.hot))
}
