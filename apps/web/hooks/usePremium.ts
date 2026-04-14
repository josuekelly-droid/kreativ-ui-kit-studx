import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function usePremium() {
  const { isSignedIn, isLoaded } = useUser();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    async function checkPremiumStatus() {
      try {
        const response = await fetch("/api/user/premium");
        if (response.ok) {
          const data = await response.json();
          setIsPremium(data.isPremium === true);
        } else {
          setIsPremium(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut premium:", error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    }

    checkPremiumStatus();
  }, [isSignedIn, isLoaded]);

  return { isPremium, loading, isSignedIn };
}