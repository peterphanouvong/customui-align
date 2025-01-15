"use server";

import {
  getKindeWidget,
  getLogoUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { BackgroundGrid } from "../../components/background-grid";
import { LoginHeader } from "../../components/login-header";
import Layout from "../../components/layout";

const styles: {
  authContainer: React.CSSProperties;
} = {
  authContainer: {
    padding: "0.5rem 2rem 2rem",
    position: "relative" as const,
    top: "5rem",
    marginInline: "auto" as const,
    borderRadius: "1rem",
    backgroundColor: "white",
    maxWidth: "450px",
  },
};

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Layout context={context} request={request}>
      <BackgroundGrid />
      <div style={styles.authContainer}>
        <LoginHeader
          heading={context.widget.content.heading}
          description={context.widget.content.description}
          logoAlt={context.widget.content.logo_alt}
          logoUrl={getLogoUrl()}
        />
        <main>{getKindeWidget()}</main>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
