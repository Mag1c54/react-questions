import { Header } from "@/widgets/header/ui/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/footer/ui/Footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
