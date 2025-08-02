'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import prices from "../../../data/prices.json";
import Breadcrumb from "../../../components/Breadcrumb";

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

interface InvitationFeatures {
  is_sealed: number;
  is_inner_gilded: number;
  is_envelope_gilded: number;
  is_transparent: number;
}

// Kategori bilgileri
const categoryInfo = {
  sade: {
    name: "Sade",
    description: "Minimalist ve şık tasarımlar",
    count: 100,
    color: "from-blue-500 to-cyan-500",
    startId: 22523,
    endId: 22622,
    basePrice: 3.50
  },
  ekopolen: {
    name: "Ekopolen", 
    description: "Çevre dostu ve modern",
    count: 100,
    color: "from-green-500 to-emerald-500",
    startId: 40333,
    endId: 40432,
    basePrice: 3.50
  },
  stylish: {
    name: "Stylish",
    description: "Trend ve lüks tasarımlar",
    count: 75,
    color: "from-purple-500 to-pink-500",
    startId: 10301,
    endId: 10386,
    basePrice: 4.50
  }
};

// Tüm davetiye kodlarını al
const getAllInvitationCodes = () => {
  const allCodes: Array<{ code: string; category: string }> = [];
  
  // Sade kategorisi (22500-22622)
  for (let i = 22500; i <= 22622; i++) {
    allCodes.push({ code: i.toString(), category: 'sade' });
  }
  
  // Ekopolen kategorisi (40301-40432)
  for (let i = 40301; i <= 40432; i++) {
    allCodes.push({ code: i.toString(), category: 'ekopolen' });
  }
  
  // Stylish kategorisi (10301-10386)
  for (let i = 10301; i <= 10386; i++) {
    allCodes.push({ code: i.toString(), category: 'stylish' });
  }
  
  return allCodes;
};

// Benzer davetiyeleri özelliklerine göre seç
const getSimilarInvitations = (currentFeatures: InvitationFeatures, currentCode: string, limit: number = 6) => {
  const allCodes = getAllInvitationCodes();
  
  // Mevcut davetiyenin özelliklerini al
  const hasSealed = currentFeatures.is_sealed === 1;
  const hasInnerGilded = currentFeatures.is_inner_gilded === 1;
  const hasEnvelopeGilded = currentFeatures.is_envelope_gilded === 1;
  const hasTransparent = currentFeatures.is_transparent === 1;
  
  // Özellik skorlaması için fonksiyon
  const calculateSimilarityScore = (features: InvitationFeatures) => {
    let score = 0;
    
    // Aynı özellikler için yüksek puan
    if (features.is_sealed === (hasSealed ? 1 : 0)) score += 10;
    if (features.is_inner_gilded === (hasInnerGilded ? 1 : 0)) score += 8;
    if (features.is_envelope_gilded === (hasEnvelopeGilded ? 1 : 0)) score += 8;
    if (features.is_transparent === (hasTransparent ? 1 : 0)) score += 8;
    
    // Özellik sayısına göre bonus
    const currentFeatureCount = [hasSealed, hasInnerGilded, hasEnvelopeGilded, hasTransparent].filter(x => x === true).length;
    const targetFeatureCount = [features.is_sealed, features.is_inner_gilded, features.is_envelope_gilded, features.is_transparent].filter(x => x === 1).length;
    
    if (currentFeatureCount === targetFeatureCount) score += 5;
    
    return score;
  };
  
  // Tüm davetiyeleri değerlendir ve rastgele karıştır
  const allScoredInvitations = allCodes
    .filter(item => item.code !== currentCode) // Mevcut davetiyeyi hariç tut
    .map(item => {
      const features = getInvitationFeatures(item.category, item.code);
      const score = calculateSimilarityScore(features);
      return {
        ...item,
        features,
        score
      };
    })
    .sort(() => Math.random() - 0.5); // Önce rastgele karıştır
  
  // Benzer özellikli davetiyeleri al
  const similarInvitations = allScoredInvitations
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.floor(limit / 2)); // Benzer özellikli olanların yarısı
  
  // Çeşitlilik için farklı özellikli davetiyeleri de al
  const diverseInvitations = allScoredInvitations
    .filter(item => item.score === 0) // Hiç benzer özelliği olmayanlar
    .slice(0, Math.floor(limit / 4)); // Çeşitlilik için 1/4
  
  // Rastgele davetiyeleri al
  const randomInvitations = allScoredInvitations
    .filter(item => !similarInvitations.includes(item) && !diverseInvitations.includes(item))
    .slice(0, limit - similarInvitations.length - diverseInvitations.length);
  
  // Tüm listeleri birleştir ve rastgele karıştır
  const finalList = [...similarInvitations, ...diverseInvitations, ...randomInvitations]
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
  
  return finalList;
};

