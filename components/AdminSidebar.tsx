"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Image,
  BookOpen,
  Users,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  Building2,
  UserCheck,
  Info,
  LogOut,
} from "lucide-react";

const menus = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Home", href: "/admin/dashboard/home", icon: Image },
  { title: "About", href: "/admin/dashboard/about", icon: Info },
  { title: "Products", href: "/admin/products", icon: BookOpen },
  { title: "Instructors", href: "/admin/instructors", icon: Users },
  { title: "Contact Messages", href: "/admin/contact", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <aside className="w-72 border-r bg-white h-screen sticky top-0 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b">ProEdu Admin</div>

        <nav className="flex flex-col p-4 gap-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {menu.title}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700 mt-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}
