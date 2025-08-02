'use client';

import Image from "next/image";
import Link from "next/link";

// Kategori bilgileri
const categories = [
  {
    slug: 'sade',
    name: 'Sade',
    description: 'Minimalist ve şık tasarımlar',
    image: '/sade/22523.webp',
    color: 'from-blue-500 to-cyan-500',
    count: 100
  },
  {
    slug: 'ekopolen',
    name: 'Ekopolen',
    description: 'Çevre dostu ve modern',
    image: '/ekopolen/40333.webp',
    color: 'from-green-500 to-emerald-500',
    count: 100
  },
  {
    slug: 'stylish',
    name: 'Stylish',
    description: 'Trend ve lüks tasarımlar',
    image: '/stylish/10301.webp',
    color: 'from-purple-500 to-pink-500',
    count: 75
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Düğün Davetiyesi Dünyası</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Hakkımızda</Link>
            <Link href="/iletisim" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">İletişim</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Düğün Davetiyesi Dünyası
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Hayalinizdeki düğün davetiyesini gerçeğe dönüştürüyoruz. 
            Kaliteli baskı, özel tasarım ve hızlı teslimat garantisi.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ 500+ Model</span>
            <span>✓ 5 İş Günü Teslimat</span>
            <span>✓ Kalite Garantisi</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Davetiye Katalogları
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/${category.slug}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {category.count}+ Model
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                        İncele
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Neden Bizi Seçmelisiniz?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Kaliteli Baskı</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Profesyonel baskı teknolojileri ile yüksek kaliteli sonuçlar
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Hızlı Teslimat</h3>
            <p className="text-gray-600 dark:text-gray-300">
              5 iş günü içinde kapınıza teslimat garantisi
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Özel Tasarım</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Benzersiz ve kişiselleştirilmiş davetiye tasarımları
            </p>
          </div>
        </div>
      </section>

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
