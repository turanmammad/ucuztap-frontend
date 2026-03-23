import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  { title: "Ümumi Müddəalar", content: "Bu İstifadə Qaydaları ucuztap.az platformasının istifadəsi ilə bağlı şərtləri müəyyən edir. Platformaya daxil olmaqla və ya istifadə etməklə siz bu qaydaları qəbul etmiş olursunuz." },
  { title: "Qeydiyyat və Hesab", content: "Qeydiyyatdan keçərkən doğru və aktual məlumatlar təqdim etməlisiniz. Hesabınızın təhlükəsizliyi sizin məsuliyyətinizdədir. Hesab məlumatlarınızı üçüncü şəxslərlə paylaşmayın." },
  { title: "Elan Yerləşdirmə Qaydaları", content: "Elanlar yalnız qanuni məhsul və xidmətlər üçün yerləşdirilə bilər. Saxta, yanıltıcı və ya qeyri-qanuni elanlar qadağandır. Hər elan yalnız bir məhsul və ya xidmət üçün olmalıdır." },
  { title: "Qadağan Olunmuş Məhsullar", content: "Silah, narkotik, oğurlanmış əmlak, saxta sənədlər, lisenziyasız dərman və qanunla qadağan edilmiş digər məhsulların satışı qəti qadağandır." },
  { title: "Ödənişlər və Geri Qaytarma", content: "VIP, Premium və digər ödənişli xidmətlər üçün edilən ödənişlər geri qaytarılmır. Texniki xəta zamanı ödəniş geri qaytarıla bilər." },
  { title: "Məsuliyyətin Məhdudlaşdırılması", content: "ucuztap.az alıcı və satıcı arasında vasitəçidir. Platformada yerləşdirilən elanların doğruluğuna zəmanət vermir. İstifadəçilər arasındakı mübahisələrə görə məsuliyyət daşımır." },
  { title: "Məzmun Mülkiyyəti", content: "Platformada yerləşdirdiyiniz məzmunun (şəkillər, təsvirlər) müəllif hüquqlarına əməl etdiyinizə zəmanət verirsiniz. ucuztap.az sizin məzmununuzu platformada göstərmək hüququna malikdir." },
  { title: "Hesabın Dayandırılması", content: "ucuztap.az qaydaları pozan istifadəçilərin hesablarını xəbərdarlıq etmədən dayandıra və ya silə bilər." },
  { title: "Dəyişikliklər", content: "Bu qaydalar istənilən vaxt dəyişdirilə bilər. Dəyişikliklər platformada dərc edildiyi andan qüvvəyə minir." },
];

const RulesPage = () => (
  <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
    <SiteHeader />
    <main className="flex-1 container py-10 md:py-14">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-extrabold text-foreground mb-2">İstifadə Qaydaları</h1>
        <p className="text-sm text-muted-foreground mb-8">Son yenilənmə: 15 Yanvar 2025</p>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5">
              <h2 className="text-sm font-bold text-foreground mb-2">
                {i + 1}. {s.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default RulesPage;
