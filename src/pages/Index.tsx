import { useCallback } from "react";
import SiteHeader from "@/components/SiteHeader";
import HeroSearch from "@/components/HeroSearch";
import CategoryGrid from "@/components/CategoryGrid";
import PremiumAds from "@/components/PremiumAds";
import VipAds from "@/components/VipAds";
import RecentAds from "@/components/RecentAds";
import AiSearchBanner from "@/components/AiSearchBanner";
import StatsBar from "@/components/StatsBar";
import SiteFooter from "@/components/SiteFooter";
import { AdBannerHorizontal } from "@/components/AdBanners";
import PullToRefresh from "@/components/PullToRefresh";

const Index = () => {
  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1">
          <HeroSearch />
          <CategoryGrid />
          <AdBannerHorizontal variant="slim" className="py-4" />
          <PremiumAds />
          <VipAds />
          <AdBannerHorizontal className="py-4" />
          <RecentAds />
          <AiSearchBanner />
          <AdBannerHorizontal variant="large" className="py-4" />
          <StatsBar />
        </main>
        <SiteFooter />
      </PullToRefresh>
    </div>
  );
};

export default Index;
