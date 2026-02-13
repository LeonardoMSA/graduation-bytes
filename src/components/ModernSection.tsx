import { motion, AnimatePresence } from "framer-motion";
import Timeline from "./Timeline";
import MapSection from "./MapSection";
import { useEffect, useState, useRef, useCallback } from "react";
import { ConfettiOverlay } from "./modern/ConfettiOverlay";
import { RsvpSection } from "./modern/RsvpSection";
import { MarqueeStrip } from "./modern/MarqueeStrip";
import { SecretConsole } from "./modern/SecretConsole";
import { PixelArt } from "./modern/PixelArt";
import { Hero } from "./modern/Hero";
import { Footer } from "./modern/Footer";
import { TOTAL_EGGS } from "./shared/constants";

interface ModernSectionProps {
  /** Go back to retro interface (through the loader) */
  onBackToRetro?: () => void;
}

export default function ModernSection({ onBackToRetro }: ModernSectionProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const launchConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative dark"
      style={{
        background:
          "linear-gradient(180deg, hsl(230,25%,7%) 0%, hsl(250,30%,10%) 50%, hsl(230,25%,7%) 100%)",
        color: "hsl(210,40%,98%)",
      }}
    >
      {showConfetti && <ConfettiOverlay />}

      <Hero />

      <RsvpSection onConfirm={launchConfetti} />

      <MarqueeStrip />

      <Timeline />

      <SecretConsole onBackToRetro={onBackToRetro} />

      <PixelArt />

      <MapSection />

      <Footer />
    </motion.div>
  );
}
