import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      <SideBar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}