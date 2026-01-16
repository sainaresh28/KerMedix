"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import stepClick from "@/assets/step-click.mp3";

/* ================= DATA ================= */

const keyDifferentiators = [
  "Centralized digital health database",
  "Real-time updates",
  "Strict privacy control",
  "Chronic health tracking",
  "ERP & HRMS Integration",
  "Powerful analytics & reports",
];

const ROW_HEIGHT = 44;

/* ================= COMPONENT ================= */

const DigitalHealthSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const rafLockRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pillY, setPillY] = useState(0);
  const [pillScale, setPillScale] = useState(1);

  /* ---------- INIT SOUND ---------- */
  useEffect(() => {
    const audio = new Audio(stepClick);
    audio.volume = 0.5;
    audioRef.current = audio;
  }, []);

  /* ---------- RESET ON EXIT ---------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const resetObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          lastIndexRef.current = -1;
          setActiveIndex(0);
          setPillY(0);
        }
      },
      { threshold: 0 }
    );

    resetObserver.observe(sectionRef.current);
    return () => resetObserver.disconnect();
  }, []);

  /* ---------- STEP ENGINE (NO JUMPING) ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        if (rafLockRef.current) return;

        rafLockRef.current = true;

        requestAnimationFrame(() => {
          const centerY = window.innerHeight / 2;
          let closestIndex = lastIndexRef.current;
          let minDistance = Infinity;

          itemRefs.current.forEach((el, index) => {
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elCenter - centerY);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          if (closestIndex !== lastIndexRef.current) {
            lastIndexRef.current = closestIndex;
            setActiveIndex(closestIndex);

            const el = itemRefs.current[closestIndex];
            if (el) setPillY(el.offsetTop);

            setPillScale(1.04);
            setTimeout(() => setPillScale(1), 120);

            audioRef.current?.play().catch(() => {});
          }

          rafLockRef.current = false;
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-black">
          Digital Health Records
        </h2>
        <p className="mt-2 text-lg text-black/70 max-w-xl">
          A living digital health ecosystem designed for institutions
        </p>
      </div>

      {/* DESCRIPTION */}
      <div className="max-w-xl text-gray-700 leading-relaxed space-y-2">
        <p>
          KerMedix securely unifies health screenings, clinic visits, chronic
          condition tracking, vaccination history, and counselling records into
          a single trusted health profile.
        </p>
        <p>
          Beyond storage, the platform enables faster decisions during
          emergencies, simplified audits, and deep health trend analysis.
        </p>
      </div>

      {/* DIFFERENTIATORS */}
      <div ref={sectionRef}>
        <h3 className="text-sm uppercase tracking-[0.28em] font-semibold text-black/60 mb-4">
          Key Differentiators
        </h3>

        <div ref={containerRef} className="relative pl-5">

          {/* 🔍 GLASS LENS */}
          <motion.div
            animate={{ y: pillY, scale: pillScale }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
            className="
              absolute left-0
              w-[95%] h-[44px]
              rounded-full
              backdrop-blur-2xl
              bg-white/42
              border border-white/60
              shadow-[0_18px_36px_rgba(0,0,0,0.22)]
              pointer-events-none
            "
          >
            <div className="absolute inset-0 rounded-full ring-1 ring-white/60" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/5" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6F4BD8]/25 via-transparent to-[#402EE6]/25" />
          </motion.div>

          {/* TEXT ROWS */}
          {keyDifferentiators.map((text, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ height: ROW_HEIGHT }}
              className="relative flex items-center"
            >
              <motion.p
                animate={{
                  opacity: activeIndex === index ? 1 : 0.32,
                  scale: activeIndex === index ? 1.06 : 0.98,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-lg font-medium tracking-[-0.01em] text-black"
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DigitalHealthSection;
