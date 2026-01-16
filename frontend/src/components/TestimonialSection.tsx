import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import logo from "@/assets/logo.png";

const testimonials = [
  {
    name: "Dr. Priya Nair",
    role: "Healthcare Provider, Kochi",
    quote: "KerMedix Health has revolutionized how I access patient records.",
    image: logo,
  },
  {
    name: "Ramesh Kumar",
    role: "Construction Worker",
    quote: "Doctors can instantly access my vaccination history.",
    image: logo,
  },
  {
    name: "Dr. Mohammed Salim",
    role: "Public Health Officer",
    quote: "Multilingual support helps us reach diverse communities.",
    image: logo,
  },
  {
    name: "Anjali Menon",
    role: "Staff Nurse, Trivandrum",
    quote: "Digital health records improved coordination between departments.",
    image: logo,
  },
  {
    name: "Suresh Babu",
    role: "Factory Supervisor",
    quote: "My medical history stays safe and accessible even when I relocate.",
    image: logo,
  },
  {
    name: "Dr. Neethu Thomas",
    role: "Community Health Specialist",
    quote: "KerMedix bridges the gap between public health policy and practice.",
    image: logo,
  },
];


// Desktop globe-style transform
const getDesktopStyle = (pos: number) => {
  if (pos === 0) {
    return {
      x: 0,
      scale: 1.15,
      rotateY: 0,
      zIndex: 3,
      opacity: 1,
    };
  }

  return {
    x: pos * 280,
    scale: 0.92,
    rotateY: pos * -10,
    zIndex: 1,
    opacity: 0.85,
  };
};

const TestimonialSection = () => {
  const [index, setIndex] = useState(1);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const visibleDesktop = [
    testimonials[(index - 1 + testimonials.length) % testimonials.length],
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F9EFE3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black mb-4 md:mb-6">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            See what healthcare providers and workers say about our platform
          </p>
        </div>

        {/* ================= DESKTOP / TABLET ================= */}
        <div className="relative hidden sm:flex items-center justify-center perspective-[1200px]">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 md:-left-16 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            <ChevronLeft />
          </button>

          {/* Cards */}
          <div className="relative w-full h-[420px] flex items-center justify-center">
            {visibleDesktop.map((t, i) => {
              const pos = i - 1;

              return (
                <motion.div
                  key={t.name}
                  animate={getDesktopStyle(pos)}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 22,
                  }}
                  className="absolute w-[300px] md:w-[340px]"
                >
                  <div className="relative bg-green-600 text-white rounded-3xl shadow-2xl px-6 md:px-8 pt-20 pb-10">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30">
                    <div
                      className="
                        w-20 h-20 md:w-24 md:h-24
                        rounded-full
                        border-[5px] border-white
                        shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                        overflow-hidden
                        bg-gray-200
                      "
                    >
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>




                    <Quote className="opacity-80 mb-5" size={26} />

                    <p className="text-sm md:text-base leading-relaxed mb-7">
                      “{t.quote}”
                    </p>

                    <div className="border-t border-white/30 pt-4 text-sm font-semibold">
                      {t.name}
                      <div className="text-xs opacity-80 mt-1">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 md:-right-16 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* ================= MOBILE SWIPE SLIDER ================= */}
        
        <div className="sm:hidden overflow-visible">
          <motion.div
            className="flex"
            drag="x"
            animate={{ x: -index * 100 + "%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next();
              if (info.offset.x > 80) prev();
            }}
          >
            {[...testimonials, testimonials[0]].map((t, i) => (
              <div
                key={i}
                className="min-w-full px-4 flex justify-center"
              >
                <motion.div
                  animate={{
                    scale: i === index ? 1 : 0.94,
                    opacity: i === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-green-600 text-white rounded-3xl shadow-xl px-6 pt-20 pb-8 w-full max-w-sm"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                  <div
                    className="
                      w-20 h-20
                      rounded-full
                      border-[4px] border-white
                      shadow-[0_10px_25px_rgba(0,0,0,0.35)]
                      overflow-hidden
                      bg-gray-200
                    "
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>


                  <Quote className="opacity-80 mb-4" size={24} />

                  <p className="text-sm leading-relaxed mb-6 text-center">
                    “{t.quote}”
                  </p>

                  <div className="border-t border-white/30 pt-4 text-sm font-semibold text-center">
                    {t.name}
                    <div className="text-xs opacity-80 mt-1">
                      {t.role}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>


        {/* Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-green-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
