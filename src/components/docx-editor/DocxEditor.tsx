/**
 * DocxEditor React Component
 *
 * 封装 @eigenpal/docx-editor-vue 的React组件
 * 支持10MB以上大体积Word文档导入、保留原排版格式、可复制到模板使用
 */

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { renderAsync } from '@eigenpal/docx-editor-vue';
import type { Document } from '@eigenpal/docx-editor-core';
import { zhCN, deepMerge, en } from '@eigenpal/docx-editor-i18n';
import '@eigenpal/docx-editor-vue/styles.css';
import './toolbar.css';

/**
 * 预先生成的最小空docx文件的base64编码
 */
const EMPTY_DOCX_BASE64 =
  'UEsDBAoAAAAAAI8T51zXeYTquAEAALgBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbDw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJ5ZXMiPz4KPFR5cGVzIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L2NvbnRlbnQtdHlwZXMiPgogIDxEZWZhdWx0IEV4dGVuc2lvbj0icmVscyIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1wYWNrYWdlLnJlbGF0aW9uc2hpcHMreG1sIi8+CiAgPERlZmF1bHQgRXh0ZW5zaW9uPSJ4bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi94bWwiLz4KICA8T3ZlcnJpZGUgUGFydE5hbWU9Ii93b3JkL2RvY3VtZW50LnhtbCIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50Lm1haW4reG1sIi8+CjwvVHlwZXM+UEsDBAoAAAAAAI8T51wAAAAAAAAAAAAAAAAGAAAAX3JlbHMvUEsDBAoAAAAAAI8T51wgG4bqLgEAAC4BAAALAAAAX3JlbHMvLnJlbHM8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJVVEYtOCIgc3RhbmRhbG9uZT0ieWVzIj8+CjxSZWxhdGlvbnNoaXBzIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L3JlbGF0aW9uc2hpcHMiPgogIDxSZWxhdGlvbnNoaXAgSWQ9InJJZDEiIFR5cGU9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvb2ZmaWNlRG9jdW1lbnQiIFRhcmdldD0id29yZC9kb2N1bWVudC54bWwiLz4KPC9SZWxhdGlvbnNoaXBzPlBLAwQKAAAAAACPE+dcAAAAAAAAAAAAAAAABQAAAHdvcmQvUEsDBAoAAAAAAI8T51wAAAAAAAAAAAAAAAALAAAAd29yZC9fcmVscy9QSwMECgAAAAAAjxPnXIwOhdCdAAAAnQAAABwAAAB3b3JkL19yZWxzL2RvY3VtZW50LnhtbC5yZWxzPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8UmVsYXRpb25zaGlwcyB4bWxucz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL3BhY2thZ2UvMjAwNi9yZWxhdGlvbnNoaXBzIj4KPC9SZWxhdGlvbnNoaXBzPlBLAwQKAAAAAACPE+dcS/NiXJUAAACVAAAADwAAAHdvcmQvc3R5bGVzLnhtbDw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJ5ZXMiPz4KPHc6c3R5bGVzIHhtbG5zOnc9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy93b3JkcHJvY2Vzc2luZ21sLzIwMDYvbWFpbiI+CjwvdzpzdHlsZXM+UEsDBAoAAAAAAI8T51yLnTdxXwEAAF8BAAARAAAAd29yZC9kb2N1bWVudC54bWw8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJVVEYtOCIgc3RhbmRhbG9uZT0ieWVzIj8+Cjx3OmRvY3VtZW50IHhtbG5zOnc9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy93b3JkcHJvY2Vzc2luZ21sLzIwMDYvbWFpbiIgeG1sbnM6cj0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcyI+CiAgPHc6Ym9keT4KICAgIDx3OnA+CiAgICAgIDx3OnBQci8+CiAgICAgIDx3OnI+CiAgICAgICAgPHc6dD48L3c6dD4KICAgICAgPC93OnI+CiAgICA8L3c6cD4KICAgIDx3OnNlY3RQci8+CiAgPC93OmJvZHk+Cjwvdzpkb2N1bWVudD5QSwECFAAKAAAAAACPE+dc13mE6rgBAAC4AQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQIUAAoAAAAAAI8T51wAAAAAAAAAAAAAAAAGAAAAAAAAAAAAEAAAAOkBAABfcmVscy9QSwECFAAKAAAAAACPE+dcIBuG6i4BAAAuAQAACwAAAAAAAAAAAAAAAAANAgAAX3JlbHMvLnJlbHNQSwECFAAKAAAAAACPE+dcAAAAAAAAAAAAAAAABQAAAAAAAAAAABAAAABkAwAAd29yZC9QSwECFAAKAAAAAACPE+dcAAAAAAAAAAAAAAAACwAAAAAAAAAAABAAAACHAwAAd29yZC9fcmVscy9QSwECFAAKAAAAAACPE+dcjA6F0J0AAACdAAAAHAAAAAAAAAAAAAAAAACwAwAAd29yZC9fcmVscy9kb2N1bWVudC54bWwucmVsc1BLAQIUAAoAAAAAAI8T51xL82JclQAAAJUAAAAPAAAAAAAAAAAAAAAAAIcEAAB3b3JkL3N0eWxlcy54bWxQSwECFAAKAAAAAACPE+dci503cV8BAABfAQAAEQAAAAAAAAAAAAAAAABJBQAAd29yZC9kb2N1bWVudC54bWxQSwUGAAAAAAgACADgAQAA1wYAAAAA';

/**
 * 将base64字符串转换为ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * 获取空文档的ArrayBuffer
 */