// Davetiye kodlarını dosya adlarından al (sadece mevcut dosyalar)
const getInvitationCodes = (category: string) => {
  if (category === 'sade') {
    // Sade kategorisi için mevcut davetiyeler
    const sadeCodes = [];
    for (let i = 22500; i <= 22622; i++) {
      sadeCodes.push(i.toString());
    }
    return sadeCodes;
  } else if (category === 'ekopolen') {
    // Ekopolen kategorisi için mevcut davetiyeler (40301-40432 arası)
    const ekopolenCodes = [];
    for (let i = 40301; i <= 40432; i++) {
      ekopolenCodes.push(i.toString());
    }
    return ekopolenCodes;
  } else if (category === 'stylish') {
    // Stylish kategorisi için mevcut davetiyeler (10301-10386 arası)
    const stylishCodes = [];
    for (let i = 10301; i <= 10386; i++) {
      stylishCodes.push(i.toString());
    }
    return stylishCodes;
  }
  return [];
};

// URL'den davetiye kodunu çıkar
const extractCodeFromUrl = (urlCode: string) => {
  if (!urlCode) return '';
  
  if (urlCode.startsWith('dugun-davetiyesi-')) {
    return urlCode.replace('dugun-davetiyesi-', '');
  }
  return urlCode;
};

// Fiyat hesaplama fonksiyonu
const getPrice = (category: string, code: string) => {
  const categoryData = (prices as PricesData)[category as keyof PricesData];
  if (!categoryData) return categoryInfo[category as keyof typeof categoryInfo]?.basePrice || 0;
  
  const priceData = categoryData[code as keyof CategoryData] as PriceData;
  if (!priceData) return categoryInfo[category as keyof typeof categoryInfo]?.basePrice || 0;
  
  return priceData.price;
};

