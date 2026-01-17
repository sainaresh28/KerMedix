import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";

function FlowingMenu({ items = [], speed = 15 }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} index={idx} speed={speed} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ text, image, index, speed }) {
  const marqueeInnerRef = useRef(null);
  const containerRef = useRef(null);
  const tweenRef = useRef(null);

  const [repetitions, setRepetitions] = useState(4);

  const isFilled = index % 2 === 0;
  const isReverse = index % 2 === 1; // 2nd & 4th

  /* repetitions */
  useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector(".marquee__part");
      if (!part) return;

      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* start animation on scroll */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tweenRef.current) {
          const part =
            marqueeInnerRef.current.querySelector(".marquee__part");

          tweenRef.current = gsap.fromTo(
            marqueeInnerRef.current,
            { x: isReverse ? -part.offsetWidth : 0 },
            {
              x: isReverse ? 0 : -part.offsetWidth,
              duration: speed,
              ease: "none",
              repeat: -1,
            }
          );
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [speed, isReverse]);

  return (
    <div
      ref={containerRef}
      className={`menu__item ${isFilled ? "filled" : "outlined"}`}
    >
      <div className="marquee visible">
        <div className="marquee__inner" ref={marqueeInnerRef}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <div key={i} className="marquee__part">
              <span>{text}</span>
              <div
                className="marquee__img"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
