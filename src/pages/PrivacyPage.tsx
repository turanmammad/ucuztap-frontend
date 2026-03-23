import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  { title: "Giriş", content: "ucuztap.az olaraq şəxsi məlumatlarınızın qorunmasına böyük əhəmiyyət veririk. Bu Məxfilik Siyasəti platformamızdan istifadə zamanı hansı məlumatları topladığımızı, necə istifadə etdiyimizi və qoruduğumuzu izah edir." },
  { title: "Toplanan Məlumatlar", content: "Qeydiyyat zamanı: ad, soyad, email, telefon nömrəsi. Elan yerləşdirərkən: elan məlumatları, şəkillər, əlaqə məlumatları. Avtomatik: IP ünvanı, brauzer növü, cihaz məlumatları, cookies." },
  { title: "Məlumatların İstifadəsi", content: "Məlumatlarınız yalnız xidmətlərimizi təmin etmək, təkmilləşdirmək və sizinlə əlaqə saxlamaq məqsədilə istifadə olunur. Məlumatlarınız razılığınız olmadan üçüncü şəxslərə satılmır." },
  { title: "Cookies", content: "Platformamız istifadəçi təcrübəsini yaxşılaşdırmaq üçün cookies istifadə edir. Brauzerinizin ayarlarından cookies-i söndürə bilərsiniz, lakin bu bəzi funksiyaların düzgün işləməsinə təsir edə bilər." },
  { title: "Məlumatların Qorunması", content: "Şəxsi məlumatlarınız müasir şifrələmə texnologiyaları ilə qorunur. Serverlərimiz təhlükəsiz data mərkəzlərində yerləşir. Əməkdaşlarımız məxfilik öhdəliklərinə tabedirlər." },
  { title: "İstifadəçi Hüquqları", content: "Məlumatlarınıza giriş, düzəliş və silmə hüququnuz var. Marketinq mesajlarından imtina edə bilərsiniz. Məlumatlarınızın daşınmasını tələb edə bilərsiniz." },
  { title: "Uşaqların Məxfiliyi", content: "Xidmətlərimiz 18 yaşdan kiçiklər üçün nəzərdə tutulmayıb. Bilərəkdən uşaqlardan şəxsi məlumat toplamırıq." },
  { title: "Əlaqə", content: "Məxfilik siyasəti ilə bağlı suallarınız üçün privacy@ucuztap.az ünvanına yazın və ya +994 12 555 00 00 nömrəsinə zəng edin." },
];

const PrivacyPage = () => (
  <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
    <SiteHeader />
    <main className="flex-1 container py-10 md:py-14">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-extrabold text-foreground mb-2">Məxfilik Siyasəti</h1>
        <p className="text-sm text-muted-foreground mb-8">Son yenilənmə: 15 Yanvar 2025</p>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-sm font-bold text-foreground mb-2">{i + 1}. {s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default PrivacyPage;