// Yeni fiyat hesaplama fonksiyonu (kar mekanizması ile)
const calculatePrice = (basePrice: number, quantity: number = 50, features?: InvitationFeatures) => {
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
    muhurUcreti = quantity * 9.5 + 450; // Adet başı 9.5 TL + tek seferlik 450 TL
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

// Davetiye özelliklerini al
const getInvitationFeatures = (category: string, code: string): InvitationFeatures => {
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

// Davetiye detay bilgileri
const getInvitationDetails = (category: string, davetiyeKodu: string) => {
  const categoryData = categoryInfo[category as keyof typeof categoryInfo];
  
  if (!categoryData || !davetiyeKodu) return null;
  
  // URL'den gerçek kodu çıkar
  const realCode = extractCodeFromUrl(davetiyeKodu);
  
  if (!realCode) return null;
  
  const codes = getInvitationCodes(category);
  const codeIndex = codes.indexOf(realCode);
  
  if (codeIndex === -1) return null;
  
  const fileName = `${realCode}.webp`;
  
  // Fiyat ve özellikleri al
  let basePrice = getPrice(category, realCode);
  const features = getInvitationFeatures(category, realCode);
  
  // Eğer fiyat yoksa varsayılan fiyat kullan (tüm kategoriler için)
  if (basePrice <= 0) {
    basePrice = 3.50; // Varsayılan davetiye fiyatı
  }
  
  // Özellik açıklamaları
  const featureDescriptions = [
    "Yüksek kaliteli baskı",
    "Özel tasarım",
    "Hızlı teslimat",
    "Ücretsiz kargo"
  ];
  
  // Yaldız özelliklerini ekle
  if (features.is_envelope_gilded) {
    featureDescriptions.push("Yaldız Zarf");
  }
  if (features.is_inner_gilded) {
    featureDescriptions.push("Yaldız İç Kart");
  }
  if (features.is_transparent) {
    featureDescriptions.push("Şeffaf Davetiye");
  }
  if (features.is_sealed) {
    featureDescriptions.push("Mühürlü Zarf");
  }
  
  // Fiyat hesaplama (kar mekanizması ile)
  const priceInfo = calculatePrice(basePrice, 50);
  
  return {
    id: realCode,
    name: `${categoryData.name} Davetiyesi ${realCode}`,
    image: `/${category}/${fileName}`,
    basePrice: basePrice,
    unitPrice: priceInfo.unitPrice,
    priceInfo: priceInfo,
    description: `${categoryData.name} kategorisindeki özel tasarım davetiye modeli ${realCode}. Kaliteli baskı ve şık tasarım ile unutulmaz anlarınızı taçlandırın.`,
    features: featureDescriptions,
    priceData: features
  };
};

export default function InvitationDetailPage({ params }: { params: Promise<{ slug: string, davetiyeKodu: string }> }) {
  const { slug, davetiyeKodu } = use(params);
  const category = slug;
  
  const categoryData = categoryInfo[category as keyof typeof categoryInfo];
  const invitation = getInvitationDetails(category, davetiyeKodu);
  const [quantity, setQuantity] = useState(100);
  
  if (!categoryData || !invitation) {
    notFound();
  }

  // Dinamik fiyat hesaplama
  const dynamicPriceInfo = calculatePrice(invitation.basePrice, quantity, invitation.priceData);
  const totalPrice = dynamicPriceInfo.totalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Düğün Davetiyesi Dünyası</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Hakkımızda</Link>
            <Link href="/iletisim" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">İletişim</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: categoryInfo[slug as keyof typeof categoryInfo]?.name || slug, href: `/${slug}` },
            { label: davetiyeKodu }
          ]} 
        />

        {/* Product Details */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Product Image - Daha küçük */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <Image
                  src={invitation.image}
                  alt={invitation.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info - Daha geniş */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {invitation.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {invitation.description}
              </p>
            </div>

            {/* Product Features */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Özellikler</h3>
              <div className="grid grid-cols-2 gap-3">
                {invitation.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
                             {/* Yaldız Özellikleri */}
               {(invitation.priceData.is_envelope_gilded === 1 || invitation.priceData.is_inner_gilded === 1 || invitation.priceData.is_transparent === 1 || invitation.priceData.is_sealed === 1) && (
                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                   <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Özel Özellikler</h4>
                   <div className="flex flex-wrap gap-2">
                     {invitation.priceData.is_envelope_gilded === 1 && (
                       <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">✨ Yaldız Zarf</span>
                     )}
                     {invitation.priceData.is_inner_gilded === 1 && (
                       <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">✨ Yaldız İç Kart</span>
                     )}
                     {invitation.priceData.is_transparent === 1 && (
                       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">🔍 Şeffaf Davetiye</span>
                     )}
                     {invitation.priceData.is_sealed === 1 && (
                       <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">🔒 Mühürlü Zarf</span>
                     )}
                   </div>
                 </div>
               )}
            </div>

            {/* Quantity Selector */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sipariş Adedi</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Adet:</label>
                                     <select 
                     value={quantity}
                     onChange={(e) => setQuantity(Number(e.target.value))}
                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                   >
                     <option value={50}>50</option>
                     <option value={100}>100</option>
                     <option value={150}>150</option>
                     <option value={200}>200</option>
                     <option value={250}>250</option>
                     <option value={300}>300</option>
                     <option value={350}>350</option>
                     <option value={400}>400</option>
                     <option value={450}>450</option>
                     <option value={500}>500</option>
                     <option value={550}>550</option>
                     <option value={600}>600</option>
                     <option value={650}>650</option>
                     <option value={700}>700</option>
                     <option value={750}>750</option>
                     <option value={800}>800</option>
                     <option value={850}>850</option>
                     <option value={900}>900</option>
                     <option value={950}>950</option>
                     <option value={1000}>1000</option>
                   </select>
                </div>
                
                {/* Price Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Toplam Fiyat:</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₺{totalPrice.toFixed(2)}
                    </span>
                  </div>
                                     <div className="mt-2">
                     <p className="text-sm text-gray-600 dark:text-gray-300">
                       Birim fiyat: ₺{dynamicPriceInfo.unitPrice.toFixed(2)}
                     </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <a 
                href={`https://wa.me/905432740104?text=Merhabalar, ${davetiyeKodu} numaralı davetiyeden ${quantity} adet sipariş vermek istiyorum. Toplam fiyat: ₺${totalPrice.toFixed(2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg block text-center"
              >
                Sipariş Ver
              </a>
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3">
                Ücretsiz kargo ile hızlı teslimat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Benzer Davetiyeler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {(() => {
            const currentCode = extractCodeFromUrl(davetiyeKodu || '');
            const currentFeatures = invitation?.priceData || { is_sealed: 0, is_inner_gilded: 0, is_envelope_gilded: 0, is_transparent: 0 };
            
            // Deterministik benzer davetiyeler seçimi
            const similarInvitations = getSimilarInvitations(currentFeatures, currentCode, 12);
            
            return similarInvitations.slice(0, 8).map((item, index) => {
              const relatedInvitation = getInvitationDetails(item.category, `dugun-davetiyesi-${item.code}`);
              if (!relatedInvitation) return null;
              
              return (
                <Link 
                  key={`${item.category}-${item.code}-${index}`} 
                  href={`/${item.category}/dugun-davetiyesi-${item.code}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={relatedInvitation.image}
                        alt={relatedInvitation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {relatedInvitation.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        ₺{relatedInvitation.unitPrice.toFixed(2)}
                      </p>
                      {/* Özellik etiketleri */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.features.is_sealed === 1 && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">Mühürlü</span>
                        )}
                        {item.features.is_envelope_gilded === 1 && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">Yaldız Zarf</span>
                        )}
                        {item.features.is_inner_gilded === 1 && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded">Yaldız İç</span>
                        )}
                        {item.features.is_transparent === 1 && (
                          <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">Şeffaf</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
} 