import { useState, useEffect } from "react";
import type { Lab } from "../types/lab";

export function useLabData() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/labs.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load lab data");
        return res.json();
      })
      .then((data: Lab[]) => {
        setLabs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { labs, loading, error };
}
