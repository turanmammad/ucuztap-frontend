import SiteHeader from "@/components/SiteHeader";
import HeroSearch from "@/components/HeroSearch";
import CategoryGrid from "@/components/CategoryGrid";
import VipAds from "@/components/VipAds";
import RecentAds from "@/components/RecentAds";
import AiSearchBanner from "@/components/AiSearchBanner";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import StatsBar from "@/components/StatsBar";
import SiteFooter from "@/components/SiteFooter";
import { AdBannerHorizontal, AdBannerInline } from "@/components/AdBanners";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1">
      <HeroSearch />
      <CategoryGrid />
      <AdBannerHorizontal variant="slim" className="py-4" />
      <VipAds />
      <AdBannerHorizontal className="py-4" />
      <RecentAds />
      <AiSearchBanner />
      <AdBannerHorizontal variant="large" className="py-4" />
      <AppDownloadBanner />
      <StatsBar />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
