"use server";

import { CSSProperties, JSX } from "react";

// Constants moved to a separate configuration object
const GRADIENTS = {
  radialMask: `
    radial-gradient(
      circle at center,
      black 0%,
      black 30%,
      transparent 70%
    )
  `,
  backgroundGrid: `
    linear-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px)
  `,
  glowEffect: `
    radial-gradient(
      circle,
      rgba(255, 99, 99, 0.08) 0%,
      rgba(255, 99, 99, 0.03) 35%,
      transparent 70%
    )
  `,
} as const;

const styles: {
  authBackground: {
    root: CSSProperties;
    grid: CSSProperties;
    glow: CSSProperties;
  };
} = {
  authBackground: {
    root: {
      position: "absolute",
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#f8f9fa",
      overflow: "hidden",
      zIndex: -1,
      pointerEvents: "none",
    },
    grid: {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: GRADIENTS.backgroundGrid,
      backgroundSize: "50px 50px",
      maskImage: GRADIENTS.radialMask,
      WebkitMaskImage: GRADIENTS.radialMask,
      zIndex: -1,
      pointerEvents: "none",
    },
    glow: {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "1600px",
      height: "1600px",
      background: GRADIENTS.glowEffect,
      pointerEvents: "none",
      zIndex: -1,
    },
  },
};

export const BackgroundGrid = (): JSX.Element => {
  return (
    <div style={styles.authBackground.root}>
      <div style={styles.authBackground.grid} />
      <div style={styles.authBackground.glow} />
    </div>
  );
};
