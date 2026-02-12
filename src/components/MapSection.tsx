import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12 font-modern bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
      >
        Localização
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="font-modern font-bold text-lg">Local do Evento</h3>
              <p className="text-sm opacity-70 font-modern mt-1">
                Rua Antônio Vitrúvio, 49 - Poço da Panela
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="glass rounded-lg px-4 py-2 text-sm font-modern">
              📅 14 de março de 2026
            </div>
            <div className="glass rounded-lg px-4 py-2 text-sm font-modern">
              🕐 16h
            </div>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Rua+Ant%C3%B4nio+Vitr%C3%BAvio%2C+49+-+Po%C3%A7o+da+Panela%2C+Recife+-+PE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-modern text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, hsl(250, 80%, 67%), hsl(280, 60%, 50%))",
              color: "#fff",
            }}
          >
            🗺️ Como chegar
          </a>
        </div>

        {/* Map Embed */}
        <div className="w-full h-[300px] sm:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.639587699286!2d-34.92789038905483!3d-8.036043691957492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab190a5198bb61%3A0x7047e6d46330725c!2sR.%20Ant%C3%B4nio%20Vitr%C3%BAvio%2C%2049%20-%20Po%C3%A7o%20da%20Panela%2C%20Recife%20-%20PE%2C%2052061-210!5e0!3m2!1sen!2sbr!4v1770926741118!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter:
                "invert(0.9) hue-rotate(180deg) saturate(0.5) brightness(0.8)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do evento"
          />
        </div>
      </motion.div>
    </section>
  );
}
