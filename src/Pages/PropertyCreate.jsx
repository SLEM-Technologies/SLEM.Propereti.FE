import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useCreateProperty } from '../api/queries';

const schema = z.object({
  propertyName: z.string().min(2, 'Name required'),
  propertyAddress: z.string().min(2, 'Address required'),
  city: z.string().optional(),
  state: z.string().optional(),
  description: z.string().optional(),
  price: z.preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number({ invalid_type_error: 'Enter a valid price' }).positive('Price must be positive')),
  base64Images: z.array(z.string()).optional(),
});

export default function PropertyCreate() {
  const [form, setForm] = useState({ propertyName: '', propertyAddress: '', city: '', state: '', description: '', price: '' });
  const [files, setFiles] = useState([]);
  const mutation = useCreateProperty();

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onFiles = async (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const base64s = await Promise.all((files || []).map((f) => toBase64(f).then(String)));
      const payload = { ...form, price: form.price, base64Images: base64s };
      const parsed = schema.safeParse(payload);
      if (!parsed.success) {
        toast.error(parsed.error.errors.map((e) => e.message).join(', '));
        return;
      }
      mutation.mutate(parsed.data, {
        onSuccess: () => {
          toast.success('Property created');
          setForm({ propertyName: '', propertyAddress: '', city: '', state: '', description: '', price: '' });
          setFiles([]);
        },
        onError: () => toast.error('Failed to create property'),
      });
    } catch {
      toast.error('Failed to read images');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Create Property</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <label>
          <div>Name</div>
          <input aria-label="Property name" value={form.propertyName} onChange={(e) => setForm({ ...form, propertyName: e.target.value })} />
        </label>
        <label>
          <div>Address</div>
          <input aria-label="Property address" value={form.propertyAddress} onChange={(e) => setForm({ ...form, propertyAddress: e.target.value })} />
        </label>
        <label>
          <div>City</div>
          <input aria-label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </label>
        <label>
          <div>State</div>
          <input aria-label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        </label>
        <label>
          <div>Description</div>
          <textarea aria-label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label>
          <div>Price</div>
          <input aria-label="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </label>
        <label>
          <div>Images</div>
          <input aria-label="Images" type="file" accept="image/*" multiple onChange={onFiles} />
        </label>
        <button type="submit" disabled={mutation.isPending}>Create</button>
      </form>
    </div>
  );
}

