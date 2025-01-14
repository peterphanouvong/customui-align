"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
  getLogoUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";

// Types
interface PageSettings {
  bindings: {
    "kinde.fetch": Record<string, never>;
    "kinde.env": Record<string, never>;
    url: Record<string, never>;
  };
}

// Constants
const RADIAL_GRADIENT = `
  radial-gradient(
    circle at center,
    black 0%,
    black 30%,
    transparent 70%
  )
`;

// Styles
const styles = {
  root: {
    "--kinde-base-font-family":
      "-apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif",
    "--kinde-control-select-text-border-radius": "8px",
    "--kinde-button-primary-background-color": "#272a2c",
    "--kinde-button-primary-color": "white",
    "--kinde-button-border-radius": "8px",
  },
  background: {
    position: "absolute",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
    zIndex: -1,
    pointerEvents: "none",
  },
  backgroundBefore: {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    maskImage: RADIAL_GRADIENT,
    WebkitMaskImage: RADIAL_GRADIENT,
    zIndex: -1,
    pointerEvents: "none",
  },
  backgroundAfter: {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1600px",
    height: "1600px",
    background: `
      radial-gradient(
        circle,
        rgba(255, 99, 99, 0.08) 0%,
        rgba(255, 99, 99, 0.03) 35%,
        transparent 70%
      )
    `,
    pointerEvents: "none",
    zIndex: -1,
  },
  login: {
    padding: "0.5rem 2rem 2rem",
    margin: "5rem auto 0",
    borderRadius: "1rem",
    backgroundColor: "white",
    maxWidth: "450px",
  },
  loginHeader: {
    textAlign: "center",
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
} as const;

// Components
const Background: React.FC = () => (
  <div style={styles.background}>
    <div style={styles.backgroundBefore} />
    <div style={styles.backgroundAfter} />
  </div>
);

const LoginHeader: React.FC<{ heading: string; description: string }> = ({
  heading,
  description,
}) => (
  <div style={styles.loginHeader}>
    <div style={styles.logoWrapper}>
      <img style={styles.logo} src={getLogoUrl()} alt="Company logo" />
    </div>
    <h2 style={styles.heading}>{heading}</h2>
    <p>{description}</p>
  </div>
);

const Layout: React.FC<KindePageEvent> = async ({ request, context }) => {
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{context.widget.content.page_title}</title>
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <Background />
          <div style={styles.login}>
            <LoginHeader
              heading={context.widget.content.heading}
              description={context.widget.content.description}
            />
            <main>{getKindeWidget()}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

// Page Settings
export const pageSettings: PageSettings = {
  bindings: {
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await Layout(event);
  return renderToString(page);
}
