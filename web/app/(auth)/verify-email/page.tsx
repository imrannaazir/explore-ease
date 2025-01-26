import { Suspense } from "react";
import VerifyEmailPageContent from "../components/verify-email-page-content";

const VerifyPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailPageContent />
    </Suspense>
  );
};

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
  </div>
);

export default VerifyPage;
