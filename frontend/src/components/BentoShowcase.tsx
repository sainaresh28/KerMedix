"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView, useAnimation } from "framer-motion";

import {
  HeartPulse,
  Users,
  QrCode,
  Stethoscope,
  Hospital,
  Languages,
  Cloud,
  AlertCircle,
} from "lucide-react";

const features = [
  {
    title: "Digital Health Records",
    highlight: "10× Faster",
    desc: "Access and manage patient history instantly with AI-backed digital records.",
    span: "md:col-span-2 md:row-span-2",
    icon: HeartPulse,
    bg: "bg-[#4b62fe]",
    text: "text-white",
    type: "hero",
    image: "/images/facility2.png",
  },
  {
    title: "Migrant Worker Support",
    desc: "Supportive and intergrated dashboard access",
    icon: Users,
    bg: "bg-[#F9EFE3]",
    text: "text-black",
    type: "bars",
    image: "/images/facility5.png",
  },
  {
    title: "Smart Health ID",
    desc: "One digital identity usable across clinics, states, and languages.",
    icon: QrCode,
    bg: "bg-[#E9E1FF]",
    text: "text-black",
    type: "metric",
    image: "/images/facility6.png",
  },
  {
    title: "Doctor Dashboard",
    desc: "Smarter clinical decisions with unified patient views.",
    icon: Stethoscope,
    bg: "bg-[#F6C96B]",
    text: "text-black",
    type: "avatars",
    image: "/images/facility3.png",
  },
  {
    title: "Vaccine Coverage Insights",
    desc: "Real-time visibility into vaccination reach and gaps.",
    icon: Hospital,
    bg: "bg-[#f2f2f2]",
    text: "text-black",
    type: "growth",
    image: "/images/vaccine5.png",
  },
  {
    title: "Multilingual UI",
    desc: "Multilingual healthcare access built for migrant populations.",
    icon: Languages,
    bg: "bg-[#E9E1FF]",
    text: "text-black",
    type: "languages",
    image: "/images/facility1.png",
  },
  {
    title: "Smart Appointment Scheduling",
    desc: "Auto-suggests the best appointment slots based on real-time doctor availability.",
    span: "md:col-span-2",
    icon: Cloud,
    bg: "bg-[#E8E4C9]",
    text: "text-black",
    type: "progress",
    image: "/images/facility6.png",
  },
  {
    title: "Emergency Alerts",
    desc: "Instant alerts for critical health conditions.",
    icon: AlertCircle,
    bg: "bg-[#F9EFE3]",
    text: "text-black",
    type: "timer",
    image: "/images/hc5.png",
  },
];

