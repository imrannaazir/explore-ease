import { Navbar } from "@/components/layout/navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="pt-16">{children}</div>
    </main>
  );
};

export default MainLayout;
