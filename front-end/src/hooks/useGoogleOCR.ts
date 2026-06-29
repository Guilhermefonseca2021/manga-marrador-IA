import { useState } from "react";
import { googleOCR } from "../services/googleOCR";

export function useGoogleOCR() {
  const [loading, setLoading] = useState(false);

  async function process(file: Blob) {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file, "page.png");

      const res = await googleOCR(formData);

      return res.text;
    } finally {
      setLoading(false);
    }
  }

  return { loading, process };
}
