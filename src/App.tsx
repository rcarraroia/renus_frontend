import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DashboardLayout from "./components/DashboardLayout";

// Pages
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
        <DashboardLayout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<VisaoGeralPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/respostas" element={<RespostasPage />} />
              <Route path="/funcionalidades" element={<FuncionalidadesPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/feedbacks" element={<FeedbacksPage />} />
              <Route path="/documento-tecnico" element={<DocumentoTecnicoPage />} />
              <Route path="/config" element={<ConfigPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;