export default function BentoFeatures() {
  return (
    <section className="px-4 md:px-6 py-24 md:py-32 max-w-7xl mx-auto font-['Inter']">
      {/* HEADER */}
      <div className="mb-16 md:mb-24 text-center">
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          Healthcare, but <span className="italic text-[#2f18ff]">smarter</span>.
        </h2>
        <p className="text-gray-500 mt-4 md:mt-8 text-base md:text-2xl">
          Built like a modern SaaS. Designed for real lives.
        </p>
      </div>

      {/* MAC WINDOW */}
      <div className="rounded-[22px] md:rounded-[32px] border bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">

        {/* HEADER BAR */}
        <div className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 border-b bg-blue-700">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 md:ml-4 text-xs md:text-sm text-white font-medium">
            KerMedix Platform
          </span>
        </div>

        {/* GRID */}
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4 md:gap-7 perspective">

          {features.map((item, i) => {
             const [flipped, setFlipped] = useState(false);
              const ref = useRef(null);
              const inView = useInView(ref, { amount: 0.4 });
              const controls = useAnimation();

              const Icon = item.icon;
              const isHero = item.type === "hero";
              const isWide = item.span?.includes("col-span-2") && !isHero;

                useEffect(() => {
                    if (inView) {
                      controls.start("visible");
                    } else {
                      controls.start("hidden");
                    }
                  }, [inView, controls]);


              return (
                  <motion.div
                    ref={ref}
                    animate={controls}
                    initial="hidden"
                    whileHover={{ rotateY: 180 }}
                    whileTap={{ rotateY: 180 }}
                    style={{ transformStyle: "preserve-3d" }}
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    className={`relative card ${item.span ?? ""}`}
                  >




                  {/* FRONT */}
                    <div
                      className={`absolute inset-0 rounded-[22px] md:rounded-[36px] p-4 md:p-8 backface-hidden ${item.bg} ${item.text}
                      ${item.type === "growth" ? "flex flex-col" : ""}`}
                    >

                    {/* ICON */}
                    <Icon className="absolute top-4 md:top-6 right-4 md:right-6 opacity-70 w-6 h-6 md:w-9 md:h-9" />

                    {/* TITLE */}
                    <h3
                      className={`font-extrabold tracking-[-0.03em] leading-[1.1] pr-10
                      ${
                        isHero
                          ? "text-2xl md:text-[64px]"
                          : isWide
                          ? "text-lg md:text-4xl"
                          : "text-base md:text-2xl"
                      }`}
                    >
                      {item.title}
                      {item.highlight && (
                        <span className="block text-lg md:text-[36px] text-[#FFD66B] mt-1 md:mt-2">
                          {item.highlight}
                        </span>
                      )}
                    </h3>

                    {/* DESC */}
                    <p className="mt-2 md:mt-4 opacity-90 text-xs md:text-base max-w-[90%]">
                      {item.desc}
                    </p>

                    {/* HERO CHIPS (desktop only) */}
                        {item.type === "hero" && (
                          <div className="hidden md:block absolute bottom-8 left-8 max-w-[90%] space-y-4">

                            {/* HERO CHIPS */}
                            <div className="flex flex-wrap gap-4">
                              {["24/7 Access", "Secure Sync", "Instant Fetch", "Quick Support","Health Analytics"].map((k) => (
                                <span
                                  key={k}
                                  className="text-sm bg-white/20 px-10 py-5 rounded-full"
                                >
                                  {k}
                                </span>
                              ))}
                            </div>

                          {/* PROGRESS BAR */}
                      <div className="space-y-2">

                        <div className="w-full h-5 rounded-full bg-white/25 overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "82%" }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#FFD66B] to-[#FFC14D] rounded-full"
                          />
                        </div>
                      </div>

                        </div>
                      )}


                    {/* BARS */}
                    {item.type === "bars" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 space-y-2 w-28 md:w-40">
                        {["HI", "ML", "BN"].map((l, idx) => (
                          <motion.div
                            key={l}
                            initial={{ width: 0 }}
                            animate={{ width: `${80 - idx * 15}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="h-2 md:h-3 bg-[#6F4BD8] rounded-full"
                          />
                        ))}
                      </div>
                    )}

                    {/* METRIC */}
                    {item.type === "metric" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 space-y-2">
                        <div className="text-[10px] md:text-sm font-semibold">
                          Universal ID verified
                        </div>
                        <div className="flex gap-1">
                          {["Bio", "Docs", "History"].map((k) => (
                            <motion.div
                              key={k}
                              className="h-1.5 md:h-2 w-6 md:w-9 bg-[#6F4BD8] rounded-full"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AVATARS */}
                    {item.type === "avatars" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex -space-x-2 md:-space-x-3">
                        {[1, 2, 3, 4].map((n) => (
                          <motion.div
                            key={n}
                            className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-white border-2 border-black"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: n * 0.15, type: "spring" }}
                          />
                        ))}
                      </div>
                    )}

                    {/* GROWTH */}
                      {item.type === "growth" && (
                        <div className="mt-auto flex items-center gap-3 md:gap-4">

                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[#6b43d9] flex items-center justify-center"
                        >
                          <span className="text-[10px] md:text-sm font-bold">
                            72%
                          </span>
                        </motion.div>
                        <div className="text-[10px] md:text-sm">
                          <div className="font-semibold">Population covered</div>
                          <div className="opacity-70">28% pending doses</div>
                        </div>
                      </div>
                    )}

                    {/* LANGUAGES */}
                    {item.type === "languages" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex flex-wrap gap-2">
                        {["Hindi", "Malayalam", "English", ].map((l) => (
                          <motion.span
                            key={l}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring" }}
                            className="text-[10px] md:text-sm bg-white px-3 py-1 rounded-full"
                          >
                            {l}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* PROGRESS */}
                    {item.type === "progress" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 w-[80%] md:w-72 h-2 md:h-3 bg-white/20 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1.2 }}
                          className="h-full bg-black rounded-full"
                        />
                      </div>
                    )}

                    {/* TIMER */}
                    {item.type === "timer" && (
                      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex items-center gap-2">
                        <motion.span
                          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                        <span className="text-[10px] md:text-sm font-semibold">
                          Live emergency monitoring
                        </span>
                      </div>
                    )}
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 rounded-[22px] md:rounded-[36px] backface-hidden rotate-y-180 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 text-white text-xs md:text-lg font-semibold">
                      {item.title}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* GLOBAL */}
      <style jsx global>{`
        .perspective { perspective: 1400px; }

        .card {
          transform-style: preserve-3d;
        }

        .card.flip {
          transform: rotateY(180deg);
        }



        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }


      `}</style>
    </section>
  );
}
