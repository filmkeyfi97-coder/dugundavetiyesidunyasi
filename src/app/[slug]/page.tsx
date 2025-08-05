'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import prices from "../../data/prices.json";
import Breadcrumb from "../../components/Breadcrumb";

// Tip tanımları
interface PriceData {
  price: number;
  is_sealed: number;
  is_inner_gilded: number;
  is_envelope_gilded: number;
  is_transparent: number;
}

interface CategoryData {
  [key: string]: PriceData;
}

interface PricesData {
  ekopolen: CategoryData;
  stylish: CategoryData;
  sade: CategoryData;
}

// Kategori bilgileri
const categoryInfo = {
  sade: {
    name: "Sade",
    description: "Minimalist ve şık tasarımlar",
    count: 100,
    color: "from-blue-500 to-cyan-500",
    startId: 22523,
    endId: 22622
  },
  ekopolen: {
    name: "Ekopolen", 
    description: "Çevre dostu ve modern",
    count: 100,
    color: "from-green-500 to-emerald-500",
    startId: 40333,
    endId: 40432
  },
  stylish: {
    name: "Stylish",
    description: "Trend ve lüks tasarımlar",
    count: 75,
    color: "from-purple-500 to-pink-500",
    startId: 10301,
    endId: 10386
  }
};

// Fiyat hesaplama fonksiyonu
const getPrice = (category: string, code: string) => {
  const categoryData = (prices as PricesData)[category as keyof PricesData];
  if (!categoryData) return 0;
  
  const priceData = categoryData[code as keyof CategoryData] as PriceData;
  if (!priceData) return 0;
  
  return priceData.price;
};

// Davetiye özelliklerini al
const getInvitationFeatures = (category: string, code: string) => {
  const categoryData = (prices as PricesData)[category as keyof PricesData];
  if (!categoryData) return { is_sealed: 0, is_inner_gilded: 0, is_envelope_gilded: 0, is_transparent: 0 };
  
  const priceData = categoryData[code as keyof CategoryData] as PriceData;
  if (!priceData) return { is_sealed: 0, is_inner_gilded: 0, is_envelope_gilded: 0, is_transparent: 0 };
  
  return {
    is_sealed: priceData.is_sealed,
    is_inner_gilded: priceData.is_inner_gilded,
    is_envelope_gilded: priceData.is_envelope_gilded,
    is_transparent: priceData.is_transparent
  };
};

// Yeni fiyat hesaplama fonksiyonu (kar mekanizması ile)
const calculatePrice = (basePrice: number, quantity: number = 50, features?: { is_sealed: number; is_inner_gilded: number; is_envelope_gilded: number; is_transparent: number }) => {
  // Temel hesaplama
  const baseTotal = basePrice * quantity;
  
  // Kar hesaplama (500 adete kadar +50 TL, sonrası +75 TL)
  const karMultiplier = Math.floor(quantity / 50);
  const baseKar = 900; // İlk 50 adet için kar
  
  let karArtis = 0;
  if (quantity <= 500) {
    // 500 adete kadar: her 50 adet için +50 TL
    karArtis = karMultiplier * 50;
  } else {
    // 500 adetten sonra: her 50 adet için +75 TL
    const ilk500Kar = Math.floor(500 / 50) * 50; // 500 adete kadar olan kar
    const kalanAdet = quantity - 500;
    const kalanKarMultiplier = Math.floor(kalanAdet / 50);
    const kalanKar = kalanKarMultiplier * 75; // 500'den sonra her 50 adet için +75 TL
    karArtis = ilk500Kar + kalanKar;
  }
  
  let totalKar = baseKar + karArtis;
  
  // Yaldız ve şeffaf özellikleri için ek kar (tek seferlik)
  if (features) {
    if (features.is_inner_gilded === 1) {
      totalKar += 1500; // Yaldız İç Kart
    }
    if (features.is_envelope_gilded === 1) {
      totalKar += 1500; // Yaldız Zarf
    }
    if (features.is_transparent === 1) {
      totalKar += 1500; // Şeffaf Davetiye
    }
  }
  
  // Mühürlü zarf için adet başı ücret + tek seferlik ücret
  let muhurUcreti = 0;
  if (features && features.is_sealed === 1) {
    muhurUcreti = quantity * 12.5 + 450; // Adet başı 12.5 TL + tek seferlik 450 TL
  }
  
  // Toplam fiyat
  const totalPrice = baseTotal + totalKar + muhurUcreti;
  
  // Birim fiyat
  const unitPrice = totalPrice / quantity;
  
  return {
    basePrice,
    quantity,
    baseTotal,
    kar: totalKar,
    muhurUcreti,
    totalPrice,
    unitPrice
  };
};

