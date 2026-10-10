import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";

export const MainLayout = () => (
  <div className="app">
    <Header />
    <Outlet />
    <Footer />
  </div>
);