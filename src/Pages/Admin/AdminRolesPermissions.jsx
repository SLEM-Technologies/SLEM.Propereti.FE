import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useCreateRole, useListRolesByCompany, useAssignUserRole, useAssignPermission, useListPermissionsByCompany } from '../../api/queries';

const roleSchema = z.object({
  name: z.string().min(2, 'Role name required'),
  description: z.string().optional(),
  companyId: z.string().uuid('Company ID must be a UUID'),
  isSystemGenerated: z.boolean().optional(),
});

const assignRoleSchema = z.object({
  userId: z.string().uuid('User ID must be a UUID'),
  roleId: z.string().uuid('Role ID must be a UUID'),
  companyId: z.string().uuid('Company ID must be a UUID'),
});

const assignPermSchema = z.object({
  role: z.string().min(1, 'Role required'),
  permission: z.string().min(1, 'Permission required'),
});

export default function AdminRolesPermissions() {
  const [companyId, setCompanyId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [permRole, setPermRole] = useState('');
  const [permission, setPermission] = useState('');

  const createRole = useCreateRole();
  const assignUserRole = useAssignUserRole();
  const assignPermission = useAssignPermission();
  const rolesQuery = useListRolesByCompany(companyId || undefined);
  const permsQuery = useListPermissionsByCompany(companyId || undefined);

  const onCreateRole = (e) => {
    e.preventDefault();
    const result = roleSchema.safeParse({ name: roleName, description: roleDescription, companyId, isSystemGenerated: false });
    if (!result.success) {
      toast.error(result.error.errors.map((e) => e.message).join(', '));
      return;
    }
    createRole.mutate(result.data, {
      onSuccess: () => {
        toast.success('Role created');
        setRoleName('');
        setRoleDescription('');
        rolesQuery.refetch();
      },
      onError: () => toast.error('Failed to create role'),
    });
  };

  const onAssignRole = (e) => {
    e.preventDefault();
    const result = assignRoleSchema.safeParse({ userId, roleId, companyId });
    if (!result.success) {
      toast.error(result.error.errors.map((e) => e.message).join(', '));
      return;
    }
    assignUserRole.mutate(result.data, {
      onSuccess: () => toast.success('Role assigned'),
      onError: () => toast.error('Failed to assign role'),
    });
  };

  const onAssignPermission = (e) => {
    e.preventDefault();
    const result = assignPermSchema.safeParse({ role: permRole, permission });
    if (!result.success) {
      toast.error(result.error.errors.map((e) => e.message).join(', '));
      return;
    }
    assignPermission.mutate(result.data, {
      onSuccess: () => toast.success('Permission assigned'),
      onError: () => toast.error('Failed to assign permission'),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin: Roles & Permissions</h2>

      <div style={{ marginBottom: 16 }}>
        <label>
          <div>Company ID</div>
          <input aria-label="Company ID" placeholder="Company UUID" value={companyId} onChange={(e) => setCompanyId(e.target.value)} />
        </label>
      </div>

      <section style={{ marginBottom: 24 }}>
        <h3>Create Role</h3>
        <form onSubmit={onCreateRole} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label>
            <div>Role Name</div>
            <input aria-label="Role name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
          </label>
          <label>
            <div>Description</div>
            <input aria-label="Role description" value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} />
          </label>
          <button type="submit" disabled={createRole.isPending}>Create</button>
        </form>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Assign Role to User</h3>
        <form onSubmit={onAssignRole} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label>
            <div>User ID</div>
            <input aria-label="User ID" placeholder="User UUID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </label>
          <label>
            <div>Role ID</div>
            <input aria-label="Role ID" placeholder="Role UUID" value={roleId} onChange={(e) => setRoleId(e.target.value)} />
          </label>
          <button type="submit" disabled={assignUserRole.isPending}>Assign Role</button>
        </form>
      </section>

      <section>
        <h3>Assign Permission to Role</h3>
        <form onSubmit={onAssignPermission} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
          <label>
            <div>Role (name/id)</div>
            <input aria-label="Permission Role" value={permRole} onChange={(e) => setPermRole(e.target.value)} />
          </label>
          <label>
            <div>Permission</div>
            <input aria-label="Permission" value={permission} onChange={(e) => setPermission(e.target.value)} />
          </label>
          <button type="submit" disabled={assignPermission.isPending}>Assign Permission</button>
        </form>
      </section>

      <hr style={{ margin: '16px 0' }} />

      <section>
        <h3>Company Roles</h3>
        {rolesQuery.isLoading && <div>Loading roles...</div>}
        {rolesQuery.isError && <div>Failed to load roles</div>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(Array.isArray(rolesQuery.data?.data) ? rolesQuery.data.data : (rolesQuery.data || [])).map((r) => (
            <li key={r?.id || r?.roleId || r?.name} style={{ padding: 8, border: '1px solid #eee', borderRadius: 8, marginBottom: 6 }}>
              <strong>{r?.name || r?.roleName}</strong> — <span style={{ color: '#666' }}>{r?.description || ''}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Company Permissions</h3>
        {permsQuery.isLoading && <div>Loading permissions...</div>}
        {permsQuery.isError && <div>Failed to load permissions</div>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(Array.isArray(permsQuery.data?.data) ? permsQuery.data.data : (permsQuery.data || [])).map((p, idx) => (
            <li key={p?.id || p?.permission || idx} style={{ padding: 8, border: '1px solid #eee', borderRadius: 8, marginBottom: 6 }}>
              {p?.permission || p?.name || String(p)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