// Davetiye modelleri (sadece mevcut dosyalar)
const getInvitationModels = (category: string, limit?: number) => {
  const models: Array<{
    id: number;
    image: string;
    name: string;
    price: string;
    code: string;
  }> = [];
  const categoryData = categoryInfo[category as keyof typeof categoryInfo];
  
  if (!categoryData) return models;
  
  // Mevcut dosyaları kontrol et
  let fileNames: string[] = [];
  
  if (category === 'sade') {
    // Sade kategorisi için mevcut dosyalar
    fileNames = [
      '22500.webp', '22501.webp', '22502.webp', '22503.webp', '22504.webp', '22505.webp', '22506.webp', '22507.webp', '22508.webp', '22509.webp',
      '22510.webp', '22511.webp', '22512.webp', '22513.webp', '22514.webp', '22515.webp', '22516.webp', '22517.webp', '22518.webp', '22519.webp',
      '22520.webp', '22521.webp', '22522.webp', '22523.webp', '22524.webp', '22525.webp', '22526.webp', '22527.webp', '22528.webp', '22529.webp',
      '22530.webp', '22531.webp', '22532.webp', '22533.webp', '22534.webp', '22535.webp', '22536.webp', '22537.webp', '22538.webp', '22539.webp',
      '22540.webp', '22541.webp', '22542.webp', '22543.webp', '22544.webp', '22545.webp', '22546.webp', '22547.webp', '22548.webp', '22549.webp',
      '22550.webp', '22551.webp', '22552.webp', '22553.webp', '22554.webp', '22555.webp', '22556.webp', '22557.webp', '22558.webp', '22559.webp',
      '22560.webp', '22561.webp', '22562.webp', '22563.webp', '22564.webp', '22565.webp', '22566.webp', '22567.webp', '22568.webp', '22569.webp',
      '22570.webp', '22571.webp', '22572.webp', '22573.webp', '22574.webp', '22575.webp', '22576.webp', '22577.webp', '22578.webp', '22579.webp',
      '22580.webp', '22581.webp', '22582.webp', '22583.webp', '22584.webp', '22585.webp', '22586.webp', '22587.webp', '22588.webp', '22589.webp',
      '22590.webp', '22591.webp', '22592.webp', '22593.webp', '22594.webp', '22595.webp', '22596.webp', '22597.webp', '22598.webp', '22599.webp',
      '22600.webp', '22601.webp', '22602.webp', '22603.webp', '22604.webp', '22605.webp', '22606.webp', '22607.webp', '22608.webp', '22609.webp',
      '22610.webp', '22611.webp', '22612.webp', '22613.webp', '22614.webp', '22615.webp', '22616.webp', '22617.webp', '22618.webp', '22619.webp',
      '22620.webp', '22621.webp', '22622.webp'
    ];
  } else if (category === 'ekopolen') {
    // Ekopolen kategorisi için mevcut dosyalar (40301-40432 arası)
    const ekopolenFiles = [];
    for (let i = 40301; i <= 40432; i++) {
      ekopolenFiles.push(`${i}.webp`);
    }
    fileNames = ekopolenFiles;
  } else if (category === 'stylish') {
    // Stylish kategorisi için mevcut dosyalar (10301-10386 arası)
    const stylishFiles = [];
    for (let i = 10301; i <= 10386; i++) {
      stylishFiles.push(`${i}.webp`);
    }
    fileNames = stylishFiles;
  }
  
  // Limit belirtilmişse o kadar, yoksa tümünü al
  const selectedFiles = limit ? fileNames.slice(0, limit) : fileNames;
  
  return selectedFiles.map((fileName, index) => {
    // Dosya adından kodu çıkar (örn: 9339-1.webp -> 9339-1)
    const code = fileName.replace('.webp', '');
    
    // Gerçek fiyatı al
    const realPrice = getPrice(category, code);
    
    // Fiyat hesaplama (kar mekanizması ile)
    let priceText = "Fiyat Belirtilmemiş";
    
    // Özellikleri al
    const features = getInvitationFeatures(category, code);
    
    if (realPrice > 0) {
      const priceInfo = calculatePrice(realPrice, 100, features);
      priceText = `₺${priceInfo.unitPrice.toFixed(2)}`;
    } else {
      // Varsayılan fiyat (tüm kategoriler için)
      const defaultPrice = 3.50; // Varsayılan davetiye fiyatı
      const priceInfo = calculatePrice(defaultPrice, 100, features);
      priceText = `₺${priceInfo.unitPrice.toFixed(2)}`;
    }
    
    return {
      id: index + 1,
      image: `/${category}/${fileName}`,
      name: `${categoryData.name} Davetiye ${code}`,
      price: priceText,
      code: `dugun-davetiyesi-${code}`
    };
  }).filter(Boolean); // null değerleri filtrele
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categoryInfo[slug as keyof typeof categoryInfo];
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('tümü');
  const [sortBy, setSortBy] = useState('popüler');
  
  if (!category) {
    notFound();
  }
  
  // Tüm modelleri al
  const allModels = getInvitationModels(slug);
  
  // Filtreleme fonksiyonu
  const filterModels = (models: ReturnType<typeof getInvitationModels>) => {
    let filtered = [...models];
    
    // Filtre uygula
    switch (activeFilter) {
      case 'popüler':
        // Popüler olanları (mühürlü, yaldızlı) öne çıkar
        filtered = filtered.filter(model => {
          const features = getInvitationFeatures(slug, model.code);
          return features.is_sealed === 1 || features.is_inner_gilded === 1 || features.is_envelope_gilded === 1;
        });
        break;
      case 'yeni':
        // Yeni olanları (şeffaf, modern) öne çıkar
        filtered = filtered.filter(model => {
          const features = getInvitationFeatures(slug, model.code);
          return features.is_transparent === 1;
        });
        break;
      default:
        // Tümü - filtreleme yok
        break;
    }
    
    // Sıralama uygula
    switch (sortBy) {
      case 'popüler':
        // Popülerlik sırası (mühürlü > yaldızlı > normal)
        filtered.sort((a, b) => {
          const featuresA = getInvitationFeatures(slug, a.code);
          const featuresB = getInvitationFeatures(slug, b.code);
          const scoreA = (featuresA.is_sealed * 3) + (featuresA.is_inner_gilded * 2) + (featuresA.is_envelope_gilded * 2);
          const scoreB = (featuresB.is_sealed * 3) + (featuresB.is_inner_gilded * 2) + (featuresB.is_envelope_gilded * 2);
          return scoreB - scoreA;
        });
        break;
      case 'yeni':
        // Yeni sırası (şeffaf > modern > klasik)
        filtered.sort((a, b) => {
          const featuresA = getInvitationFeatures(slug, a.code);
          const featuresB = getInvitationFeatures(slug, b.code);
          const scoreA = (featuresA.is_transparent * 3) + (featuresA.is_inner_gilded * 1) + (featuresA.is_envelope_gilded * 1);
          const scoreB = (featuresB.is_transparent * 3) + (featuresB.is_inner_gilded * 1) + (featuresB.is_envelope_gilded * 1);
          return scoreB - scoreA;
        });
        break;
      case 'fiyat-düşük':
        // Fiyat düşükten yükseğe
        filtered.sort((a, b) => parseFloat(a.price.replace('₺', '')) - parseFloat(b.price.replace('₺', '')));
        break;
      case 'fiyat-yüksek':
        // Fiyat yüksekten düşüğe
        filtered.sort((a, b) => parseFloat(b.price.replace('₺', '')) - parseFloat(a.price.replace('₺', '')));
        break;
    }
    
    return filtered;
  };
  
  const filteredModels = filterModels(allModels);
  const models = showAll ? filteredModels : filteredModels.slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Düğün Davetiyesi Dünyası</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">İletişim</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: categoryInfo[slug as keyof typeof categoryInfo]?.name || slug }
          ]} 
        />

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {category.name} Davetiyeleri
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{category.count}+ Model</span>
            <span>•</span>
            <span>5 İş Günü Teslimat</span>
            <span>•</span>
            <span>Kalite Garantisi</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Sırala:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <option value="popüler">En Popüler</option>
              <option value="yeni">En Yeni</option>
              <option value="fiyat-düşük">Fiyat: Düşük-Yüksek</option>
              <option value="fiyat-yüksek">Fiyat: Yüksek-Düşük</option>
            </select>
          </div>
        </div>

                 {/* Models Grid */}
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {models.map((model) => {
              if (!model) return null;
              return (
                <div key={model.id} className="group">
                  <Link href={`/${slug}/${model.code}`} className="block">
                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                     <div className="relative aspect-[3/4] overflow-hidden">
                       <Image
                         src={model.image}
                         alt={model.name}
                         fill
                         className="object-cover group-hover:scale-110 transition-transform duration-300"
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                       <div className="absolute top-2 right-2">
                         <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                           <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                           </svg>
                         </button>
                       </div>
                     </div>
                     <div className="p-4">
                       <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 truncate">
                         {model.name}
                       </h3>
                       <div className="flex items-center justify-between">
                         <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                           {model.price}
                         </span>
                         <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-medium">
                           İncele
                         </span>
                       </div>
                     </div>
                   </div>
                 </Link>
               </div>
             );
           })}
        </div>

        {/* Load More */}
        {!showAll && filteredModels.length > 20 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Daha Fazla Göster ({filteredModels.length - 20} daha)
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">Düğün Davetiyesi Dünyası</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Hayalinizdeki düğün davetiyesini gerçeğe dönüştürüyoruz.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">İletişim</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Kategoriler</h4>
              <ul className="space-y-2">
                <li><Link href="/sade" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Sade</Link></li>
                <li><Link href="/ekopolen" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Ekopolen</Link></li>
                <li><Link href="/stylish" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Stylish</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">İletişim</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">senayofset@gmail.com</li>
                <li className="text-gray-600 dark:text-gray-300">+90 543 274 01 04</li>
                <li className="text-gray-600 dark:text-gray-300">Ankara, Türkiye</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 Düğün Davetiyesi Dünyası. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 