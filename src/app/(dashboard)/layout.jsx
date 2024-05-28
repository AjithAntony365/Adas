import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Auth from "@/lib/useAuth";

export default function DashboardLayout({ children }) {
    return (
        // <Auth>
            <section className="flex h-full min-h-screen">
                <SideBar />
                <main className="w-full bg-[t-#3366FF]">
                {/* bg-gradient-to-br from-sky-100 to-purple-300 */}
                    <NavBar />
                    {children}
                </main>
            </section>
        // </Auth>
    )
};