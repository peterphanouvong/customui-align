"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
  type KindePageEvent,
} from "@kinde/infrastructure";
import { Background } from "../../components/Background";
import { LoginHeader } from "../../components/LoginHeader";
import styles from "../../components/styles.module.css";

interface PageSettings {
  bindings: {
    "kinde.fetch": Record<string, never>;
    "kinde.env": Record<string, never>;
    url: Record<string, never>;
  };
}

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
        <div id="root" data-roast-root="/admin" className={styles.auth}>
          <Background />
          <div className={styles.auth__container}>
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

export const pageSettings: PageSettings = {
  bindings: {
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await Layout(event);
  return renderToString(page);
}
