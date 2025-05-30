import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CheckCircle } from "lucide-react";

export function FeatureCard({ title, description, icon: Icon, accent, facts }) {
  const cardRef = useRef(null);
  const tweenRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const maxScrollTop = card.scrollHeight - card.clientHeight;

    if (hovered && maxScrollTop > 0) {
      if (tweenRef.current) tweenRef.current.kill();

      tweenRef.current = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });
      tweenRef.current.to(card, {
        scrollTop: maxScrollTop,
        duration: 4,
      });
      tweenRef.current.set(card, { scrollTop: 0 });
    } else {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      gsap.to(card, { scrollTop: 0, duration: 0.5, ease: "power1.out" });
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        border: `2px solid ${accent}`,
        borderRadius: 12,
        padding: 20,
        width: 320,
        height: 240,
        overflowY: "auto",
        cursor: "pointer",
        userSelect: hovered ? "text" : "none",
        backgroundColor: "#fff",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        outline: "none",
        scrollBehavior: "smooth",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            backgroundColor: accent,
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon style={{ color: "#fff", width: 20, height: 20 }} />
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 700,
            color: accent,
          }}
        >
          {title}
        </h3>
      </div>

      <p style={{ marginBottom: 12, color: "#555", textAlign: "left" }}>{description}</p>

      <ul
        style={{
          margin: 0,
          paddingLeft: 20,
          fontSize: 14,
          color: "#666",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: hovered ? "auto" : "none",
          textAlign: "left",
        }}
      >
        {facts.map((fact, i) => (
          <li key={i} style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
            <CheckCircle size={16} color={accent} style={{ marginRight: 8, flexShrink: 0 }} />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
