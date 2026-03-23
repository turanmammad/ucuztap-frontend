import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryFilterSidebar from "@/components/CategoryFilterSidebar";
import { AdBannerSidebar, AdCardInFeed, AdBannerHorizontal } from "@/components/AdBanners";

const sortOptions = ["Tarixə görə", "Ucuzdan bahaya", "Bahalıdan ucuza", "Populyarlığa görə"];

type CategoryData = {
  title: string;
  count: string;
  ads: { id: number; title: string; price: string; location: string; date: string; desc: string; img: string }[];
};

const categoryMap: Record<string, CategoryData> = {
  neqliyyat: {
    title: "Nəqliyyat",
    count: "45,230",
    ads: [
      { id: 1, title: "Mercedes-Benz C200, 2019", price: "25,000", location: "Bakı", date: "5 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 45,000 km, ağ rəng, tam təchizat", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop" },
      { id: 2, title: "BMW 320i M Sport, 2020", price: "32,500", location: "Bakı", date: "12 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 35,000 km, qara rəng, M paket", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop" },
      { id: 3, title: "Toyota Camry 2.5 Hybrid", price: "35,000", location: "Sumqayıt", date: "20 dəq əvvəl", desc: "2.5L Hybrid, Avtomat, 28,000 km, gümüşü rəng", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop" },
      { id: 4, title: "Hyundai Tucson 2.0 GDI", price: "22,000", location: "Bakı", date: "35 dəq əvvəl", desc: "2.0L Benzin, Avtomat, 52,000 km, göy rəng", img: "https://images.unsplash.com/photo-1633695427587-dfa6a56f6572?w=400&h=300&fit=crop" },
      { id: 5, title: "Kia Sportage 1.6 T-GDI", price: "31,500", location: "Gəncə", date: "1 saat əvvəl", desc: "1.6L Turbo, Avtomat, 40,000 km, qırmızı rəng", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop" },
      { id: 6, title: "Nissan Qashqai 2.0", price: "24,000", location: "Bakı", date: "1 saat əvvəl", desc: "2.0L Benzin, CVT, 48,000 km, ağ rəng", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop" },
      { id: 7, title: "Chevrolet Malibu 1.5T", price: "16,500", location: "Bakı", date: "2 saat əvvəl", desc: "1.5L Turbo, Avtomat, 65,000 km, qara rəng", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
      { id: 8, title: "Lexus RX 350 F-Sport", price: "55,000", location: "Bakı", date: "2 saat əvvəl", desc: "3.5L Benzin, Avtomat, 30,000 km, ağ rəng, F-Sport", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop" },
      { id: 9, title: "Toyota Corolla 1.6 CVT", price: "19,800", location: "Sumqayıt", date: "3 saat əvvəl", desc: "1.6L Benzin, CVT, 55,000 km, boz rəng", img: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?w=400&h=300&fit=crop" },
    ],
  },
  emlak: {
    title: "Daşınmaz Əmlak",
    count: "23,456",
    ads: [
      { id: 101, title: "3 otaqlı mənzil, Nəsimi r.", price: "185,000", location: "Bakı", date: "10 dəq əvvəl", desc: "90 m², 4/16, təmirli, kupçalı", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
      { id: 102, title: "2 otaqlı mənzil, Yasamal", price: "65,000", location: "Bakı", date: "25 dəq əvvəl", desc: "55 m², 3/5, köhnə təmirli", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
      { id: 103, title: "2 otaqlı mənzil kirayə", price: "800/ay", location: "Bakı", date: "40 dəq əvvəl", desc: "65 m², 7/12, tam təmirli, əşyalı", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
      { id: 104, title: "Həyət evi, 3 sot torpaq", price: "95,000", location: "Abşeron", date: "1 saat əvvəl", desc: "120 m², 4 otaq, həyət, qaraj", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
      { id: 105, title: "Villa, Mərdəkan, 6 sot", price: "280,000", location: "Bakı", date: "2 saat əvvəl", desc: "200 m², 5 otaq, hovuz, bağ", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop" },
      { id: 106, title: "Ofis mənzil, 4 otaq", price: "350,000", location: "Bakı", date: "3 saat əvvəl", desc: "150 m², 2/3, Nəsimi r., əsas küçə", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
      { id: 107, title: "Yeni tikili, 2 otaqlı", price: "148,000", location: "Bakı", date: "4 saat əvvəl", desc: "75 m², 10/18, tam təmirli", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
      { id: 108, title: "Torpaq sahəsi, 10 sot", price: "45,000", location: "Şamaxı", date: "5 saat əvvəl", desc: "Çəpərli, kommunikasiyalı, yola yaxın", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop" },
      { id: 109, title: "1 otaqlı studio, Xətai", price: "72,000", location: "Bakı", date: "6 saat əvvəl", desc: "38 m², 5/16, yeni tikili, təmirli", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop" },
    ],
  },
  elektronika: {
    title: "Elektronika",
    count: "34,567",
    ads: [
      { id: 201, title: "iPhone 15 Pro Max 256GB", price: "2,100", location: "Bakı", date: "8 dəq əvvəl", desc: "Titanium, yeni kimi, qutu + aksesuar", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop" },
      { id: 202, title: "Samsung Galaxy S24 Ultra", price: "1,850", location: "Gəncə", date: "15 dəq əvvəl", desc: "512GB, qarantiyadə, çiziqsiz", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop" },
      { id: 203, title: "MacBook Pro M3 14\"", price: "3,200", location: "Bakı", date: "30 dəq əvvəl", desc: "16GB RAM, 512GB SSD, Space Gray", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
      { id: 204, title: "Samsung TV 55\" 4K QLED", price: "1,200", location: "Bakı", date: "1 saat əvvəl", desc: "Smart TV, 2024 model, qarantiyadə", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop" },
      { id: 205, title: "PlayStation 5 Slim", price: "950", location: "Bakı", date: "2 saat əvvəl", desc: "1TB, 2 joystick, 3 oyun daxil", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop" },
      { id: 206, title: "iPad Air M2 128GB", price: "1,100", location: "Bakı", date: "3 saat əvvəl", desc: "Wi-Fi, Space Gray, Apple Pencil ilə", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
      { id: 207, title: "AirPods Pro 2-ci nəsil", price: "280", location: "Bakı", date: "4 saat əvvəl", desc: "USB-C, aktiv səs ləğvi, yeni", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop" },
      { id: 208, title: "Xiaomi 14 Ultra 512GB", price: "1,450", location: "Bakı", date: "5 saat əvvəl", desc: "Leica kamera, qara rəng, yeni", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop" },
      { id: 209, title: "DJI Mini 4 Pro drone", price: "1,800", location: "Bakı", date: "6 saat əvvəl", desc: "Fly More Combo, 4K, 3 batareya", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop" },
    ],
  },
  "ev-ve-bag": {
    title: "Ev və Bağ",
    count: "12,345",
    ads: [
      { id: 301, title: "Divan dəsti, 3+2+1", price: "850", location: "Bakı", date: "15 dəq əvvəl", desc: "Yeni, keyfiyyətli parça, rəng seçimi var", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop" },
      { id: 302, title: "Mətbəx mebel dəsti", price: "1,200", location: "Bakı", date: "30 dəq əvvəl", desc: "MDF, ağ rəng, dəzgahla birlikdə", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
      { id: 303, title: "Samsung paltaryuyan, 8 kq", price: "650", location: "Sumqayıt", date: "1 saat əvvəl", desc: "Eco Bubble, inverter, qarantiyadə", img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop" },
      { id: 304, title: "Bağ üçün taxta mebel", price: "400", location: "Bakı", date: "2 saat əvvəl", desc: "Masa + 4 stul, çam ağacı", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop" },
      { id: 305, title: "Kondisioner Midea 12BTU", price: "550", location: "Bakı", date: "3 saat əvvəl", desc: "İnverter, yeni, quraşdırma daxil", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop" },
      { id: 306, title: "Yataq otağı dəsti", price: "1,800", location: "Bakı", date: "4 saat əvvəl", desc: "Çarpayı, şkaf, komod, güzgü", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop" },
    ],
  },
  "is-elanlari": {
    title: "İş Elanları",
    count: "8,901",
    ads: [
      { id: 401, title: "Satış meneceri", price: "1,200/ay", location: "Bakı", date: "10 dəq əvvəl", desc: "Təcrübə tələb olunur, ofis işi, tam iş günü", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" },
      { id: 402, title: "Proqramçı (React)", price: "2,500/ay", location: "Bakı", date: "30 dəq əvvəl", desc: "2+ il təcrübə, remote mümkündür", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
      { id: 403, title: "Mühasib", price: "900/ay", location: "Bakı", date: "1 saat əvvəl", desc: "1C bilikləri, 1+ il təcrübə", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
      { id: 404, title: "Dizayner (UI/UX)", price: "1,800/ay", location: "Bakı", date: "2 saat əvvəl", desc: "Figma, portfolio tələb olunur", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
      { id: 405, title: "Kuryer (tam gün)", price: "700/ay", location: "Bakı", date: "3 saat əvvəl", desc: "Şəxsi avtomobil tələb olunur", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop" },
      { id: 406, title: "Marketoloq", price: "1,500/ay", location: "Bakı", date: "4 saat əvvəl", desc: "SMM, Google Ads təcrübəsi", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
    ],
  },
  xidmetler: {
    title: "Xidmətlər",
    count: "15,678",
    ads: [
      { id: 501, title: "Ev təmiri və təmizliyi", price: "Razılaşma", location: "Bakı", date: "5 dəq əvvəl", desc: "Peşəkar komanda, keyfiyyətli xidmət", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" },
      { id: 502, title: "Fotoqraf xidməti", price: "150", location: "Bakı", date: "20 dəq əvvəl", desc: "Toy, ad günü, portfolio çəkilişi", img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop" },
      { id: 503, title: "Santexnik xidməti", price: "Razılaşma", location: "Bakı", date: "1 saat əvvəl", desc: "Təcili çağırış, 24/7 xidmət", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop" },
      { id: 504, title: "İngilis dili kursu", price: "80/ay", location: "Bakı", date: "2 saat əvvəl", desc: "Fərdi və qrup dərsləri, IELTS hazırlıq", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop" },
      { id: 505, title: "Veb sayt hazırlanması", price: "500", location: "Bakı", date: "3 saat əvvəl", desc: "Landing page, internet mağaza, portfolio", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
      { id: 506, title: "Daşınma xidməti", price: "Razılaşma", location: "Bakı", date: "4 saat əvvəl", desc: "Yükdaşıma, ev köçürmə, ofis köçürmə", img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=300&fit=crop" },
    ],
  },
  "geyim-aksesuar": {
    title: "Geyim və Aksesuar",
    count: "19,234",
    ads: [
      { id: 601, title: "Nike Air Max 90", price: "180", location: "Bakı", date: "10 dəq əvvəl", desc: "Original, 42 ölçü, yeni", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" },
      { id: 602, title: "Qadın çanta, Louis Vuitton", price: "350", location: "Bakı", date: "30 dəq əvvəl", desc: "A+ keyfiyyət, yeni, qutulu", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop" },
      { id: 603, title: "Kişi kostyum dəsti", price: "250", location: "Bakı", date: "1 saat əvvəl", desc: "50 ölçü, tünd göy, yeni", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop" },
      { id: 604, title: "Ray-Ban eynək", price: "120", location: "Bakı", date: "2 saat əvvəl", desc: "Aviator, original, qutulu", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop" },
      { id: 605, title: "Adidas Ultraboost", price: "200", location: "Bakı", date: "3 saat əvvəl", desc: "43 ölçü, qara, yeni", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop" },
      { id: 606, title: "Qış gödəkçəsi, North Face", price: "280", location: "Bakı", date: "4 saat əvvəl", desc: "L ölçü, qara, əla vəziyyət", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop" },
    ],
  },
  heyvanlar: {
    title: "Heyvanlar",
    count: "3,456",
    ads: [
      { id: 701, title: "Golden Retriever bala", price: "800", location: "Bakı", date: "20 dəq əvvəl", desc: "2 aylıq, peyvəndli, sənədli", img: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop" },
      { id: 702, title: "British Shorthair pişik", price: "400", location: "Bakı", date: "1 saat əvvəl", desc: "3 aylıq, boz, peyvəndli", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop" },
      { id: 703, title: "Akvarium dəsti", price: "150", location: "Bakı", date: "2 saat əvvəl", desc: "100L, filtr, isidici, balıqlar daxil", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
      { id: 704, title: "Alman ovçarkası", price: "600", location: "Gəncə", date: "3 saat əvvəl", desc: "4 aylıq, erkək, peyvəndli", img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop" },
      { id: 705, title: "Tutuquşu (Sultan papağan)", price: "50", location: "Bakı", date: "4 saat əvvəl", desc: "Cavan, sağlam, qəfəslə birlikdə", img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop" },
      { id: 706, title: "Labrador bala", price: "500", location: "Bakı", date: "5 saat əvvəl", desc: "3 aylıq, sarı, peyvəndli", img: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400&h=300&fit=crop" },
    ],
  },
  "hobbi-asude": {
    title: "Hobbi və Asudə",
    count: "5,678",
    ads: [
      { id: 801, title: "Elektro gitara, Fender", price: "900", location: "Bakı", date: "15 dəq əvvəl", desc: "Stratocaster, kombiklə birlikdə", img: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=400&h=300&fit=crop" },
      { id: 802, title: "Velosiped, Trek Marlin 7", price: "1,100", location: "Bakı", date: "1 saat əvvəl", desc: "29\", M ölçü, əla vəziyyət", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop" },
      { id: 803, title: "Kamp çadırı, 4 nəfərlik", price: "120", location: "Bakı", date: "2 saat əvvəl", desc: "Su keçirməyən, yeni, çantalı", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop" },
      { id: 804, title: "Kitab kolleksiyası, 50 ədəd", price: "200", location: "Bakı", date: "3 saat əvvəl", desc: "Dünya klassikası, Azərbaycanca", img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=300&fit=crop" },
      { id: 805, title: "Fitness aləti, Bench Press", price: "350", location: "Bakı", date: "4 saat əvvəl", desc: "Ştan, disklər daxil, ev üçün", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
      { id: 806, title: "Ping-pong masası", price: "280", location: "Sumqayıt", date: "5 saat əvvəl", desc: "Professional, qatlanan, çantalı", img: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&h=300&fit=crop" },
    ],
  },
  "usaq-alemi": {
    title: "Uşaq Aləmi",
    count: "7,890",
    ads: [
      { id: 901, title: "Uşaq arabasız, Stokke", price: "400", location: "Bakı", date: "10 dəq əvvəl", desc: "0-3 yaş, yeni kimi, tam dəstlə", img: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&h=300&fit=crop" },
      { id: 902, title: "Uşaq çarpayısı + döşək", price: "250", location: "Bakı", date: "30 dəq əvvəl", desc: "Ağ rəng, ortopedik döşək", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop" },
      { id: 903, title: "LEGO Technic, 1000 hissə", price: "80", location: "Bakı", date: "1 saat əvvəl", desc: "Yeni, açılmamış, 8+ yaş", img: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&h=300&fit=crop" },
      { id: 904, title: "Uşaq paltarları dəsti", price: "60", location: "Bakı", date: "2 saat əvvəl", desc: "1-2 yaş, 10 ədəd, əla vəziyyət", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop" },
      { id: 905, title: "Avtomobil oturacağı, Maxi-Cosi", price: "180", location: "Bakı", date: "3 saat əvvəl", desc: "0-12 yaş, ISOFIX, yeni kimi", img: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=400&h=300&fit=crop" },
      { id: 906, title: "Uşaq velosipedi, 16\"", price: "90", location: "Gəncə", date: "4 saat əvvəl", desc: "4-7 yaş, köməkçi təkərli, göy", img: "https://images.unsplash.com/photo-1529661197280-63dc545366c8?w=400&h=300&fit=crop" },
    ],
  },
  "tikinti-temir": {
    title: "Tikinti və Təmir",
    count: "4,567",
    ads: [
      { id: 1001, title: "Sement, Norm M400", price: "7.50", location: "Bakı", date: "15 dəq əvvəl", desc: "50 kq, topdan satış, çatdırılma var", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
      { id: 1002, title: "Kafel, İtalyan istehsalı", price: "18/m²", location: "Bakı", date: "30 dəq əvvəl", desc: "60x60, parlaq, ağ, 200 m² var", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop" },
      { id: 1003, title: "Alüminium profil, 3m", price: "4.50", location: "Bakı", date: "1 saat əvvəl", desc: "Gips-karton üçün, 100 ədəd var", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop" },
      { id: 1004, title: "Elektrik alətlər dəsti, Bosch", price: "350", location: "Bakı", date: "2 saat əvvəl", desc: "Drel, bolqarka, şurupvert, çantalı", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop" },
      { id: 1005, title: "Laminat döşəmə, 8mm", price: "12/m²", location: "Bakı", date: "3 saat əvvəl", desc: "Alman istehsalı, palıd rəng", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
      { id: 1006, title: "PVC pəncərə, 140x160", price: "180", location: "Sumqayıt", date: "4 saat əvvəl", desc: "İki tərəfli açılan, enerji qənaəti", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
    ],
  },
  diger: {
    title: "Digər",
    count: "2,345",
    ads: [
      { id: 1101, title: "Antik saat, mexaniki", price: "300", location: "Bakı", date: "20 dəq əvvəl", desc: "1960-cı illər, işlək vəziyyətdə", img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=300&fit=crop" },
      { id: 1102, title: "Nərd dəsti, ceviz ağacı", price: "80", location: "Bakı", date: "1 saat əvvəl", desc: "Əl işi, oyma naxışlı", img: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop" },
      { id: 1103, title: "Kolleksiya pulları", price: "500", location: "Bakı", date: "2 saat əvvəl", desc: "SSRİ dövrü, 100+ ədəd, albomlu", img: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=300&fit=crop" },
      { id: 1104, title: "Piknik dəsti, 6 nəfərlik", price: "65", location: "Bakı", date: "3 saat əvvəl", desc: "Çantalı, boşqab, stəkan, çəngəl", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop" },
      { id: 1105, title: "Xalça, əl toxunması", price: "1,200", location: "Bakı", date: "4 saat əvvəl", desc: "2x3m, ipək, Şirvan motivli", img: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=300&fit=crop" },
      { id: 1106, title: "Qızıl üzük, 585 əyar", price: "220", location: "Bakı", date: "5 saat əvvəl", desc: "4.5 qram, ölçü 17, brilliantlı", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop" },
    ],
  },
};

const TOTAL_PAGES = 117;

const CategoryListingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSortValue] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const category = categoryMap[slug || "neqliyyat"] || categoryMap.neqliyyat;
  const { title, count, ads } = category;
  const activeFilterCount = 3;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (TOTAL_PAGES <= 7) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(TOTAL_PAGES - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < TOTAL_PAGES - 2) pages.push("...");
      pages.push(TOTAL_PAGES);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col pb-mobile-bar md:pb-0">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <span className="text-foreground font-medium">{title}</span>
            </nav>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{count} elan</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block w-[260px] shrink-0 space-y-4">
              <CategoryFilterSidebar open={false} onClose={() => {}} activeFilters={activeFilterCount} slug={slug} />
              <AdBannerSidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{count}</span> elan tapıldı
                </p>

                <div className="flex items-center gap-2">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-md hover:border-primary/50 transition-colors"
                    >
                      <span className="text-muted-foreground">Sırala:</span>
                      <span className="font-medium">{sort}</span>
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                    {sortOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                        <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-fade-in">
                          {sortOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => { setSortValue(opt); setSortOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                sort === opt ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* View toggle */}
                  <div className="flex border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-2 transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ad cards */}
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {ads.map((ad, i) => (
                    <>
                      {i === 3 && <AdCardInFeed key="ad-feed" />}
                      <Link key={ad.id} to={`/elanlar/${ad.id}`} className="rounded-lg border border-border bg-card overflow-hidden card-lift group">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug">{ad.title}</p>
                          <p className="text-base font-bold text-foreground mt-1">{ad.price} ₼</p>
                          <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                            <span>📍 {ad.location}</span>
                            <span>{ad.date}</span>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {ads.map((ad) => (
                    <Link key={ad.id} to={`/elanlar/${ad.id}`} className="flex rounded-lg border border-border bg-card overflow-hidden card-lift group">
                      <div className="w-36 h-28 sm:w-44 sm:h-32 shrink-0 overflow-hidden">
                        <img src={ad.img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                      <div className="flex-1 p-3 min-w-0">
                        <p className="text-sm font-medium text-card-foreground line-clamp-1">{ad.title}</p>
                        <p className="text-base font-bold text-foreground mt-0.5">{ad.price} ₼</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ad.desc}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>📍 {ad.location}</span>
                          <span>{ad.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <nav className="flex items-center justify-center gap-1 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm rounded-md border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  « Əvvəl
                </button>
                {getPageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-2 py-2 text-sm text-muted-foreground">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-9 h-9 text-sm rounded-md font-medium transition-all ${
                        currentPage === p
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage(Math.min(TOTAL_PAGES, currentPage + 1))}
                  disabled={currentPage === TOTAL_PAGES}
                  className="px-3 py-2 text-sm rounded-md border border-border hover:border-primary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Növbəti »
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile filter FAB */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm shadow-xl hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <SlidersHorizontal size={16} />
          Filter ({activeFilterCount})
        </button>

        {/* Mobile filter sheet */}
        <CategoryFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} activeFilters={activeFilterCount} slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default CategoryListingPage;
