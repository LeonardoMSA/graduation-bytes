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
import { MessagesSection } from "./modern/MessagesSection";
import { PhotoCarousel } from "./modern/PhotoCarousel";
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
          "linear-gradient(180deg, #06122A 0%, #0a2744 50%, #06122A 100%)",
        color: "#f0f6fc",
      }}
    >
      {showConfetti && <ConfettiOverlay />}

      <Hero />

      <RsvpSection onConfirm={launchConfetti} />

      <MapSection />

      <MarqueeStrip />

      <Timeline />

      <SecretConsole onBackToRetro={onBackToRetro} />

      <MessagesSection />

      <PixelArt />

      <PhotoCarousel />

      <Footer />
    </motion.div>
  );
}
