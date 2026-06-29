import { useState } from "react";

export function usePages() {
  const [pages] = useState<string[]>(() => {
    const saved = localStorage.getItem("pages");

    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  return pages;
}
