import React from "react";

const styles: {
  loginHeader: {
    root: React.CSSProperties;
    logoWrapper: React.CSSProperties;
    logo: React.CSSProperties;
    heading: React.CSSProperties;
  };
} = {
  loginHeader: {
    root: {
      textAlign: "center" as const,
      marginBottom: "1.5rem",
    },
    logoWrapper: {
      width: "100%",
      display: "flex",
      padding: "1rem 0 2rem",
      justifyContent: "center",
      backgroundColor: "rgba(255, 99, 99, 0.1)",
      backgroundImage: `
        linear-gradient(rgba(255, 99, 99, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 99, 99, 0.3) 1px, transparent 1px)
      `,
      backgroundSize: "36px 36px",
      backgroundPosition: "0 24px",
      maskImage: "radial-gradient(circle at top, black 0%, transparent 70%)",
    },
    logo: {
      width: "4rem",
      marginBottom: "1rem",
    },
    heading: {
      fontWeight: 600,
    },
  },
} as const;

interface LoginHeaderProps {
  heading: string;
  description: string;
  logoAlt: string;
  logoUrl: string;
}
export const LoginHeader: React.FC<LoginHeaderProps> = ({
  heading,
  description,
  logoAlt,
  logoUrl,
}) => (
  <div style={styles.loginHeader.root}>
    <div style={styles.loginHeader.logoWrapper}>
      <img style={styles.loginHeader.logo} src={logoUrl} alt={logoAlt} />
    </div>
    <h2 style={styles.loginHeader.heading}>{heading}</h2>
    <p>{description}</p>
  </div>
);
