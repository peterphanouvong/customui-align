// components/LoginHeader.tsx
import React from "react";
import styles from "./styles.module.css";
import { getLogoUrl } from "@kinde/infrastructure";

interface LoginHeaderProps {
  heading: string;
  description: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  heading,
  description,
}) => (
  <div className={styles.auth__header}>
    <div className={styles.auth__logo_wrapper}>
      <img
        className={styles.auth__logo}
        src={getLogoUrl()}
        alt="Company logo"
      />
    </div>
    <h2 className={styles.auth__heading}>{heading}</h2>
    <p>{description}</p>
  </div>
);