function getEmptyDocxBuffer(): ArrayBuffer {
  return base64ToArrayBuffer(EMPTY_DOCX_BASE64);
}

// Props接口定义
export interface DocxEditorProps {
  /** 文档数据 */
  initialDocument?: ArrayBuffer | Uint8Array | Blob | File | null;
  /** 是否显示主工具栏 */
  showToolbar?: boolean;
  /** 是否显示文件打开按钮 */
  showFileOpen?: boolean;
  /** 是否显示帮助菜单 */
  showHelpMenu?: boolean;
  /** 是否显示菜单栏 */
  showMenuBar?: boolean;
  /** 是否显示标尺 */
  showRuler?: boolean;
  /** 文档名称 */
  documentName?: string;
  /** 是否只读 */
  readOnly?: boolean;
  /** 作者名称 */
  author?: string;
  /** 编辑器模式 */
  mode?: 'editing' | 'suggesting' | 'viewing';
  /** 模式变更回调 */
  onModeChange?: (mode: 'editing' | 'suggesting' | 'viewing') => void;
  /** 翻译覆盖 */
  i18n?: Record<string, unknown>;
  /** 主题 */
  theme?: unknown;
  /** 颜色模式 */
  colorMode?: 'light' | 'dark' | 'system';
  /** 初始缩放级别 */
  initialZoom?: number;
  /** 是否显示缩放控制 */
  showZoomControl?: boolean;
  /** 是否显示文档大纲 */
  showOutline?: boolean;
  /** 是否显示大纲按钮 */
  showOutlineButton?: boolean;
  /** 文档变化回调 */
  onChange?: (document: Document) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
  /** 打印回调 */
  onPrint?: () => void;
  /** 打开文件回调 */
  onOpen?: (file: File) => void | Promise<void>;
  /** 样式 */
  style?: React.CSSProperties;
  /** class名称 */
  className?: string;
}

// Ref接口定义
export interface DocxEditorRef {
  save: () => Promise<Blob | null>;
  saveAsArrayBuffer: () => Promise<ArrayBuffer | null>;
  setZoom: (zoom: number) => void;
  getZoom: () => number;
  getDocument: () => Document | null;
  focus: () => void;
  scrollToParaId: (paraId: string, options?: { flash?: boolean }) => boolean;
  scrollToPosition: (pmPos: number) => void;
  destroy: () => void;
}

const DocxEditor = forwardRef<DocxEditorRef, DocxEditorProps>(({
  initialDocument,
  showToolbar = true,
  showFileOpen = true,
  showHelpMenu = true,
  showMenuBar = true,
  showRuler = false,
  documentName = '未命名文档.docx',
  readOnly = false,
  author = 'User',
  mode = 'editing',
  onModeChange,
  theme,
  colorMode = 'light',
  initialZoom = 1.0,
  showZoomControl = true,
  showOutline = false,
  showOutlineButton = false,
  onChange,
  onError,
  onPrint,
  onOpen,
  style,
  className,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<Awaited<ReturnType<typeof renderAsync>> | null>(null);
  const [hasError, setHasError] = useState(false);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    save: async () => handleRef.current?.save() ?? null,
    saveAsArrayBuffer: async () => {
      const blob = await handleRef.current?.save();
      return blob ? await blob.arrayBuffer() : null;
    },
    setZoom: (zoom: number) => handleRef.current?.setZoom(zoom),
    getZoom: () => handleRef.current?.getZoom() ?? 1.0,
    getDocument: () => handleRef.current?.getDocument() ?? null,
    focus: () => handleRef.current?.focus(),
    scrollToParaId: (paraId: string, options?: { flash?: boolean }) =>
      handleRef.current?.scrollToParaId(paraId, options) ?? false,
    scrollToPosition: (pmPos: number) => handleRef.current?.scrollToPosition(pmPos),
    destroy: () => {
      if (handleRef.current) {
        try {
          handleRef.current.destroy();
        } catch (e) {
          // 忽略
        }
        handleRef.current = null;
      }
    },
  }), []);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    const initEditor = async () => {
      if (cancelled || !containerRef.current) return;

      try {
        // 合并中文翻译
        const mergedI18n = deepMerge(en, zhCN);

        const options = {
          showToolbar,
          showFileOpen,
          showHelpMenu,
          showMenuBar,
          showRuler,
          documentName,
          readOnly,
          author,
          mode,
          colorMode,
          initialZoom,
          showZoomControl,
          showOutline,
          showOutlineButton,
          onModeChange,
          onChange,
          onError: (err: Error) => {
            if (!cancelled) {
              setHasError(true);
              onError?.(err);
            }
          },
          onPrint,
          onOpen,
          i18n: mergedI18n as unknown as Parameters<typeof renderAsync>[2]['i18n'],
          theme,
        };

        const docInput = initialDocument || getEmptyDocxBuffer();
        const handle = await renderAsync(docInput, containerRef.current, options);

        if (cancelled) {
          try { handle.destroy(); } catch (e) { /* ignore */ }
          return;
        }

        handleRef.current = handle;
      } catch (err) {
        if (cancelled) return;
        setHasError(true);
        onError?.(err instanceof Error ? err : new Error(String(err)));
      }
    };

    initEditor();

    return () => {
      cancelled = true;
      if (handleRef.current) {
        try {
          handleRef.current.destroy();
        } catch (e) {
          // 忽略
        }
        handleRef.current = null;
      }
    };
  }, []);

  if (hasError) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#ff4d4f',
          ...style,
        }}
      >
        加载失败
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className || ''} ep-root`}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
});

DocxEditor.displayName = 'DocxEditor';

export default DocxEditor;
