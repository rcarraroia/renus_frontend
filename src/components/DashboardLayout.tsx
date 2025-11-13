import React from "react";
import Sidebar from "./Sidebar";
import { motion, Transition } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode; // Children is now optional as we use Outlet
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const location = useLocation();

  // Framer Motion variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[260px] transition-all duration-300 ease-in-out">
        <main className="p-8">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Outlet /> {/* Renderiza a página aninhada aqui */}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;