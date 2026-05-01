"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  const updateLink = (href: string) => {
    const rels = ['icon', 'shortcut icon', 'apple-touch-icon'];
    rels.forEach(rel => {
      let link = document.querySelector(`link[rel*='${rel}']`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = href;
    });
  };

  useEffect(() => {
    // 1. Try to load from localStorage immediately
    const cachedLogo = localStorage.getItem("cached_logo_url");
    if (cachedLogo) {
      updateLink(cachedLogo);
    }

    const fetchLogo = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.logoUrl) {
            // 2. Update localStorage for next refresh
            localStorage.setItem("cached_logo_url", data.logoUrl);
            // 3. Apply the current logo
            updateLink(data.logoUrl);
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
