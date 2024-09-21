import React from "react";

export const VerificationCode = React.lazy(
  () => import("../verificationCode/ui")
);

export const LandingPage = React.lazy(() => import("../landingPage/ui"));
