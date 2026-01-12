import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1100, label: "Registered Workers", img: "/images/facility1.png", plus: true },
  { value: 80, label: "Healthcare Providers", img: "/images/facility2.png", plus: true  },
  { value: 2400, label: "Digital Health Records", img: "/images/facility3.png", plus: true },
  { value: 750, label: "Vaccinations Tracked", img: "/images/facility4.png", plus: true },
  { value: 14, label: "Districts Covered", img: "/images/facility5.png", plus: true  },
  { value: 500, label: "Emergency Accesses", img: "/images/facility6.png", plus: true },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const card = {
  hidden: { scale: 1.08, opacity: 0, y: 70 },
  show: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const imageReveal = {
  hidden: { clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)" },
  show: {
    clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const letter = {
  hidden: { y: 220 },
  show: { y: 0, transition: { duration: 1, ease: "easeOut" } },
};

function CountUp({
  value,
  plus,
  trigger,
}: {
  value: number;
  plus?: boolean;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0); 
      return;
    }

    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, value]);

  return (
    <span>
      {count.toLocaleString()}
      {plus ? "+" : ""}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const controls = useAnimation();


  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden"); 
    }
  }, [inView, controls]);

  return (
    <section ref={ref} className="stats-section">
      <style>{css}</style>

      {/* Intro */}
      <motion.div
        className="top-text"
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2>Making Healthcare Accessible</h2>
        <p>Our platform has empowered thousands of migrant workers with digital health records, ensuring healthcare continuity across Kerala.</p>
      
      </motion.div>

      {/* Cards */}
      <motion.div
        className="items"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            variants={card}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={s.img}
              alt=""
              variants={imageReveal}
            />

            <div className="stat-overlay">
              <p className="stat-number">
                <CountUp
                  value={s.value}
                  plus={s.plus}
                  trigger={inView}
                />
              </p>
              <p>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* OUR STATS */}
      <div className="header">
        {["OUR", "STATS"].map((word, i) => (
          <motion.div
            key={i}
            className="header-item"
            variants={container}
            initial="hidden"
            animate={controls}
          >
            {word.split("").map((l, idx) => (
              <motion.span key={idx} className="letter" variants={letter}>
                {l}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= CSS ================= */
const css = `
.stats-section{
  background:#f5f6f7;
  padding:3rem 0;
  font-family:Inter, sans-serif;
  overflow:hidden;
}

.top-text{text-align:center;margin-bottom:2rem}
.top-text h2{font-size:2.5rem;font-weight:700}
.top-text p{max-width:640px;margin:.5rem auto;color:#555}

.items{
  display:flex;
  gap:1.4rem;
  padding:0 1.4rem;
}

.stat-card{
  position:relative;
  flex:1;
  height:320px;
  border-radius:22px;
  overflow:hidden;
  background:rgba(255,255,255,.35);
  backdrop-filter:blur(18px) saturate(140%);
  border:1px solid rgba(255,255,255,.45);
  box-shadow:0 30px 60px rgba(0,0,0,.18);
}

.stat-card img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.stat-overlay{
  position:absolute;
  inset:0;
  padding:1.3rem;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  background:linear-gradient(
    to top,
    rgba(0,0,0,.55),
    rgba(0,0,0,.25),
    transparent
  );
}

.stat-number{
  font-size:2.4rem;
  font-weight:800;
  color:white;
}

.stat-overlay p:last-child{
  font-size:1.05rem;
  font-weight:600;
  color:#f0f0f0;
}

.header{
  display:flex;
  justify-content:center;
  margin-top:3rem;
  opacity:.35;
  gap:4vw; 
}

.header-item{
  display:flex;
  font-size:12vw;
  font-weight:800;
  color:grey;
}

.letter{display:inline-block}

/* MOBILE */
@media (max-width:768px){
  .items{
    overflow-x:auto;
    scroll-snap-type:x mandatory;
  }
  .stat-card{
    flex:0 0 85%;
    scroll-snap-align:center;
    height:260px;
  }
}
`;
