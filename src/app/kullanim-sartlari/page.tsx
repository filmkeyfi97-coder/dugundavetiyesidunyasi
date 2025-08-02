import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Kullanım Şartları - Düğün Davetiyesi Dünyası',
  description: 'Web sitemizi kullanırken uymanız gereken şartlar ve koşullar hakkında bilgi alın.',
  openGraph: {
    title: 'Kullanım Şartları - Düğün Davetiyesi Dünyası',
    description: 'Web sitemizi kullanırken uymanız gereken şartlar ve koşullar hakkında bilgi alın.',
    url: 'https://dugundavetiyesidunyasi.com/kullanim-sartlari',
    type: 'website',
  },
};

export default function KullanimSartlariPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kullanım Şartları' }
          ]} 
        />
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Kullanım Şartları
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Hizmet Tanımı
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Şenay Matbaacılık, düğün davetiyesi tasarımı ve satışı yapmaktadır. Satış işlemleri web sitesi üzerinden yönlendirilerek tamamlanmaktadır. Ödeme işlemleri güvenli bir şekilde yapılır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Kullanıcı Yükümlülükleri
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Web sitemizi yasalara uygun bir şekilde kullanmayı kabul edersiniz.</li>
                <li>Sipariş verdiğinizde, sipariş bilgilerinin doğru ve eksiksiz olduğunu onaylarsınız.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Sorumluluk Reddi
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Web sitemizde yer alan içerikler, bilgiler ve fiyatlandırmalar değiştirilebilir.</li>
                <li>Online ödeme kabul edilmemektedir; tüm ödemeler, ödeme yöntemlerine uygun olarak güvenli bir şekilde yapılır.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Çerezler ve Veri Kullanımı
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Web sitemizi ziyaret ettiğinizde, çerezlerin kullanılmasını kabul etmiş olursunuz. Çerezleri tarayıcı ayarlarınızdan değiştirebilirsiniz.</li>
                <li>Kişisel bilgileriniz üçüncü kişilerle kesinlikle paylaşılmaz ve yalnızca sipariş işlemleri için kullanılır.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Değişiklikler
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bu kullanım şartları zaman zaman güncellenebilir. En güncel versiyon her zaman web sitemizde yayınlanacaktır.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 