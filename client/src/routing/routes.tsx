import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LandingPage, VerificationCode } from "../lazyImport";
import { errorElement, LoadingFallback } from "../common";

// Common error element

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VerificationCode />
      </Suspense>
    ),
    errorElement,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement,
      },
    ],
  },
  {
    path: "/success",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
    errorElement,
  },
  {
    path: "*",
    element: "Page Not Found",
  },
]);
