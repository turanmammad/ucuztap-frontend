import { Smartphone } from "lucide-react";

const AppDownloadBanner = () => (
  <section className="section-padding bg-muted/40">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-foreground mb-3">
            ucuztap.az mobil tətbiqi
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Elanları izləyin, anında bildiriş alın, istənilən yerdən elan yerləşdirin.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              App Store
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.991l-2.302 2.302L5.864 2.658z"/></svg>
              Google Play
            </a>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-48 h-80 bg-gradient-to-b from-primary/20 to-primary/5 rounded-[2rem] border-4 border-foreground/10 flex items-center justify-center">
            <Smartphone size={48} className="text-muted-foreground/40" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AppDownloadBanner;
