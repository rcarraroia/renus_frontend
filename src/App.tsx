import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DashboardLayout from "./components/DashboardLayout";

// Pages
import HomePage from "./pages/Home"; // Nova Home Page
import VisaoGeralPage from "./pages/VisaoGeral";
import LeadsPage from "./pages/Leads";
import RespostasPage from "./pages/Respostas";
import FuncionalidadesPage from "./pages/Funcionalidades";
import InsightsPage from "./pages/Insights";
import FeedbacksPage from "./pages/Feedbacks";
import ConfigPage from "./pages/Config";
import DocumentoTecnicoPage from "./pages/DocumentoTecnico";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Rota da Nova Home Page Imersiva */}
            <Route path="/" element={<HomePage />} />

            {/* Rotas do Dashboard Aninhadas */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<VisaoGeralPage />} /> {/* /dashboard */}
              <Route path="leads" element={<LeadsPage />} />
              <Route path="respostas" element={<RespostasPage />} />
              <Route path="funcionalidades" element={<FuncionalidadesPage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="feedbacks" element={<FeedbacksPage />} />
              <Route path="documento-tecnico" element={<DocumentoTecnicoPage />} />
              <Route path="config" element={<ConfigPage />} />
            </Route>

            {/* Rota de Catch-All (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;