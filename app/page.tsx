"use client";

import { useEffect, useRef, useState } from "react";
import NextDynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";
import confetti from "canvas-confetti";
import { BIRTHDAY_NAME } from "@/config/birthday";

const Confetti = NextDynamic<any>(() => import("react-confetti") as any, {
  ssr: false,
});
const Fireworks = NextDynamic<any>(
  () => import("@fireworks-js/react").then((m: any) => m.Fireworks || m),
  { ssr: false }
);
const Particles = NextDynamic<any>(
  () => import("@tsparticles/react").then((m: any) => m.Particles || m.default || m),
  { ssr: false }
);
const TypeAnimation = NextDynamic<any>(
  () => import("react-type-animation").then((m: any) => m.TypeAnimation || m),
  { ssr: false }
);

export const dynamic = "force-static";

const galleryImages = [
  "/WhatsApp Image 2025-11-13 at 20.10.07_6cc942e6.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.08_5971e770.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.08_7980811a.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.08_7dab9fe2.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.09_9d04c52a.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.09_b34d03fe.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.09_b85b0849.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.10_355be30f.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.10_3d345689.jpg",
  "/WhatsApp Image 2025-11-13 at 20.10.10_4be2519c.jpg",
];

export default function Home() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserPlay, setNeedsUserPlay] = useState(false);
  const playerRef = useRef<any>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  useEffect(() => {
    const audio = playerRef.current?.audioEl?.current;
    if (!audio) return;
    if (isCelebrating) {
      audio.muted = isMuted;
      try {
        audio.currentTime = 0;
      } catch {}
      audio
        .play()
        .then(() => setNeedsUserPlay(false))
        .catch(() => setNeedsUserPlay(true));
    } else {
      audio.pause();
    }
  }, [isCelebrating]);

  useEffect(() => {
    const audio = playerRef.current?.audioEl?.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const update = () =>
      setViewport({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);


  const handleBurstConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 40,
      decay: 0.9,
      origin: { y: 0.4 },
      colors: ["#f43f5e", "#fb7185", "#a78bfa", "#38bdf8", "#22c55e"],
    });
  };

  const handleCelebrate = () => {
    setIsCelebrating((v) => {
      if (!v) {
        handleBurstConfetti();
      }
      return !v;
    });
  };

  const nextGallery = () => {
    setGalleryIndex((i) => (i + 1) % galleryImages.length);
  };

  const prevGallery = () => {
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="balloon balloon--1" />
        <span className="balloon balloon--2" />
        <span className="balloon balloon--3" />
        <span className="balloon balloon--4" />
        <span className="balloon balloon--5" />
        <span className="balloon balloon--6" />
      </div>

      {isCelebrating && (
        <div className="pointer-events-none fixed inset-0 z-25">
          <Particles
            id="tsparticles"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              particles: {
                number: { value: 30 },
                color: { value: ["#f43f5e", "#fb7185", "#a78bfa", "#38bdf8"] },
                shape: { type: "circle" },
                opacity: { value: 0.6 },
                size: { value: { min: 1, max: 4 } },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  outModes: { default: "out" },
                },
              },
              detectRetina: true,
            }}
            init={async (engine: any) => {
              const { loadSlim } = await import("@tsparticles/slim");
              await loadSlim(engine);
            }}
          />
        </div>
      )}

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-sm items-center justify-center p-5">
        <section className="w-full space-y-6">
          <motion.div
            className="rounded-3xl border border-rose-100 bg-white/70 p-6 shadow-xl backdrop-blur"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            <div className="mb-4 text-center">
              <div className="mx-auto mb-3 h-12 w-12 animate-bounce rounded-2xl bg-rose-500/10 p-2 ring-1 ring-rose-200">
                <div
                  className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-2xl"
                  role="img"
                  aria-label="Konfeti pesta"
                >
                  🎊
                </div>
              </div>
              <motion.h1
                className="text-2xl font-semibold tracking-tight text-rose-900"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <TypeAnimation
                  sequence={[
                    `Selamat Ulang Tahun, ${BIRTHDAY_NAME}! 🎉`,
                    1000,
                    () => setShowText1(true),
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={0}
                  cursor={false}
                />
              </motion.h1>
              {showText1 && (
                <motion.div
                  className="mt-2 text-sm leading-6 text-rose-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TypeAnimation
                    sequence={[
                      "Wah, akhirnya hari spesial kamu datang juga! Semoga tahun ini jadi tahun terbaik buat kamu ya. Semoga semua yang kamu pengen bisa tercapai, terus sehat selalu, dan bahagia terus!",
                      1000,
                      () => setShowText2(true),
                    ]}
                    wrapper="p"
                    speed={60}
                    repeat={0}
                    cursor={false}
                  />
                </motion.div>
              )}
              {showText2 && (
                <motion.div
                  className="mt-2 text-sm leading-6 text-rose-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TypeAnimation
                    sequence={[
                      "Oh iya, ini kado kecil-kecilan dariku buat kamu. Aplikasi sederhana ini semoga bisa bikin kamu senyum. Coba tekan tombol \"Buka Kejutan ✨\" di bawah, ada surprise kecil buat kamu!",
                      1000,
                      () => setShowText3(true),
                    ]}
                    wrapper="p"
                    speed={60}
                    repeat={0}
                    cursor={false}
                  />
                </motion.div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                onClick={handleCelebrate}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition active:scale-[0.98]"
                whileTap={{ scale: 0.97 }}
              >
                {isCelebrating ? "Sembunyikan Kejutan ✨" : "Buka Kejutan ✨"}
              </motion.button>
            </div>

            <AnimatePresence>
              {isCelebrating && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="mb-3 text-center text-xs font-medium text-rose-700">
                    Musik diputar otomatis. Selamat berpesta! 🎶
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        const audio = playerRef.current?.audioEl?.current;
                        if (!audio) return;
                        audio
                          .play()
                          .then(() => setNeedsUserPlay(false))
                          .catch(() => setNeedsUserPlay(true));
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition ${
                        needsUserPlay
                          ? "bg-rose-500 hover:bg-rose-600"
                          : "bg-rose-400 hover:bg-rose-500"
                      }`}
                    >
                      {needsUserPlay ? "Putar Musik 🎵" : "Putar Lagi 🔁"}
                    </button>
                    <button
                      onClick={() => setIsMuted((v) => !v)}
                      className="rounded-full bg-rose-100 px-4 py-2 text-xs font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-200"
                    >
                      {isMuted ? "Nyalakan Suara 🔊" : "Bisukan 🔇"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gallery Carousel */}
            <AnimatePresence>
              {isCelebrating && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-3 text-center text-sm font-semibold text-rose-900">
                    Galeri 📸
                  </h3>
                  <div className="relative mx-auto w-full px-4 sm:px-8">
                    <div className="relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                          transform: `translateX(calc(-${galleryIndex} * (100% - 1.5rem) + 1.5rem))`,
                        }}
                      >
                        {galleryImages.map((src, idx) => {
                          const isActive = idx === galleryIndex;
                          const distance = Math.abs(idx - galleryIndex);
                          
                          return (
                            <div
                              key={idx}
                              className="flex-shrink-0 transition-all duration-500"
                              style={{
                                width: "calc(100% - 3rem)",
                                minWidth: "calc(100% - 3rem)",
                                marginRight: idx === galleryImages.length - 1 ? "0" : "1.5rem",
                                transform: isActive
                                  ? "scale(1)"
                                  : distance === 1
                                  ? "scale(0.85)"
                                  : "scale(0.7)",
                                opacity: distance <= 1 ? 1 : distance === 2 ? 0.5 : 0.3,
                                zIndex: isActive ? 10 : distance === 1 ? 5 : 1,
                              }}
                            >
                              <div
                                className={`relative mx-auto h-64 w-full overflow-hidden rounded-2xl transition-all duration-500 ${
                                  isActive
                                    ? "shadow-2xl ring-2 ring-rose-200"
                                    : "shadow-lg ring-1 ring-rose-100/50"
                                }`}
                              >
                                <img
                                  src={src}
                                  alt={`Foto kenangan ${idx + 1}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                                {!isActive && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={prevGallery}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110 active:scale-95"
                      aria-label="Foto sebelumnya"
                    >
                      <span className="text-lg">←</span>
                    </button>
                    <button
                      onClick={nextGallery}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110 active:scale-95"
                      aria-label="Foto berikutnya"
                    >
                      <span className="text-lg">→</span>
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGalleryIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === galleryIndex
                              ? "w-6 bg-rose-500"
                              : "w-1.5 bg-rose-300/60 hover:bg-rose-400/80"
                          }`}
                          aria-label={`Lompat ke foto ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-rose-700">
              <div className="rounded-2xl bg-rose-50 p-3">
                🎵 <div className="mt-1 font-medium">Musik</div>
              </div>
              <div className="rounded-2xl bg-rose-50 p-3">
                🎊 <div className="mt-1 font-medium">Konfeti</div>
              </div>
              <div className="rounded-2xl bg-rose-50 p-3">
                📱 <div className="mt-1 font-medium">Hadiah</div>
              </div>
            </div>

            {showText3 && (
              <motion.div
                className="mt-6 rounded-2xl bg-rose-50 p-4 text-center text-sm text-rose-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TypeAnimation
                  sequence={[
                    `P.S. Maaf ya kue dan kado fisiknya nggak ada, cuma aplikasi kecil ini aja. Tapi semoga bisa bikin kamu senyum dikit. Selamat ulang tahun lagi, ${BIRTHDAY_NAME}! 🎂`,
                    2000,
                  ]}
                  wrapper="p"
                  speed={60}
                  repeat={0}
                  cursor={false}
                />
              </motion.div>
            )}
          </motion.div>

          <p className="text-center text-xs text-rose-500">
            Dibuat dengan tulus • Next.js + Tailwind
          </p>
        </section>
      </main>

      {/* Hidden audio player (ReactAudioPlayer) */}
      <ReactAudioPlayer
        ref={playerRef}
        src={"/happy%20birthday.mp3"}
        preload="auto"
        loop
        muted={isMuted}
        style={{ display: "none" }}
      />

      {isCelebrating && (
        <div className="pointer-events-none fixed inset-0 z-30">
          <Confetti
            width={viewport.width}
            height={viewport.height}
            recycle
            numberOfPieces={120}
            gravity={0.18}
            wind={0.01}
          />
        </div>
      )}

      {isCelebrating && (
        <div className="pointer-events-none fixed inset-0 z-35">
          <Fireworks
            options={{
              autoresize: true,
              opacity: 0.5,
            }}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
              background: "transparent",
            }}
          />
        </div>
      )}

      {isCelebrating && (
        <div aria-hidden className="confetti absolute inset-0 z-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
