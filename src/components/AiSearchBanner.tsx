import { Sparkles } from "lucide-react";

const AiSearchBanner = () => (
  <section className="py-14 md:py-20 bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(271,81%,56%)] text-white overflow-hidden">
    <div className="container max-w-2xl text-center">
      <p className="text-3xl mb-3">🤖</p>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-balance" style={{ lineHeight: "1.15" }}>
        AI ilə axtar — təbii dildə yaz, biz tapaq!
      </h2>
      <p className="text-white/80 text-sm mb-6">
        Məsələn: "Bakıda 10,000 manatdan ucuz mercedes"
      </p>
      <div className="flex items-center bg-white/15 backdrop-blur rounded-lg overflow-hidden border border-white/20 focus-within:border-white/50 transition-colors">
        <Sparkles size={18} className="ml-4 text-white/70 shrink-0" />
        <input
          type="text"
          placeholder="Təbii dildə axtarışınızı yazın..."
          className="flex-1 px-3 py-3.5 bg-transparent text-white placeholder:text-white/50 outline-none text-sm"
        />
        <button className="px-5 py-3.5 bg-white/20 hover:bg-white/30 font-semibold text-sm transition-colors shrink-0 active:scale-[0.97]">
          Axtar
        </button>
      </div>
      <p className="text-xs text-white/60 mt-4">
        ✨ Bu yenidir! Süni intellekt sizin üçün ən uyğun elanları tapır.
      </p>
    </div>
  </section>
);

export default AiSearchBanner;
