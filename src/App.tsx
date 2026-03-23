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
import PromotionPage from "./pages/PromotionPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import AdvertisingPage from "./pages/AdvertisingPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import ShopsPage from "./pages/ShopsPage.tsx";
import CreateShopPage from "./pages/CreateShopPage.tsx";
import ShopViewPage from "./pages/ShopViewPage.tsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.tsx";
import DashboardHome from "./components/dashboard/DashboardHome.tsx";
import MyAds from "./components/dashboard/MyAds.tsx";
import MyShop from "./components/dashboard/MyShop.tsx";
import Favorites from "./components/dashboard/Favorites.tsx";
import Messages from "./components/dashboard/Messages.tsx";
import Notifications from "./components/dashboard/Notifications.tsx";
import Payments from "./components/dashboard/Payments.tsx";
import Statistics from "./components/dashboard/Statistics.tsx";
import Reviews from "./components/dashboard/Reviews.tsx";
import SettingsPage from "./components/dashboard/SettingsPage.tsx";
import InstallPage from "./pages/InstallPage.tsx";
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
          <Route path="/kateqoriya/:slug" element={<CategoryListingPage />} />
          <Route path="/axtaris" element={<SearchResultsPage />} />
          <Route path="/elan-yerlesdir" element={<PostAdPage />} />
          <Route path="/daxil-ol" element={<LoginPage />} />
          <Route path="/qeydiyyat" element={<RegisterPage />} />
          <Route path="/sifre-berpa" element={<ForgotPasswordPage />} />
          <Route path="/elanlar/:id/ireli-cek" element={<PromotionPage />} />
          <Route path="/haqqimizda" element={<AboutPage />} />
          <Route path="/qaydalar" element={<RulesPage />} />
          <Route path="/mexfilik" element={<PrivacyPage />} />
          <Route path="/reklam" element={<AdvertisingPage />} />
          <Route path="/elaqe" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/magazalar" element={<ShopsPage />} />
          <Route path="/magazalar/yarat" element={<CreateShopPage />} />
          <Route path="/magazalar/:slug" element={<ShopViewPage />} />
          <Route path="/xidmetler/:id" element={<ServiceDetailPage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/panel" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="elanlarim" element={<MyAds />} />
            <Route path="magazam" element={<MyShop />} />
            <Route path="favoritler" element={<Favorites />} />
            <Route path="mesajlar" element={<Messages />} />
            <Route path="bildirisler" element={<Notifications />} />
            <Route path="odenisler" element={<Payments />} />
            <Route path="statistika" element={<Statistics />} />
            <Route path="reyler" element={<Reviews />} />
            <Route path="tenzimlemer" element={<SettingsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
