import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AdDetailPage from "./pages/AdDetailPage.tsx";
import CategoryListingPage from "./pages/CategoryListingPage.tsx";
import SearchResultsPage from "./pages/SearchResultsPage.tsx";
import PostAdPage from "./pages/PostAdPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/elanlar/:id" element={<AdDetailPage />} />
          <Route path="/neqliyyat" element={<CategoryListingPage />} />
          <Route path="/axtaris" element={<SearchResultsPage />} />
          <Route path="/elan-yerlesdir" element={<PostAdPage />} />
          <Route path="/daxil-ol" element={<LoginPage />} />
          <Route path="/qeydiyyat" element={<RegisterPage />} />
          <Route path="/sifre-berpa" element={<ForgotPasswordPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
