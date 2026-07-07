import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
