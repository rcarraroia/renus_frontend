import { Home, Users, MessageSquare, List, Lightbulb, Send, Settings, LucideIcon } from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  route: string;
}

export const navItems: NavItem[] = [
  { icon: Home, label: "Visão Geral", route: "/" },
  { icon: Users, label: "Leads", route: "/leads" },
  { icon: MessageSquare, label: "Respostas", route: "/respostas" },
  { icon: List, label: "Funcionalidades", route: "/funcionalidades" },
  { icon: Lightbulb, label: "Insights", route: "/insights" },
  { icon: Send, label: "Feedbacks", route: "/feedbacks" },
  { icon: Settings, label: "Configurações", route: "/config" },
];