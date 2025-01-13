"use server";

import React from "react";

import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
  KindePageEvent,
} from "@kinde/infrastructure";

import { renderToString } from "react-dom/server.browser";

export const pageSettings = {
  bindings: {
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

const Layout = async ({ request, context }: KindePageEvent) => {
  console.log("request", request);
  console.log("context", context);
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
        <style>{`
:root {
  --kinde-base-font-family: -apple-system, system-ui, BlinkMacSystemFont,
    Helvetica, Arial, Segoe UI, Roboto, sans-serif;
  --kinde-control-select-text-border-radius: 8px;
  --kinde-button-primary-background-color: #272a2c;
  --kinde-button-primary-color: white;
  --kinde-button-border-radius: 8px;
}

.login {
  padding: 2rem;
}
.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-header h2 {
  font-weight: 600;
}

.kinde-button-variant-secondary {
  border-radius: 8px;
  background-color: white;
  border: 1px solid #e9edec;
}

.kinde-choice-separator {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  text-align: center;
}

.kinde-choice-separator::before,
.kinde-choice-separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}

.kinde-choice-separator::before {
  margin-right: 15px;
}

.kinde-choice-separator::after {
  margin-left: 15px;
}
        `}</style>
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <div className="login">
            <h2>{context.widget.content.heading}</h2>
            <p>{context.widget.content.description}</p>
            <main>{getKindeWidget()}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event: KindePageEvent) {
  const page = await Layout({ ...event });
  return renderToString(page);
}
