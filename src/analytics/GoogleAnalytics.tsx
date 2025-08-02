import Script from "next/script";

const GoogleAnalytics: React.FC = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-8PBKNZ1GMZ"
      strategy="afterInteractive"
    />
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8PBKNZ1GMZ');
        `,
      }}
    />
  </>
);

export default GoogleAnalytics; 