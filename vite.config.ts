import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'vue',
      '@eigenpal/docx-editor-core',
      '@eigenpal/docx-editor-vue',
      'prosemirror-state',
      'prosemirror-view',
      'prosemirror-model',
      'prosemirror-commands',
      'prosemirror-keymap',
      'prosemirror-history',
      'prosemirror-transform',
      'prosemirror-tables',
      'prosemirror-dropcursor',
      'jszip',
      'docxtemplater',
    ],
  },
})
