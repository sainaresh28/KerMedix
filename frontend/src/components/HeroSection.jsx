import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

import introImage from "@/assets/1635203.jpg";
import houseboat from "@/assets/houseboat_silhouette.png";
import workers from "@/assets/health_workers.png";
import healthUI from "@/assets/smart_health_ui.png";

/* ================= HERO CSS ================= */

const heroCss = `
.hero-section{
  position:relative;
  width:100%;
  overflow:hidden;
}

.hero-bg-wrapper{
  position:absolute;
  inset:0;
  padding:16px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.hero-bg{
  width:100%;
  height:90%;
  border-radius:26px;
  object-fit:cover;
}

/* text container clipped inside hero */
.hero-content{
  position:absolute;
  inset:16px;
  height:90%;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  pointer-events:none;
}

.hero-title-wrap{
  width:100%;
  text-align:center;
  overflow:hidden;
}

.kermedix-title{
  font-family: Inter, Poppins, system-ui, sans-serif;
  font-weight:900;
  letter-spacing:-0.08em;
  color:rgba(255,255,255,0.65);
  text-shadow:
    0 1px 0 rgba(255,255,255,0.15),
    0 2px 8px rgba(0,0,0,0.35);
  white-space:nowrap;
  line-height:0.9;
}
  
`;

/* ---------------- MOBILE DETECTOR ---------------- */

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  return isMobile;
};

/* ---------------- HERO SECTION ---------------- */

const HeroSection = () => {
  return (
    <>
      <style>{heroCss}</style>

      <ReactLenis root options={{ lerp: 0.06 }}>
        <Hero />
      </ReactLenis>
    </>
  );
};

export default HeroSection;

/* ---------------- HERO LAYOUT ---------------- */

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">

      <IntroImage />

<div className="relative h-[120vh] md:h-[220vh]">
  <CenterImage />
</div>

<div className="relative h-[120vh] md:h-[180vh] -mt-[80px] md:mt-0">
  <ParallaxImages />
</div>


      <div className="h-[90vh]" />

    </div>
  );
};

        /* ---------------- INTRO IMAGE ---------------- */

        const IntroImage = () => {
          const ref = useRef(null);
          const isMobile = useIsMobile();

          const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start start", "end end"],
          });

          const smooth = useSpring(scrollYProgress, {
            stiffness: 60,
            damping: 18,
            mass: 0.6,
          });

        const titleY = useTransform(
          smooth,
          [0, 0.7],
          isMobile ? ["0%", "55%"] : ["0%", "65%"]
        );

        const titleScale = useTransform(smooth, [0, 0.5], [1, 0.75]);

        const titleOpacity = useTransform(
          smooth,
          [0.45, 0.7],
          [1, 0]
        );



  const subtitleOpacity = useTransform(smooth, [0.15, 0.3], [0, 1]);

  return (
    <section ref={ref} className="hero-section h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* IMAGE */}
        <div className="hero-bg-wrapper">
          <img src={introImage} className="hero-bg" alt="Intro" />
        </div>

        {/* TITLE */}
        <div className="hero-content">
          <div className="hero-title-wrap">
          <motion.h1
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
            className="kermedix-title text-[18vw]"
          >

              KERMEDIX
            </motion.h1>
          </div>
        </div>

        {/* SUBTITLE */}
        <motion.div
          style={{ opacity: subtitleOpacity }}
          className="absolute bottom-[18%] w-full text-center z-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Kerala Digital Health Records
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

/* ---------------- CENTER IMAGE ---------------- */

const CenterImage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.35], [1.3, 1]);

  const clip1 = useTransform(scrollYProgress, [0.05, 0.6], [50, 0]);
  const clip2 = useTransform(scrollYProgress, [0.05, 0.6], [50, 100]);

  const clipPath = useMotionTemplate`
    polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)
  `;

  return (
    <div ref={ref} className="sticky top-0 h-screen flex items-center justify-center">
      <motion.img
        src={houseboat}
        alt="Kerala silhouette"
        className="w-[42%] max-w-[300px] md:w-[260px] lg:w-[220px]"
        style={{ opacity, scale, clipPath }}
      />
    </div>
  );
};

/* ---------------- PARALLAX IMAGES ---------------- */

const ParallaxImages = () => {
  return (
    <div
  className="relative mx-auto max-w-6xl px-6 pt-[40px] md:pt-[200px]"
  style={{ marginTop: "-60px" }}
>


     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start">


        <ParallaxImg
          src={workers}
          alt="Healthcare Workers"
          start={180}
          end={-120}
          className="w-[75%] md:w-[85%] mx-auto"
        />

        <ParallaxImg
          src={healthUI}
          alt="Digital Health UI"
          start={360}
          end={-180}
          className="w-[75%] md:w-[85%] mx-auto"
        />

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-32 max-w-xl text-center text-zinc-700"
      >
<h2
  style={{
    marginBottom: "14px",
    fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
    fontWeight: 600,
    color: "#0f172a",
    letterSpacing: "-0.03em",
    fontFamily:
      "SF Pro Display, Inter, Poppins, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  }}
>
  Kerala Digital Health Platform
</h2>

<p
  style={{
    fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
    lineHeight: "1.75",
    color: "#334155",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    fontFamily:
      "SF Pro Text, Inter, Poppins, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    maxWidth: "720px",
    margin: "0 auto",
  }}
>
  A unified digital healthcare ecosystem connecting citizens, doctors,
  hospitals, and public health systems through secure, transparent, and
  intelligent digital records.
</p>


      </motion.div>
    </div>
  );
};

/* ---------------- PARALLAX IMAGE ---------------- */

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ transform, opacity }}
    />
  );
};
