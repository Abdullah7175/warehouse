import UsersManager from '@/components/admin/UsersManager';

export default function UsersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      <UsersManager />
    </div>
  );
}