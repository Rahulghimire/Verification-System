import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LandingPage, VerificationCode } from "../lazyImport";
import { errorElement, LoadingFallback } from "../common";
import LoginLayout from "../layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <VerificationCode />,
        errorElement,
      },
    ],
  },
  {
    path: "/success",
    element: (
      <>
        <Suspense fallback={<LoadingFallback />}>
          <LandingPage />
        </Suspense>
      </>
    ),
    errorElement,
  },
  {
    path: "*",
    element: "Page Not Found",
  },
]);
