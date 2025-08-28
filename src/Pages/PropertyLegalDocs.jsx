import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListLegalDocs, useUploadLegalDoc, useDeleteLegalDoc, useGetLegalDoc, useReplaceLegalDoc } from '../api/queries';
import toast from 'react-hot-toast';

export default function PropertyLegalDocs() {
  const { propertyId = '' } = useParams();
  const listQuery = useListLegalDocs(propertyId);
  const uploadMutation = useUploadLegalDoc(propertyId);
  const deleteMutation = useDeleteLegalDoc(propertyId);
  const getMutation = useGetLegalDoc(propertyId);
  const replaceMutation = useReplaceLegalDoc(propertyId);

  const [documentType, setDocumentType] = useState('');
  const [replaceId, setReplaceId] = useState('');

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await toBase64(file);
      uploadMutation.mutate({ documentType: documentType || undefined, base64: String(base64) }, {
        onSuccess: () => { toast.success('Document uploaded'); listQuery.refetch(); },
        onError: () => toast.error('Upload failed'),
      });
    } catch {
      toast.error('Failed to read file');
    }
  };

  const onDelete = (id) => {
    if (!window.confirm('Delete this document?')) return;
    deleteMutation.mutate(id, {
      onSuccess: () => { toast.success('Document deleted'); listQuery.refetch(); },
      onError: () => toast.error('Delete failed'),
    });
  };

  const onGet = async (id) => {
    try {
      const res = await getMutation.mutateAsync(id);
      const content = res?.data ?? res;
      toast.success('Fetched document');
      console.log('Legal doc', content);
    } catch {
      toast.error('Fetch failed');
    }
  };

  const onReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replaceId) return;
    try {
      const base64 = await toBase64(file);
      replaceMutation.mutate({ id: replaceId, base64: String(base64) }, {
        onSuccess: () => { toast.success('Document replaced'); listQuery.refetch(); setReplaceId(''); },
        onError: () => toast.error('Replace failed'),
      });
    } catch {
      toast.error('Failed to read file');
    }
  };

  const docs = Array.isArray(listQuery.data?.data) ? listQuery.data.data : (listQuery.data || []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Legal Documents</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <input aria-label="Document type" placeholder="Document type (optional)" value={documentType} onChange={(e) => setDocumentType(e.target.value)} />
        <input aria-label="Upload legal doc" type="file" accept="image/*,application/pdf" onChange={onUpload} />
      </div>

      {listQuery.isLoading && <div>Loading documents...</div>}
      {listQuery.isError && <div>Failed to load documents</div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {docs?.map((d) => (
          <li key={d?.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{d?.documentType || 'Document'}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{d?.id}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onGet(d?.id)}>Get</button>
                <button onClick={() => onDelete(d?.id)} disabled={deleteMutation.isPending}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <h3>Replace Document</h3>
        <input aria-label="Doc ID to replace" placeholder="Document ID" value={replaceId} onChange={(e) => setReplaceId(e.target.value)} />
        <input aria-label="Replace file" type="file" accept="image/*,application/pdf" onChange={onReplace} />
      </div>
    </div>
  );
}

