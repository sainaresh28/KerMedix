import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#402EE6",
  bgColor = "#F9EFE3",
  marqueeBgColor = "#402EE6",
  marqueeTextColor = "#FFCC33",
  borderColor = "#402EE6",
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeWrapRef = useRef<HTMLDivElement | null>(null); // 🔑 Y-axis wrapper
  const marqueeInnerRef = useRef<HTMLDivElement | null>(null); // 🔑 X-axis only
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  const [repetitions, setRepetitions] = useState(4);
  const [active, setActive] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  /* ---------- helpers ---------- */
  const dist = (x: number, y: number, x2: number, y2: number) =>
    (x - x2) ** 2 + (y - y2) ** 2;

  const closestEdge = (
    mx: number,
    my: number,
    w: number,
    h: number
  ) => {
    const top = dist(mx, my, w / 2, 0);
    const bottom = dist(mx, my, w / 2, h);
    return top < bottom ? "top" : "bottom";
  };

  /* ---------- repetitions ---------- */
  useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return;
      const part =
        marqueeInnerRef.current.querySelector<HTMLDivElement>(
          ".marquee__part"
        );
      if (!part) return;

      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [text, image]);

  /* ---------- infinite X marquee (never touched again) ---------- */
  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part =
      marqueeInnerRef.current.querySelector<HTMLDivElement>(".marquee__part");
    if (!part) return;

    if (!marqueeTween.current) {
      marqueeTween.current = gsap.to(marqueeInnerRef.current, {
        x: -part.offsetWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    }
  }, [repetitions, speed]);

  /* ---------- show / hide (Y-axis ONLY) ---------- */
  const showMarquee = (edge: "top" | "bottom") => {
    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .set(marqueeRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      })
      .set(marqueeWrapRef.current, {
        y: edge === "top" ? "101%" : "-101%",
      })
      .to([marqueeRef.current, marqueeWrapRef.current], { y: "0%" });
  };

  const hideMarquee = (edge: "top" | "bottom") => {
    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .to(marqueeRef.current, {
        y: edge === "top" ? "101%" : "-101%",
      })
      .to(marqueeWrapRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      });
  };

  /* ---------- desktop hover ---------- */
  const onEnter = (e: React.MouseEvent) => {
    if (isMobile || !itemRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    showMarquee(
      closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height)
    );
  };

  const onLeave = (e: React.MouseEvent) => {
    if (isMobile || !itemRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    hideMarquee(
      closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height)
    );
  };

  /* ---------- mobile tap ---------- */
  const onTap = (e: React.MouseEvent) => {
    if (!isMobile || !itemRef.current) return;
    e.preventDefault();

    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(r.width / 2, r.height / 2, r.width, r.height);

    active ? hideMarquee(edge) : showMarquee(edge);
    setActive(!active);
  };

  /* ---------- close on outside tap ---------- */
  useEffect(() => {
    if (!isMobile) return;

    const close = () => {
      if (!active) return;
      hideMarquee("bottom");
      setActive(false);
    };

    document.addEventListener("touchstart", close);
    return () => document.removeEventListener("touchstart", close);
  }, [active, isMobile]);

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        href={link}
        className="menu__item-link"
        style={{ color: textColor }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onTap}
      >
        {text}
      </a>

      <div
        className="marquee"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="marquee__inner-wrap" ref={marqueeWrapRef}>
          <div className="marquee__inner" ref={marqueeInnerRef}>
            {Array.from({ length: repetitions }).map((_, i) => (
              <div
                key={i}
                className="marquee__part"
                style={{ color: marqueeTextColor }}
              >
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
    </div>
  );
}

export default FlowingMenu;
