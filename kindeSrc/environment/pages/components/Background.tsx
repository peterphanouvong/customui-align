import React from "react";
import styles from "./styles.module.css";

export const Background: React.FC = () => (
  <div className={styles.auth__background}>
    <div className={styles.auth__background_grid} />
    <div className={styles.auth__background_glow} />
  </div>
);
