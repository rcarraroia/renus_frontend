import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Menu } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidth = isCollapsed ? "w-[80px]" : "w-[260px]";

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 h-screen bg-card text-foreground transition-all duration-300 ease-in-out border-r border-border flex flex-col z-20 shadow-lg",
        sidebarWidth
      )}
      initial={{ width: "260px" }}
      animate={{ width: isCollapsed ? "80px" : "260px" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header/Logo Area */}
      <div className="p-4 flex items-center justify-between h-16">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-primary tracking-widest">
            RENUS
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.div>
        </Button>
      </div>

      <Separator className="bg-border/50" />

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.route}
              className={cn(
                "flex items-center rounded-lg p-3 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-md"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <Icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;