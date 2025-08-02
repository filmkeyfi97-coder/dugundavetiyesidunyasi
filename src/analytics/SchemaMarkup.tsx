import React from "react";

const SchemaMarkup: React.FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Düğün Davetiyesi Dünyası",
        "url": "https://dugundavetiyesidunyasi.com",
        "logo": "https://dugundavetiyesidunyasi.com/logo.png",
        "description": "Hayalinizdeki düğün davetiyesini tasarlayın ve özel anlarınızı unutulmaz kılın.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ankara",
          "addressCountry": "TR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-543-274-01-04",
          "contactType": "customer service",
          "email": "senayofset@gmail.com"
        },
        "sameAs": [
          "https://www.facebook.com/dugundavetiyesidunyasi",
          "https://www.instagram.com/dugundavetiyesidunyasi"
        ]
      })
    }}
  />
);

export default SchemaMarkup; 