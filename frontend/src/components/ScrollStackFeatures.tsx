import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const CARD_COLORS = [
  "#402EE6", 
  "#FFCC33", 
  "#402EE6",
  "#FFCC33", 
];

const isDarkBg = (color: string) =>
  color === "#6F4BD8" || color === "#402EE6";

export default function ScrollStackFeatures({
  features,
}: {
  features: Feature[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });


  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.9,
  });

  return (
    <section
      ref={ref}
      className="relative h-[340vh] bg-[#F9EFE3]"
    >
      {/* STICKY PIN */}
      <div className="sticky top-0 h-screen flex justify-center pt-20 perspective-[1200px]">

        <div className="relative w-full max-w-5xl h-[580px]">
          {features.map((feature, index) => {
            const total = features.length;
            const start = index / total;
            const end = (index + 1) / total;

            const bgColor =
              CARD_COLORS[index % CARD_COLORS.length];

            const textColor = isDarkBg(bgColor)
              ? "#FFFFFF"
              : "#000000";

            // MOTION
            const y =index === 0 ? 0 : useTransform(smooth, [start, end], [200, 0]);

            const scale = useTransform(
              smooth,
              [0, start],
              [1 - index * 0.045, 1 - index * 0.045]
            );
            const rotateX = useTransform(
              smooth,
              [start, end],
              [10, 0]
            );
            const opacity = useTransform(
              smooth,
              [start - 0.06, start],
              [0, 1]
            );

            return (
              <motion.div
                key={feature.title}
                style={{
                  y,
                  scale,
                  rotateX,
                  opacity,
                  zIndex: 100 + index,
                  transformStyle: "preserve-3d",
                }}
                className="
                  absolute inset-0
                  rounded-[28px]
                  overflow-hidden
                  bg-white
                "
              >
                {/* IMAGE */}
                <div className="h-[70%] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT */}
                <div
                  className="h-[30%] px-8 py-6 flex flex-col justify-center"
                  style={{ backgroundColor: bgColor }}
                >
                  <h4
                    style={{
                      fontFamily: "Clash Display, sans-serif",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: textColor,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {feature.title}
                  </h4>

                  <p
                    style={{
                      marginTop: "0.6rem",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: textColor,
                      opacity: 0.95,
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* DEPTH SHADOW */}
                <div
                  className="absolute inset-0 rounded-[28px] pointer-events-none"
                  style={{
                    boxShadow: `0 ${24 + index * 8}px ${
                      48 + index * 12
                    }px rgba(0,0,0,0.25)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
