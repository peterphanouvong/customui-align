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
        --kinde-base-font-family: -apple-system, system-ui,
                BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto,
                sans-serif;
        }
        `}</style>
      </head>
      <body>
        <div id="root" data-roast-root="/admin">
          <h2>{context.widget.content.heading}</h2>
          <p>{context.widget.content.description}</p>
          <main>{getKindeWidget()}</main>
          <div>
            <button className="button">
              <span>Create new account</span>
            </button>
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
