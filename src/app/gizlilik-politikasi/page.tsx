import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Düğün Davetiyesi Dünyası',
  description: 'Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi alın.',
  openGraph: {
    title: 'Gizlilik Politikası - Düğün Davetiyesi Dünyası',
    description: 'Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi alın.',
    url: 'https://dugundavetiyesidunyasi.com/gizlilik-politikasi',
    type: 'website',
  },
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Gizlilik Politikası' }
          ]} 
        />
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Genel Bilgiler
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bu gizlilik politikası, Şenay Matbaacılık ("Biz", www.dugundavetiyesidunyasi.com) tarafından sunulan hizmetlerden yararlanan kullanıcıların kişisel verilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Hangi Bilgileri Topluyoruz?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Ad ve Soyad (Sipariş işlemleri için)</li>
                <li>Telefon Numarası (Sipariş süreci için WhatsApp üzerinden iletişim)</li>
                <li>WhatsApp Üzerinden Paylaştığınız Bilgiler (Sipariş detayları ve teslimat adresi)</li>
                <li>Çerezler (Kullanıcı deneyimini geliştirmek için)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Bilgileriniz Nasıl Kullanılır?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Topladığımız veriler şu amaçlarla kullanılır:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Siparişlerinizi işlemek ve size ulaştırmak</li>
                <li>Daha iyi bir kullanıcı deneyimi sunmak</li>
                <li>Yasal yükümlülüklere uymak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Çerezler (Cookies)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezleri kullanmaktadır. Tarayıcınızın ayarlarından çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak bazı çerezleri kapattığınızda web sitemizin bazı bölümleri düzgün çalışmayabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Kişisel Verilerinizin Korunması
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Kişisel verileriniz KVKK kapsamında korunmaktadır ve üçüncü kişilerle kesinlikle paylaşılmaz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 