/**
 * DocxEditor 演示页面
 *
 * 展示 @eigenpal/docx-editor-vue 的React封装组件功能
 */

import { useRef, useState, useCallback } from 'react';
import { Card, Button, Space, Upload, Typography, Divider, Alert } from 'antd';
import { App } from 'antd';
import { UploadOutlined, SaveOutlined, FileTextOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { DocxEditor } from '../../components/docx-editor';
import type { DocxEditorRef } from '../../components/docx-editor';

const { Title, Text } = Typography;

export default function DocEditorPage() {
  const { message } = App.useApp();
  const editorRef = useRef<DocxEditorRef>(null);
  const [documentName, setDocumentName] = useState('未命名文档.docx');
  const [isLoading, setIsLoading] = useState(false);
  const [initialDoc, setInitialDoc] = useState<ArrayBuffer | Uint8Array | Blob | File | undefined>(undefined);
  const [editorKey, setEditorKey] = useState(0);

  // 处理文件上传
  const handleFileUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    const fileObj = file as File;

    try {
      setIsLoading(true);

      // 检查文件类型
      if (!fileObj.name.endsWith('.docx')) {
        throw new Error('请上传 .docx 格式的文件');
      }

      // 检查文件大小 (支持10MB以上)
      const fileSizeMB = fileObj.size / (1024 * 1024);
      if (fileSizeMB > 50) {
        throw new Error('文件大小不能超过50MB');
      }

      // 读取文件
      const arrayBuffer = await fileObj.arrayBuffer();

      setDocumentName(fileObj.name);
      setInitialDoc(arrayBuffer);
      // 使用key强制重新创建编辑器实例
      setEditorKey(prev => prev + 1);

      message.success(`已加载: ${fileObj.name} (${fileSizeMB.toFixed(2)} MB)`);
      onSuccess?.(fileObj);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '加载文件失败';
      message.error(errorMessage);
      onError?.(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // 保存文档
  const handleSave = useCallback(async () => {
    try {
      if (!editorRef.current) {
        message.warning('编辑器未初始化');
        return;
      }

      const blob = await editorRef.current.save();
      if (!blob) {
        message.warning('无法获取文档数据');
        return;
      }

      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success('文档已保存');
    } catch (error) {
      message.error('保存失败');
    }
  }, [documentName]);

  // 新建空白文档
  const handleNewDocument = () => {
    setDocumentName('未命名文档.docx');
    setInitialDoc(undefined);
    setEditorKey(prev => prev + 1);
    message.success('已创建空白文档');
  };

  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 标题栏 */}
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ marginBottom: 8 }}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          Word文档编辑器
        </Title>
        <Text type="secondary">
          支持10MB以上大体积Word文档导入，保留原排版格式，可复制内容到模板使用
        </Text>
      </div>

      {/* 功能说明 */}
      <Alert
        message="功能特性"
        description={
          <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
            <li>支持导入10MB以上的大体积Word文档</li>
            <li>完整保留原文档的排版格式（字体、颜色、表格、图片等）</li>
            <li>支持直接复制内容，可粘贴到其他Word模板使用</li>
            <li>支持所见即所得的富文本编辑</li>
          </ul>
        }
        type="info"
        style={{ marginBottom: 16 }}
      />

      {/* 操作按钮 */}
      <Space style={{ marginBottom: 16 }}>
        <Upload
          accept=".docx"
          showUploadList={false}
          customRequest={handleFileUpload}
          disabled={isLoading}
        >
          <Button icon={<UploadOutlined />} loading={isLoading}>
            打开Word文档
          </Button>
        </Upload>

        <Button icon={<InboxOutlined />} onClick={handleNewDocument} disabled={isLoading}>
          新建空白文档
        </Button>

        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          disabled={isLoading}
        >
          保存文档
        </Button>
      </Space>

      <Divider style={{ margin: '8px 0' }} />

      {/* 编辑器区域 */}
      <Card
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        styles={{ body: { flex: 1, padding: 0, display: 'flex', flexDirection: 'column' } }}
      >
        <div style={{ flex: 1, minHeight: 500 }}>
          <DocxEditor
            key={editorKey}
            ref={editorRef}
            initialDocument={initialDoc}
            documentName={documentName}
            showToolbar={true}
            showMenuBar={true}
            showZoomControl={true}
            colorMode="light"
            onError={(error) => {
              message.error(`编辑器错误: ${error.message}`);
            }}
            style={{ height: '100%' }}
          />
        </div>
      </Card>
    </div>
  );
}
