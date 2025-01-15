"use server";

import {
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  type KindePageEvent,
} from "@kinde/infrastructure";
import { generateCSSVariables } from "../styles";
import { JSX } from "react";

interface LayoutProps extends KindePageEvent {
  children: React.ReactNode;
}

export const Layout = ({
  request,
  context,
  children,
}: LayoutProps): JSX.Element => {
  const emailInputScript = `
    const emailInput = document.querySelector('#sign_up_sign_in_credentials_p_email');
    emailInput.placeholder = 'Enter your email';
  `;

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
        <style>{generateCSSVariables()}</style>
      </head>
      <body>
        <div data-roast-root="true">{children}</div>
        <script
          nonce={getKindeNonce()}
          dangerouslySetInnerHTML={{ __html: emailInputScript }}
        />
      </body>
    </html>
  );
};

export default Layout;
