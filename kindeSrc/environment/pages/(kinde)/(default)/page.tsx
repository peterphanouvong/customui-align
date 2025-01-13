"use server";

import React from "react";

import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeCSRF,
  getKindeWidget,
  KindePageEvent,
  getLogoUrl,
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

.background {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
  overflow: hidden;
  z-index: -1;
}

.background__before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.9) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px);
  background-size: 50px 50px;
  /* Radial mask for the grid */
  mask-image: radial-gradient(
    circle at center,
    black 0%,
    black 30%,
    transparent 70%
  );
  -webkit-mask-image: radial-gradient(
    circle at center,
    black 0%,
    black 30%,
    transparent 70%
  );
  z-index: -1;
}

.background__after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1600px;
  height: 1600px;
  background: radial-gradient(
    circle,
    rgba(255, 99, 99, 0.08) 0%,
    rgba(255, 99, 99, 0.03) 35%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
}

.login {
  padding-top: 0.5rem;
  padding-inline: 2rem;
  padding-bottom: 2rem;
  margin-inline: 2rem;
  margin-inline: auto;
  margin-top: 5rem;
  border-radius: 1rem;
  background-color: white;
  max-width: 450px;
}
.login-header {
  text-align: center;

  margin-bottom: 1.5rem;
}

.login-header__logo-wrapper {
  width: 100%;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 2rem;
  justify-content: center;
  /* background-color: red; */
}

.login-header__logo-wrapper {
  background-color: rgba(255, 99, 99, 0.1);
  background-image: linear-gradient(rgba(255, 99, 99, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 99, 99, 0.3) 1px, transparent 1px);
  background-size: 36px 36px;
  background-position: 0 24px;
  mask-image: radial-gradient(circle at top, black 0%, transparent 70%);
}

.login-header__logo {
  width: 4rem;
  margin-bottom: 1rem;
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
          <div className="background">
            <div className="background__before"></div>
            <div clasName="background__after"></div>
            <div className="login">
              <div className="login-header">
                <div className="login-header__logo-wrapper">
                  <div className="grid-layer"></div>
                  <div className="glow-layer"></div>
                  <img
                    className="login-header__logo"
                    src={getLogoUrl()}
                    alt="align logo"
                  />
                </div>
                <h2>{context.widget.content.heading}</h2>
                <p>{context.widget.content.description}</p>
              </div>
              <main>{getKindeWidget()}</main>
            </div>
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
