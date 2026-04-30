"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.logoUrl) {
            // Update favicon
            const updateLink = (rel: string) => {
              let link = document.querySelector(`link[rel*='${rel}']`) as HTMLLinkElement;
              if (!link) {
                link = document.createElement('link');
                link.rel = rel;
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = data.logoUrl;
            };
            updateLink('icon');
            updateLink('shortcut icon');
            updateLink('apple-touch-icon');
          }
        }
      } catch (error) {
        console.error("Failed to load dynamic favicon");
      }
    };
    fetchLogo();
  }, []);

  return null;
}
